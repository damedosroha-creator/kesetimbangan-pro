import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Download,
  KeyRound,
  Lock,
  Scale,
  Users,
  XCircle,
} from 'lucide-react';
import { ASSESSMENT_META } from '../data/studentQuestions';
import type {
  SubmissionRecordFull,
  TeacherQuestionFull,
} from '../types/assessment';
import { formatScore } from '../utils/scoring';
import {
  buildCsvContent,
  loadTeacherDashboardLocal,
  LOCAL_TEACHER_TOKEN,
  verifyTeacherPasswordLocal,
} from '../utils/localFallback';
import { FreeBodyDiagram } from './FreeBodyDiagram';
import { MathText } from './MathText';
import { MrJoVoiceControl } from './MrJoVoiceControl';
import { StimulusDiagram } from './StimulusDiagram';

interface TeacherAuthModalProps {
  onSuccess: (
    token: string,
    payload: {
      submissions: SubmissionRecordFull[];
      questions: TeacherQuestionFull[];
      storageNote: string;
    }
  ) => void;
  onCancel: () => void;
}

export const TeacherAuthModal: React.FC<TeacherAuthModalProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Masukkan password Mode Guru.');
      return;
    }
    setLoading(true);
    setError('');

    const tryLocalFallback = async () => {
      const valid = await verifyTeacherPasswordLocal(password);
      if (!valid) {
        setError('Password Mode Guru salah. Akses ditolak.');
        return;
      }
      const localDash = await loadTeacherDashboardLocal();
      onSuccess(LOCAL_TEACHER_TOKEN, localDash);
    };

    try {
      const loginRes = await fetch('/api/teacher/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const contentType = loginRes.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');

      // On static hosting (e.g. Vercel without backend functions), /api/* returns 404/405/HTML
      if (!isJson || loginRes.status === 404 || loginRes.status === 405 || loginRes.status >= 500) {
        await tryLocalFallback();
        return;
      }

      const loginData = await loginRes.json();
      if (!loginRes.ok || !loginData.token) {
        setError(loginData.error || 'Password Mode Guru salah. Akses ditolak.');
        return;
      }

      const dashRes = await fetch('/api/teacher/dashboard', {
        headers: { Authorization: `Bearer ${loginData.token}` },
      });
      const dashType = dashRes.headers.get('content-type') || '';
      if (!dashType.includes('application/json') || dashRes.status === 404) {
        await tryLocalFallback();
        return;
      }

      const dashData = await dashRes.json();
      if (!dashRes.ok) {
        setError(dashData.error || 'Gagal memuat data Mode Guru.');
        return;
      }

      onSuccess(loginData.token, dashData);
    } catch {
      // Network/server unreachable -> fall back cleanly to local mode (e.g. Vercel static deploy)
      try {
        await tryLocalFallback();
      } catch {
        setError('Gagal membuka Mode Guru secara lokal.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/75 px-3 pt-8 sm:pt-16 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-auth-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl">
        <div className="flex items-start gap-3 border-b border-slate-200 pb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-900 text-white">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="teacher-auth-title"
              className="font-display text-lg font-bold text-slate-900"
            >
              Akses Mode Guru
            </h2>
            <p className="mt-0.5 text-xs text-slate-600">
              Dilindungi password server untuk menjaga kerahasiaan kunci jawaban, FBD, dan
              pembahasan.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="teacher-password-input"
              className="block text-sm font-semibold text-slate-800"
            >
              Password Mode Guru
            </label>
            <input
              id="teacher-password-input"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Masukkan password akses guru"
              autoFocus
              className="mt-1.5 w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="min-h-[46px] rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              BATAL
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-[46px] items-center justify-center gap-1.5 rounded-xl bg-teal-800 px-4 py-2 text-sm font-bold text-white hover:bg-teal-900 disabled:opacity-60 cursor-pointer"
            >
              <KeyRound className="h-4 w-4" aria-hidden="true" />
              <span>{loading ? 'MEMERIKSA...' : 'MASUK'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface TeacherDashboardProps {
  token: string;
  submissions: SubmissionRecordFull[];
  questions: TeacherQuestionFull[];
  storageNote: string;
  onExit: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  token,
  submissions,
  questions,
  storageNote,
  onExit,
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'solutions'>('students');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string>(
    submissions[0]?.id ?? ''
  );
  const [selectedQuestionId, setSelectedQuestionId] = useState<number>(
    questions[0]?.id ?? 1
  );
  const [exportError, setExportError] = useState('');

  useEffect(() => {
    if (!selectedSubmissionId && submissions.length > 0) {
      setSelectedSubmissionId(submissions[0].id);
    }
  }, [submissions, selectedSubmissionId]);

  const activeSubmission = useMemo(
    () => submissions.find((s) => s.id === selectedSubmissionId) ?? submissions[0] ?? null,
    [submissions, selectedSubmissionId]
  );

  const activeQuestion = useMemo(
    () => questions.find((q) => q.id === selectedQuestionId) ?? questions[0],
    [questions, selectedQuestionId]
  );

  const explanationSpeechText = useMemo(() => {
    if (!activeQuestion) return '';
    const e = activeQuestion.explanation;
    return [
      `Pembahasan Soal Nomor ${activeQuestion.id}. ${activeQuestion.title}.`,
      `Bagian 1, Identifikasi Masalah. ${e.identifikasiMasalah}`,
      `Bagian 2, Diketahui. ${e.diketahui.join('. ')}`,
      `Bagian 3, Ditanyakan. ${e.ditanyakan}`,
      `Bagian 4, Landasan Teori. ${e.landasanTeori.join('. ')}`,
      `Bagian 5, Free Body Diagram. ${e.fbdSummary}`,
      `Bagian 6, Penyelesaian Matematis bertahap. ${e.penyelesaianMatematis.join('. ')}`,
      `Bagian 7, Verifikasi. ${e.verifikasi.join('. ')}`,
      `Bagian 8, Kesimpulan. ${e.kesimpulan}`,
    ].join(' ');
  }, [activeQuestion]);

  const triggerCsvDownload = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hasil-penilaian-fisika-mr-jo.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = async () => {
    setExportError('');
    if (token === LOCAL_TEACHER_TOKEN) {
      const csv = buildCsvContent(submissions);
      triggerCsvDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      return;
    }

    try {
      const res = await fetch('/api/teacher/export.csv', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const csv = buildCsvContent(submissions);
        triggerCsvDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
        return;
      }
      const blob = await res.blob();
      triggerCsvDownload(blob);
    } catch {
      try {
        const csv = buildCsvContent(submissions);
        triggerCsvDownload(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
      } catch {
        setExportError('Terjadi kendala saat mengunduh CSV.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="border-b border-teal-900/15 bg-teal-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-3.5 sm:px-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Scale className="h-5 w-5 shrink-0 text-teal-200" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-display text-sm sm:text-base font-bold tracking-tight truncate">
                  MODE GURU · {ASSESSMENT_META.appName}
                </p>
                <p className="text-xs text-teal-100/85 truncate">
                  Panel Evaluasi {ASSESSMENT_META.teacherName} · Kunci Jawaban, FBD, &
                  Pembahasan Lengkap
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportCsv}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-teal-700 bg-teal-800 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-700 cursor-pointer whitespace-nowrap"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ekspor CSV / Excel</span>
              </button>
              <button
                type="button"
                onClick={onExit}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-teal-950 transition-colors hover:bg-teal-50 cursor-pointer whitespace-nowrap"
              >
                <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Keluar Mode Guru</span>
              </button>
            </div>
          </div>

          {/* Primary Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('students')}
              className={`inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-white text-teal-950'
                  : 'bg-teal-800/80 text-teal-100 hover:bg-teal-700'
              }`}
            >
              <Users className="h-4 w-4" aria-hidden="true" />
              <span>Hasil Siswa ({submissions.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('solutions')}
              className={`inline-flex min-h-[42px] shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                activeTab === 'solutions'
                  ? 'bg-white text-teal-950'
                  : 'bg-teal-800/80 text-teal-100 hover:bg-teal-700'
              }`}
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Kunci, FBD & Pembahasan (1–10)</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-3 py-5 sm:px-6 sm:py-8 pb-24 space-y-5">
        {exportError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            {exportError}
          </div>
        )}

        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
          <strong className="text-slate-800">Catatan Penyimpanan:</strong> {storageNote}
        </div>

        {activeTab === 'students' && (
          <div className="space-y-5">
            {submissions.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                <p className="font-display text-base font-bold text-slate-900">
                  Belum Ada Pengumpulan Siswa
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Hasil nilai, riwayat waktu pengumpulan, serta rincian skor setiap nomor akan
                  otomatis tampil di sini setelah siswa mengumpulkan penilaian.
                </p>
              </div>
            ) : (
              <>
                {/* Submissions Table */}
                <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
                  <div className="border-b border-slate-200 px-4 py-3.5 sm:px-6">
                    <h2 className="font-display text-base sm:text-lg font-bold text-slate-900">
                      Daftar Hasil Penilaian Siswa
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600">
                        <tr>
                          <th className="px-4 py-3">Nama Siswa</th>
                          <th className="px-4 py-3">Kelas</th>
                          <th className="px-4 py-3">Terjawab</th>
                          <th className="px-4 py-3">Nilai Akhir</th>
                          <th className="px-4 py-3">Waktu Pengumpulan</th>
                          <th className="px-4 py-3">Detail</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {submissions.map((sub) => {
                          const selected = activeSubmission?.id === sub.id;
                          return (
                            <tr
                              key={sub.id}
                              className={selected ? 'bg-teal-50/60' : 'hover:bg-slate-50'}
                            >
                              <td className="px-4 py-3 font-semibold text-slate-900">
                                {sub.studentName}
                              </td>
                              <td className="px-4 py-3 text-slate-700">{sub.studentClass}</td>
                              <td className="px-4 py-3 font-mono-num text-slate-700">
                                {sub.answeredCount}/{sub.totalQuestions}
                              </td>
                              <td className="px-4 py-3 font-mono-num font-bold text-teal-800">
                                {formatScore(sub.totalScore)} / {sub.maxScore}
                              </td>
                              <td className="px-4 py-3 text-xs text-slate-600">
                                {new Date(sub.submittedAt).toLocaleString('id-ID')}
                              </td>
                              <td className="px-4 py-3">
                                <button
                                  type="button"
                                  onClick={() => setSelectedSubmissionId(sub.id)}
                                  className={`min-h-[36px] rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer ${
                                    selected
                                      ? 'bg-teal-800 text-white'
                                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                                  }`}
                                >
                                  {selected ? 'Dipilih' : 'Analisis'}
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Detailed Breakdown for Selected Student */}
                {activeSubmission && (
                  <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4">
                      <div>
                        <p className="text-xs font-bold text-teal-700">
                          RINCIAN ANALISIS JAWABAN SISWA
                        </p>
                        <h3 className="font-display text-lg font-bold text-slate-900">
                          {activeSubmission.studentName} — Kelas {activeSubmission.studentClass}
                        </h3>
                      </div>
                      <p className="font-mono-num text-xl font-extrabold text-teal-800">
                        Total: {formatScore(activeSubmission.totalScore)} /{' '}
                        {activeSubmission.maxScore}
                      </p>
                    </div>

                    <div className="grid gap-3">
                      {activeSubmission.breakdowns.map((item) => (
                        <div
                          key={item.questionId}
                          className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 sm:p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {item.isCorrect ? (
                                <CheckCircle2
                                  className="h-4 w-4 text-teal-700 shrink-0"
                                  aria-hidden="true"
                                />
                              ) : (
                                <XCircle
                                  className="h-4 w-4 text-red-600 shrink-0"
                                  aria-hidden="true"
                                />
                              )}
                              <span className="font-display text-sm font-bold text-slate-900">
                                Soal {item.questionId}
                              </span>
                            </div>
                            <span className="font-mono-num text-sm font-bold text-slate-900">
                              Skor: {formatScore(item.earnedPoints)} / {item.maxPoints}
                            </span>
                          </div>

                          <div className="mt-2 grid gap-2 text-xs sm:grid-cols-2">
                            <p className="rounded-lg bg-white border border-slate-200 px-3 py-2 text-slate-700">
                              <span className="font-semibold text-slate-500">
                                Jawaban Siswa:
                              </span>{' '}
                              <span className="font-mono-num font-semibold text-slate-900">
                                {item.studentAnswerDisplay}
                              </span>
                            </p>
                            <p className="rounded-lg bg-white border border-teal-200 px-3 py-2 text-teal-900">
                              <span className="font-semibold text-teal-700">
                                Kunci Jawaban:
                              </span>{' '}
                              <span className="font-mono-num font-bold">
                                {item.correctAnswerDisplay}
                              </span>
                            </p>
                          </div>

                          {item.statementDetails && (
                            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2">
                              {item.statementDetails.map((sd) => (
                                <div
                                  key={sd.id}
                                  className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px]"
                                >
                                  <span className="font-bold text-slate-800">{sd.id}:</span>{' '}
                                  <span>{sd.studentChoice ?? '-'}</span>{' '}
                                  <span className="font-mono-num font-bold text-teal-800">
                                    ({sd.points > 0 ? `+${sd.points}` : sd.points})
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </>
            )}
          </div>
        )}

        {activeTab === 'solutions' && activeQuestion && (
          <div className="space-y-5">
            {/* Question Selector 1-10 */}
            <nav
              aria-label="Pilih nomor pembahasan soal"
              className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4"
            >
              <p className="text-xs font-bold text-slate-600 mb-2">
                PILIH NOMOR SOAL UNTUK PEMBAHASAN & FBD LENGKAP
              </p>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {questions.map((q) => {
                  const active = q.id === activeQuestion.id;
                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`min-h-[42px] min-w-[42px] shrink-0 rounded-lg font-mono-num text-sm font-bold border cursor-pointer ${
                        active
                          ? 'bg-teal-800 text-white border-teal-800'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-teal-400'
                      }`}
                    >
                      {q.id}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Full 8-Section Physics Textbook Solution */}
            <article className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-7 space-y-6">
              <div className="border-b border-slate-200 pb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-teal-700">
                    PEMBAHASAN LENGKAP · SOAL {activeQuestion.id} ({activeQuestion.typeLabel})
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
                    {activeQuestion.title}
                  </h2>
                </div>
                <div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2">
                  <p className="text-[11px] font-bold text-teal-700">KUNCI JAWABAN</p>
                  <p className="font-mono-num text-sm font-extrabold text-teal-950">
                    {activeQuestion.correctAnswerDisplay}
                  </p>
                </div>
              </div>

              <MrJoVoiceControl
                textToSpeak={explanationSpeechText}
                listenLabel="DENGARKAN PEMBAHASAN BERTAHAP"
                resetKey={`teacher-q-${activeQuestion.id}`}
              />

              {/* Question Prompt & Original Stimulus */}
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-800">
                  <p className="text-xs font-bold text-slate-500 mb-1.5">NASKAH SOAL</p>
                  <MathText text={activeQuestion.prompt} as="p" />
                </div>
                <StimulusDiagram
                  questionId={activeQuestion.id}
                  caption={activeQuestion.stimulusCaption}
                  alt={activeQuestion.stimulusImageAlt}
                />
              </div>

              {/* 1. IDENTIFIKASI MASALAH */}
              <section className="space-y-2">
                <h3 className="font-display text-base font-bold text-teal-900">
                  1. IDENTIFIKASI MASALAH
                </h3>
                <div className="text-sm sm:text-[15px] leading-relaxed text-slate-800">
                  <MathText text={activeQuestion.explanation.identifikasiMasalah} as="p" />
                </div>
              </section>

              {/* 2. DIKETAHUI */}
              <section className="space-y-2">
                <h3 className="font-display text-base font-bold text-teal-900">
                  2. DIKETAHUI
                </h3>
                <ul className="space-y-1.5 text-sm sm:text-[15px] leading-relaxed text-slate-800 list-disc pl-5">
                  {activeQuestion.explanation.diketahui.map((line, i) => (
                    <li key={i}>
                      <MathText text={line} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3. DITANYAKAN */}
              <section className="space-y-2">
                <h3 className="font-display text-base font-bold text-teal-900">
                  3. DITANYAKAN
                </h3>
                <div className="text-sm sm:text-[15px] leading-relaxed text-slate-800">
                  <MathText text={activeQuestion.explanation.ditanyakan} as="p" />
                </div>
              </section>

              {/* 4. LANDASAN TEORI */}
              <section className="space-y-2">
                <h3 className="font-display text-base font-bold text-teal-900">
                  4. LANDASAN TEORI
                </h3>
                <ul className="space-y-2 text-sm sm:text-[15px] leading-relaxed text-slate-800 list-disc pl-5">
                  {activeQuestion.explanation.landasanTeori.map((line, i) => (
                    <li key={i}>
                      <MathText text={line} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* 5. FREE BODY DIAGRAM (FBD) */}
              <section className="space-y-3">
                <h3 className="font-display text-base font-bold text-teal-900">
                  5. FREE BODY DIAGRAM (FBD)
                </h3>
                <div className="text-sm sm:text-[15px] leading-relaxed text-slate-800">
                  <MathText text={activeQuestion.explanation.fbdSummary} as="p" />
                </div>
                <FreeBodyDiagram questionId={activeQuestion.id} />
                <ul className="space-y-1 text-xs sm:text-sm text-slate-700 list-disc pl-5">
                  {activeQuestion.explanation.fbdComponents.map((comp, i) => (
                    <li key={i}>
                      <MathText text={comp} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* 6. PENYELESAIAN MATEMATIS */}
              <section className="space-y-2.5">
                <h3 className="font-display text-base font-bold text-teal-900">
                  6. PENYELESAIAN MATEMATIS
                </h3>
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5 text-sm sm:text-[15px] leading-relaxed text-slate-800">
                  {activeQuestion.explanation.penyelesaianMatematis.map((step, i) => (
                    <div key={i}>
                      <MathText text={step} />
                    </div>
                  ))}
                </div>
              </section>

              {/* 7. VERIFIKASI */}
              <section className="space-y-2">
                <h3 className="font-display text-base font-bold text-teal-900">
                  7. VERIFIKASI
                </h3>
                <ul className="space-y-1.5 text-sm sm:text-[15px] leading-relaxed text-slate-800 list-disc pl-5">
                  {activeQuestion.explanation.verifikasi.map((v, i) => (
                    <li key={i}>
                      <MathText text={v} />
                    </li>
                  ))}
                </ul>
              </section>

              {/* 8. KESIMPULAN */}
              <section className="space-y-2 rounded-xl border border-teal-200 bg-teal-50/70 p-4">
                <h3 className="font-display text-base font-bold text-teal-950">
                  8. KESIMPULAN
                </h3>
                <div className="text-sm sm:text-[15px] leading-relaxed text-teal-950 font-medium">
                  <MathText text={activeQuestion.explanation.kesimpulan} as="p" />
                </div>
              </section>
            </article>
          </div>
        )}
      </main>
    </div>
  );
};
