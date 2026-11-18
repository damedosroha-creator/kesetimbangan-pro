import React, { useState } from 'react';
import { ArrowRight, BookOpen, Compass, Lock, Scale, UserCheck } from 'lucide-react';
import { ASSESSMENT_META } from '../data/studentQuestions';

interface LoginViewProps {
  onLogin: (studentName: string, studentClass: string) => void;
  onOpenTeacherMode: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onOpenTeacherMode,
}) => {
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanClass = studentClass.trim();
    if (!cleanName && !cleanClass) {
      setError('Nama Lengkap Siswa dan Kelas wajib diisi.');
      return;
    }
    if (!cleanName) {
      setError('Nama Lengkap Siswa tidak boleh kosong.');
      return;
    }
    if (!cleanClass) {
      setError('Kelas tidak boleh kosong.');
      return;
    }
    setError('');
    onLogin(cleanName, cleanClass);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <header className="border-b border-teal-900/15 bg-teal-900 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-2.5 min-w-0">
            <Scale className="h-5 w-5 shrink-0 text-teal-200" aria-hidden="true" />
            <span className="font-display text-sm sm:text-base font-bold tracking-tight truncate">
              {ASSESSMENT_META.appName}
            </span>
          </div>
          <button
            type="button"
            onClick={onOpenTeacherMode}
            className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-lg border border-teal-700 bg-teal-800 px-3.5 py-2 text-xs font-semibold text-teal-50 transition-colors hover:bg-teal-700 cursor-pointer whitespace-nowrap"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Mode Guru</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
          {/* Left Identity Panel */}
          <section className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <p className="text-xs font-bold tracking-wide text-teal-700">
              PENILAIAN FISIKA · JENJANG {ASSESSMENT_META.level}
            </p>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              {ASSESSMENT_META.appName}
            </h1>
            <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-600">
              Evaluasi pemahaman konsep dan analisis matematis pada materi{' '}
              <strong className="font-semibold text-slate-900">
                {ASSESSMENT_META.topic}
              </strong>
              .
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-200 pt-5 text-sm">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <dt className="text-xs font-medium text-slate-500">Pengajar</dt>
                <dd className="mt-1 font-display font-bold text-slate-900">
                  {ASSESSMENT_META.teacherName}
                </dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <dt className="text-xs font-medium text-slate-500">Mata Pelajaran</dt>
                <dd className="mt-1 font-display font-bold text-slate-900">
                  {ASSESSMENT_META.subject} ({ASSESSMENT_META.level})
                </dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <dt className="text-xs font-medium text-slate-500">Jumlah Soal</dt>
                <dd className="mt-1 font-mono-num font-bold text-slate-900">
                  {ASSESSMENT_META.totalQuestions} Soal HOTS
                </dd>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200/80">
                <dt className="text-xs font-medium text-slate-500">Skor Maksimal</dt>
                <dd className="mt-1 font-mono-num font-bold text-teal-800">
                  {ASSESSMENT_META.maxScore} Poin
                </dd>
              </div>
            </dl>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-3.5 text-xs leading-relaxed text-teal-900">
              <Compass className="mt-0.5 h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
              <p>
                Tersedia panduan narator suara <strong>VOICE GUIDANCE – MR JO</strong> serta
                diagram teknik fisika yang dapat diperbesar di setiap soal.
              </p>
            </div>
          </section>

          {/* Right Student Login Card */}
          <section className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-700 text-white">
                <UserCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-slate-900">
                  Login Identitas Siswa
                </h2>
                <p className="text-xs text-slate-500">
                  Lengkapi nama dan kelas sebelum membaca petunjuk penilaian.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Nama Lengkap Siswa <span className="text-red-600">*</span>
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Contoh: Budi Santoso"
                  autoComplete="name"
                  required
                  className="mt-1.5 w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                />
              </div>

              <div>
                <label
                  htmlFor="student-class"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Kelas <span className="text-red-600">*</span>
                </label>
                <input
                  id="student-class"
                  type="text"
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Contoh: XI IPA 2"
                  required
                  className="mt-1.5 w-full min-h-[48px] rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm sm:text-base font-bold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 cursor-pointer"
              >
                <span>MULAI PENILAIAN</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <p className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <BookOpen className="h-3.5 w-3.5 shrink-0 text-teal-700" aria-hidden="true" />
                <span>Nama dan kelas otomatis dicatat pada lembar hasil penilaian.</span>
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};
