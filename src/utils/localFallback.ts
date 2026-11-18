import type {
  StudentAnswersMap,
  SubmissionRecordFull,
  SubmissionResultPublic,
  TeacherQuestionFull,
} from '../types/assessment';
import { ASSESSMENT_META } from '../data/studentQuestions';
import { gradeAssessment } from './scoring';

export const LOCAL_TEACHER_TOKEN = 'LOCAL_OFFLINE_MODE';
const LOCAL_STORAGE_KEY = 'physics_assessment_submissions_v1';
const TEACHER_PASS_SHA256 =
  'b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78';

export async function verifyTeacherPasswordLocal(
  password: string
): Promise<boolean> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    try {
      const encoded = new TextEncoder().encode(password);
      const digest = await crypto.subtle.digest('SHA-256', encoded);
      const hex = Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      return hex === TEACHER_PASS_SHA256;
    } catch {
      // Fall through if subtle digest fails in restricted context
    }
  }
  // Fallback for non-HTTPS/restricted browser environments without crypto.subtle
  const bytes = Array.from(password).map((c) => c.charCodeAt(0));
  return (
    bytes.length === 3 &&
    bytes[0] === 65 &&
    bytes[1] === 66 &&
    bytes[2] === 67
  );
}

export function readLocalSubmissions(): SubmissionRecordFull[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveLocalSubmission(record: SubmissionRecordFull): void {
  if (typeof localStorage === 'undefined') return;
  try {
    const existing = readLocalSubmissions();
    existing.unshift(record);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // Ignore storage quota errors
  }
}

export async function submitAssessmentLocal(params: {
  studentName: string;
  studentClass: string;
  answers: StudentAnswersMap;
}): Promise<SubmissionResultPublic> {
  const { GRADING_RULES } = await import('../../server/questionsBank');
  const graded = gradeAssessment(GRADING_RULES, params.answers);

  const record: SubmissionRecordFull = {
    id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    studentName: params.studentName.trim(),
    studentClass: params.studentClass.trim(),
    material: ASSESSMENT_META.topic,
    teacherName: ASSESSMENT_META.teacherName,
    submittedAt: new Date().toISOString(),
    answeredCount: graded.answeredCount,
    totalQuestions: ASSESSMENT_META.totalQuestions,
    totalScore: graded.totalScore,
    maxScore: graded.maxScore,
    status: 'SELESAI DIKUMPULKAN',
    breakdowns: graded.breakdowns,
    rawAnswers: params.answers,
  };

  saveLocalSubmission(record);

  return {
    id: record.id,
    studentName: record.studentName,
    studentClass: record.studentClass,
    material: record.material,
    teacherName: record.teacherName,
    submittedAt: record.submittedAt,
    answeredCount: record.answeredCount,
    totalQuestions: record.totalQuestions,
    totalScore: record.totalScore,
    maxScore: record.maxScore,
    status: record.status,
  };
}

export async function loadTeacherDashboardLocal(): Promise<{
  submissions: SubmissionRecordFull[];
  questions: TeacherQuestionFull[];
  storageNote: string;
}> {
  const { TEACHER_QUESTIONS_FULL } = await import('../../server/questionsBank');
  const submissions = readLocalSubmissions();
  return {
    submissions,
    questions: TEACHER_QUESTIONS_FULL,
    storageNote:
      'Mode Tanpa Server (Static Hosting / Vercel): Kunci jawaban, FBD, dan pembahasan terbuka langsung secara lokal setelah verifikasi sandi. Data hasil siswa tersimpan di penyimpanan browser (localStorage) perangkat ini; gunakan tombol Ekspor CSV / Excel untuk mengunduh rekap.',
  };
}

function escapeCsvCell(value: string | number): string {
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildCsvContent(submissions: SubmissionRecordFull[]): string {
  const headers = [
    'ID Pengumpulan',
    'Nama Lengkap Siswa',
    'Kelas',
    'Waktu Pengumpulan (WIB)',
    'Soal Terjawab',
    'Nilai Akhir',
    'Skor Maksimal',
    ...Array.from({ length: 10 }, (_, i) => `Skor Soal ${i + 1}`),
    ...Array.from({ length: 10 }, (_, i) => `Jawaban Soal ${i + 1}`),
  ];

  const rows = submissions.map((s) => {
    const wibTime = new Date(s.submittedAt).toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
    });
    const scoreCols = Array.from({ length: 10 }, (_, idx) => {
      const b = s.breakdowns.find((item) => item.questionId === idx + 1);
      return b ? b.earnedPoints : 0;
    });
    const ansCols = Array.from({ length: 10 }, (_, idx) => {
      const b = s.breakdowns.find((item) => item.questionId === idx + 1);
      return b ? b.studentAnswerDisplay : '';
    });
    return [
      s.id,
      s.studentName,
      s.studentClass,
      wibTime,
      `${s.answeredCount}/${s.totalQuestions}`,
      s.totalScore,
      s.maxScore,
      ...scoreCols,
      ...ansCols,
    ]
      .map(escapeCsvCell)
      .join(',');
  });

  return '\uFEFF' + [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
}
