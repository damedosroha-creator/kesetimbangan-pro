import crypto from 'node:crypto';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import { ASSESSMENT_META } from './src/data/studentQuestions.ts';
import { gradeAssessment } from './src/utils/scoring.ts';
import { GRADING_RULES, TEACHER_QUESTIONS_FULL } from './server/questionsBank.ts';
import type {
  StudentAnswersMap,
  SubmissionRecordFull,
  SubmissionResultPublic,
} from './src/types/assessment.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const TEACHER_PASSWORD = process.env.TEACHER_PASSWORD || 'ABC';
const DATA_DIR = path.resolve(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

// In-memory active teacher session tokens (valid for server session)
const activeTeacherTokens = new Set<string>();

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, '[]', 'utf-8');
  }
}

function readSubmissions(): SubmissionRecordFull[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSubmission(record: SubmissionRecordFull): void {
  const existing = readSubmissions();
  existing.unshift(record);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}

function extractBearerToken(req: express.Request): string {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    return header.slice(7).trim();
  }
  return '';
}

function requireTeacherAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  const token = extractBearerToken(req);
  if (!token || !activeTeacherTokens.has(token)) {
    res.status(401).json({ error: 'Akses Mode Guru memerlukan autentikasi yang valid.' });
    return;
  }
  next();
}

function escapeCsvCell(value: string | number): string {
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

async function startServer() {
  ensureDataDir();
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
  });

  // Student submission endpoint (returns ONLY public student summary, never keys)
  app.post('/api/submit', (req, res) => {
    const { studentName, studentClass, answers } = req.body ?? {};
    const cleanName = typeof studentName === 'string' ? studentName.trim() : '';
    const cleanClass = typeof studentClass === 'string' ? studentClass.trim() : '';

    if (!cleanName || !cleanClass) {
      res.status(400).json({
        error: 'Nama Lengkap Siswa dan Kelas wajib diisi sebelum mengumpulkan jawaban.',
      });
      return;
    }

    const rawAnswers: StudentAnswersMap =
      answers && typeof answers === 'object' ? answers : {};

    const graded = gradeAssessment(GRADING_RULES, rawAnswers);

    const record: SubmissionRecordFull = {
      id: `sub_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      studentName: cleanName,
      studentClass: cleanClass,
      material: ASSESSMENT_META.topic,
      teacherName: ASSESSMENT_META.teacherName,
      submittedAt: new Date().toISOString(),
      answeredCount: graded.answeredCount,
      totalQuestions: ASSESSMENT_META.totalQuestions,
      totalScore: graded.totalScore,
      maxScore: graded.maxScore,
      status: 'SELESAI DIKUMPULKAN',
      breakdowns: graded.breakdowns,
      rawAnswers,
    };

    saveSubmission(record);

    const publicSummary: SubmissionResultPublic = {
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

    res.status(201).json(publicSummary);
  });

  // Teacher Mode authentication (password validated strictly server-side)
  app.post('/api/teacher/login', (req, res) => {
    const { password } = req.body ?? {};
    if (typeof password !== 'string' || password !== TEACHER_PASSWORD) {
      res.status(401).json({ error: 'Password Mode Guru salah. Akses ditolak.' });
      return;
    }
    const token = crypto.randomBytes(24).toString('hex');
    activeTeacherTokens.add(token);
    res.json({ token });
  });

  app.post('/api/teacher/logout', (req, res) => {
    const token = extractBearerToken(req);
    if (token) {
      activeTeacherTokens.delete(token);
    }
    res.json({ ok: true });
  });

  // Protected Teacher Mode dashboard payload (keys, full solutions, student submissions)
  app.get('/api/teacher/dashboard', requireTeacherAuth, (_req, res) => {
    const submissions = readSubmissions();
    res.json({
      submissions,
      questions: TEACHER_QUESTIONS_FULL,
      storageNote:
        'Data hasil ujian disimpan pada server lokal aplikasi (berkas JSON di server selama sesi server berjalan). Untuk penyimpanan jangka panjang lintas deployment ulang, gunakan ekspor CSV/Excel.',
    });
  });

  // Protected CSV export (UTF-8 BOM so Microsoft Excel opens Indonesian characters & decimals cleanly)
  app.get('/api/teacher/export.csv', requireTeacherAuth, (_req, res) => {
    const submissions = readSubmissions();
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

    const csvContent = '\uFEFF' + [headers.map(escapeCsvCell).join(','), ...rows].join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="hasil-penilaian-fisika-mr-jo.csv"'
    );
    res.send(csvContent);
  });

  // Vite dev middleware or production static files
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Physics Assessment server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
