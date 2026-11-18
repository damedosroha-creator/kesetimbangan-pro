import React from 'react';
import { Award, CheckCircle2, Lock, RotateCcw, Scale } from 'lucide-react';
import { ASSESSMENT_META } from '../data/studentQuestions';
import { formatScore } from '../utils/scoring';
import type { SubmissionResultPublic } from '../types/assessment';

interface ResultViewProps {
  result: SubmissionResultPublic;
  onOpenTeacherMode: () => void;
  onStartNewSession: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  result,
  onOpenTeacherMode,
  onStartNewSession,
}) => {
  const formattedTime = new Date(result.submittedAt).toLocaleString('id-ID', {
    dateStyle: 'long',
    timeStyle: 'medium',
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar with actions strictly at top */}
      <header className="border-b border-teal-900/15 bg-teal-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <Scale className="h-5 w-5 shrink-0 text-teal-200" aria-hidden="true" />
            <span className="font-display text-sm sm:text-base font-bold tracking-tight truncate">
              {ASSESSMENT_META.appName}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onStartNewSession}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-teal-700 bg-teal-800 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-700 cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Siswa Baru</span>
            </button>
            <button
              type="button"
              onClick={onOpenTeacherMode}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-xs font-bold text-teal-900 transition-colors hover:bg-teal-50 cursor-pointer whitespace-nowrap"
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Mode Guru</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10 pb-28">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex flex-col items-start gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-wide text-teal-700">
                  BUKTI PENGUMPULAN PENILAIAN
                </p>
                <h1 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                  Jawaban Berhasil Dikumpulkan
                </h1>
                <p className="mt-0.5 text-sm text-slate-600">
                  Status: <strong className="text-teal-800">{result.status}</strong>
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto rounded-xl border border-teal-200 bg-teal-50 px-5 py-3.5 text-left sm:text-right">
              <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold text-teal-800">
                <Award className="h-4 w-4" aria-hidden="true" />
                <span>NILAI AKHIR</span>
              </div>
              <p className="mt-1 font-mono-num text-3xl font-extrabold text-teal-900">
                {formatScore(result.totalScore)}{' '}
                <span className="text-base font-semibold text-teal-700">
                  / {result.maxScore}
                </span>
              </p>
            </div>
          </div>

          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <dt className="text-xs font-medium text-slate-500">Nama Lengkap Siswa</dt>
              <dd className="mt-1 font-display text-base font-bold text-slate-900">
                {result.studentName}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <dt className="text-xs font-medium text-slate-500">Kelas</dt>
              <dd className="mt-1 font-display text-base font-bold text-slate-900">
                {result.studentClass}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <dt className="text-xs font-medium text-slate-500">Materi Penilaian</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {result.material}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <dt className="text-xs font-medium text-slate-500">Pengajar</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {result.teacherName}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <dt className="text-xs font-medium text-slate-500">Tanggal & Waktu Pengumpulan</dt>
              <dd className="mt-1 text-sm font-semibold text-slate-900">
                {formattedTime}
              </dd>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <dt className="text-xs font-medium text-slate-500">Jumlah Soal Dijawab</dt>
              <dd className="mt-1 font-mono-num text-sm font-bold text-slate-900">
                {result.answeredCount} dari {result.totalQuestions} soal
              </dd>
            </div>
          </dl>

          <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-600">
            Seluruh jawaban Anda telah dikunci dan tercatat pada sistem penilaian. Kunci jawaban
            serta pembahasan lengkap hanya dapat diakses oleh pengajar melalui Mode Guru.
          </p>
        </section>
      </main>
    </div>
  );
};
