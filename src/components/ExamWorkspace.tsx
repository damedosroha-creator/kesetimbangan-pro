import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lock,
  Scale,
  Send,
} from 'lucide-react';
import { ASSESSMENT_META, STUDENT_QUESTIONS } from '../data/studentQuestions';
import type {
  StudentAnswersMap,
  TrueFalseChoice,
} from '../types/assessment';
import { isQuestionAnswered } from '../utils/scoring';
import { MathText } from './MathText';
import { MrJoVoiceControl } from './MrJoVoiceControl';
import { StimulusDiagram } from './StimulusDiagram';

interface ExamWorkspaceProps {
  studentName: string;
  studentClass: string;
  answers: StudentAnswersMap;
  onChangeAnswer: (questionId: number, value: StudentAnswersMap[number]) => void;
  onSubmitExam: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string;
  onOpenTeacherMode: () => void;
}

const FILL_TUTORIAL_SPEECH =
  'Petunjuk pengisian jawaban soal isian singkat. ' +
  'Pertama, baca besaran yang diminta dengan teliti. ' +
  'Kedua, masukkan angka hasil perhitungan pada kolom jawaban. ' +
  'Ketiga, jika jawaban memerlukan satuan, tuliskan satuan setelah angka dengan satu spasi. ' +
  'Keempat, gunakan titik untuk desimal. ' +
  'Kelima, jangan memasukkan langkah perhitungan ke dalam kolom jawaban. ' +
  'Keenam, jangan menambahkan simbol atau karakter yang tidak diperlukan. ' +
  'Contoh format penulisan: 25 newton, 12 koma 5 newton meter, atau 0 koma 4.';

export const ExamWorkspace: React.FC<ExamWorkspaceProps> = ({
  studentName,
  studentClass,
  answers,
  onChangeAnswer,
  onSubmitExam,
  isSubmitting,
  submitError,
  onOpenTeacherMode,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const currentQuestion = STUDENT_QUESTIONS[currentIndex];

  const { answeredCount, unansweredCount } = useMemo(() => {
    let answered = 0;
    for (const q of STUDENT_QUESTIONS) {
      if (isQuestionAnswered(q.type, answers[q.id])) {
        answered += 1;
      }
    }
    return {
      answeredCount: answered,
      unansweredCount: STUDENT_QUESTIONS.length - answered,
    };
  }, [answers]);

  const progressPct = Math.round((answeredCount / STUDENT_QUESTIONS.length) * 100);

  // Compose complete spoken text for MR JO (Question + Stimulus info + Options/Statements)
  const questionSpeechText = useMemo(() => {
    const q = currentQuestion;
    const parts: string[] = [
      `Soal nomor ${q.id}. ${q.title}.`,
      q.prompt,
      `Informasi gambar stimulus: ${q.stimulusCaption}`,
    ];
    if (q.options && q.options.length > 0) {
      parts.push('Pilihan jawaban:');
      for (const opt of q.options) {
        parts.push(`Pilihan ${opt.id}: ${opt.text}`);
      }
    }
    if (q.statements && q.statements.length > 0) {
      parts.push('Pernyataan yang harus dinilai Benar atau Salah:');
      q.statements.forEach((st, idx) => {
        parts.push(`Pernyataan ${idx + 1}: ${st.text}`);
      });
    }
    return parts.join(' ');
  }, [currentQuestion]);

  const handleSingleChoice = (optionId: string) => {
    onChangeAnswer(currentQuestion.id, optionId);
  };

  const handleComplexToggle = (optionId: string) => {
    const current = Array.isArray(answers[currentQuestion.id])
      ? (answers[currentQuestion.id] as string[])
      : [];
    const next = current.includes(optionId)
      ? current.filter((item) => item !== optionId)
      : [...current, optionId];
    onChangeAnswer(currentQuestion.id, next);
  };

  const handleTrueFalseChange = (statementId: string, choice: TrueFalseChoice) => {
    const existing =
      answers[currentQuestion.id] &&
      typeof answers[currentQuestion.id] === 'object' &&
      !Array.isArray(answers[currentQuestion.id])
        ? (answers[currentQuestion.id] as Record<string, TrueFalseChoice | null>)
        : {};
    const next: Record<string, TrueFalseChoice | null> = {
      ...existing,
      [statementId]: existing[statementId] === choice ? null : choice,
    };
    onChangeAnswer(currentQuestion.id, next);
  };

  const handleConfirmSubmit = async () => {
    await onSubmitExam();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =====================================================================
          TOP CONTROL CONSOLE — ALL INTERACTIVE NAVIGATION & SUBMIT AT THE TOP
          ZERO INTERACTIVE CONTROLS AT THE BOTTOM OF THE PAGE
          ===================================================================== */}
      <header className="border-b border-teal-900/15 bg-teal-900 text-white">
        <div className="mx-auto max-w-5xl px-3 py-2.5 sm:px-6 sm:py-3.5 space-y-2 sm:space-y-3">
          {/* Row 1: App Identity + Student Name/Class + Teacher Mode */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <Scale className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-teal-200" aria-hidden="true" />
              <div className="min-w-0">
                <p className="font-display text-xs sm:text-sm font-bold tracking-tight truncate">
                  {ASSESSMENT_META.appName}
                </p>
                <p className="text-[11px] sm:text-xs text-teal-100/90 truncate">
                  {studentName} · Kelas {studentClass} · Guru: {ASSESSMENT_META.teacherName}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenTeacherMode}
              className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-lg border border-teal-700 bg-teal-800 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-teal-50 transition-colors hover:bg-teal-700 cursor-pointer whitespace-nowrap"
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Mode Guru</span>
            </button>
          </div>

          {/* Row 2: Progress Indicator */}
          <div className="rounded-xl bg-teal-950/45 px-3 py-1.5 sm:py-2">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-teal-100">
              <span>
                Progres:{' '}
                <strong className="font-mono-num text-white">
                  {answeredCount}/{STUDENT_QUESTIONS.length}
                </strong>{' '}
                soal terjawab
              </span>
              <span className="font-mono-num font-bold text-teal-200">{progressPct}%</span>
            </div>
            <div
              className="mt-1 h-1.5 sm:h-2 w-full overflow-hidden rounded-full bg-teal-950"
              role="progressbar"
              aria-valuenow={answeredCount}
              aria-valuemin={0}
              aria-valuemax={STUDENT_QUESTIONS.length}
              aria-label="Progres pengerjaan soal"
            >
              <div
                className="h-full bg-teal-400 transition-all duration-200"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Row 3: Question Numbers 1-10 (horizontal scrollable on narrow 300px phones) */}
          <nav aria-label="Navigasi nomor soal 1 sampai 10">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
              {STUDENT_QUESTIONS.map((q, idx) => {
                const isActive = idx === currentIndex;
                const answered = isQuestionAnswered(q.type, answers[q.id]);
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Soal nomor ${q.id}${answered ? ' (sudah dijawab)' : ' (belum dijawab)'}`}
                    aria-current={isActive ? 'step' : undefined}
                    className={`min-h-[40px] min-w-[40px] sm:min-h-[42px] sm:min-w-[42px] shrink-0 rounded-lg font-mono-num text-sm font-bold transition-colors cursor-pointer flex items-center justify-center border ${
                      isActive
                        ? 'bg-white text-teal-950 border-white shadow-xs'
                        : answered
                          ? 'bg-teal-600 text-white border-teal-500 hover:bg-teal-500'
                          : 'bg-teal-800/80 text-teal-100 border-teal-700 hover:bg-teal-700'
                    }`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Row 4: SEBELUMNYA, BERIKUTNYA, KUMPULKAN JAWABAN */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
            <div className="col-span-2 grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <button
                type="button"
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="inline-flex min-h-[42px] sm:min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-teal-700 bg-teal-800 px-3 py-2 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-teal-700 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>SEBELUMNYA</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setCurrentIndex((i) => Math.min(STUDENT_QUESTIONS.length - 1, i + 1))
                }
                disabled={currentIndex === STUDENT_QUESTIONS.length - 1}
                className="inline-flex min-h-[42px] sm:min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-teal-700 bg-teal-800 px-3 py-2 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-teal-700 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
              >
                <span>BERIKUTNYA</span>
                <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="col-span-2 inline-flex min-h-[44px] sm:min-h-[46px] items-center justify-center gap-2 rounded-xl bg-white px-5 py-2 text-xs sm:text-sm font-extrabold text-teal-950 transition-colors hover:bg-teal-50 cursor-pointer whitespace-nowrap"
            >
              <Send className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
              <span>KUMPULKAN JAWABAN</span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          TOP-ANCHORED SUBMISSION CONFIRMATION MODAL
          ===================================================================== */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/70 px-3 pt-4 sm:pt-8 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="confirm-submit-title"
        >
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800">
                <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="confirm-submit-title"
                  className="font-display text-base sm:text-lg font-extrabold text-slate-900"
                >
                  APAKAH ANDA YAKIN INGIN MENGUMPULKAN JAWABAN?
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-slate-600">
                  Periksa kembali kelengkapan jawaban Anda sebelum mengunci penilaian.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-teal-200 bg-teal-50 p-3">
                <p className="text-xs font-medium text-teal-800">Soal Terjawab</p>
                <p className="mt-0.5 font-mono-num text-xl font-extrabold text-teal-950">
                  {answeredCount} Soal
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-600">Belum Terjawab</p>
                <p className="mt-0.5 font-mono-num text-xl font-extrabold text-slate-900">
                  {unansweredCount} Soal
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-xs font-medium text-amber-900">
              Peringatan: Setelah dikumpulkan, seluruh jawaban akan dikunci otomatis dan tidak
              dapat diubah kembali.
            </div>

            {submitError && (
              <div
                role="alert"
                className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-700"
              >
                {submitError}
              </div>
            )}

            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={isSubmitting}
                className="min-h-[48px] rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-100 cursor-pointer"
              >
                BATAL
              </button>
              <button
                type="button"
                onClick={handleConfirmSubmit}
                disabled={isSubmitting}
                className="min-h-[48px] rounded-xl bg-teal-700 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-teal-800 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? 'MENGUMPULKAN...' : 'YA, KUMPULKAN SEKARANG'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MAIN QUESTION CARD (NO BOTTOM NAVIGATION OR FOOTER BUTTONS)
          ===================================================================== */}
      <main className="mx-auto max-w-4xl px-3 py-5 sm:px-6 sm:py-8">
        <article
          key={currentQuestion.id}
          className="rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-7 space-y-5"
        >
          {/* Question Header */}
          <div className="flex flex-col gap-1 border-b border-slate-200 pb-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="font-bold text-teal-800">
                SOAL {currentQuestion.id} DARI {STUDENT_QUESTIONS.length}
              </span>
              <span className="font-medium text-slate-600">
                {currentQuestion.typeLabel}
              </span>
            </div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-slate-900">
              {currentQuestion.title}
            </h1>
          </div>

          {/* MR JO Voice Guidance */}
          <MrJoVoiceControl
            textToSpeak={questionSpeechText}
            listenLabel="DENGARKAN SOAL"
            resetKey={currentQuestion.id}
          />

          {/* Stimulus Diagram */}
          <StimulusDiagram
            questionId={currentQuestion.id}
            caption={currentQuestion.stimulusCaption}
            alt={currentQuestion.stimulusImageAlt}
          />

          {/* Question Stem */}
          <div className="text-[15px] sm:text-base leading-relaxed text-slate-800">
            <MathText text={currentQuestion.prompt} as="p" />
          </div>

          {/* Type 1: Single Choice (Soal 1 & 2) */}
          {currentQuestion.type === 'single_choice' && currentQuestion.options && (
            <fieldset className="space-y-2.5">
              <legend className="text-xs font-bold tracking-wide text-slate-600 mb-2">
                PILIH SATU JAWABAN YANG PALING TEPAT
              </legend>
              {currentQuestion.options.map((opt) => {
                const selected = answers[currentQuestion.id] === opt.id;
                return (
                  <label
                    key={opt.id}
                    className={`flex min-h-[54px] items-start gap-3 rounded-xl border p-3.5 sm:p-4 transition-colors cursor-pointer ${
                      selected
                        ? 'border-teal-700 bg-teal-50/80 ring-1 ring-teal-700'
                        : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={opt.id}
                      checked={selected}
                      onChange={() => handleSingleChoice(opt.id)}
                      className="mt-1 h-5 w-5 shrink-0 accent-teal-700 cursor-pointer"
                    />
                    <span className="font-display text-sm font-bold text-teal-900 shrink-0 mt-0.5">
                      {opt.id}.
                    </span>
                    <span className="text-sm sm:text-[15px] leading-relaxed text-slate-800 min-w-0">
                      <MathText text={opt.text} />
                    </span>
                  </label>
                );
              })}
            </fieldset>
          )}

          {/* Type 2: Complex Choice (Soal 3 & 4) */}
          {currentQuestion.type === 'complex_choice' && currentQuestion.options && (
            <fieldset className="space-y-2.5">
              <legend className="text-xs font-bold tracking-wide text-slate-600 mb-2">
                CENTANG SEMUA PERNYATAAN YANG BENAR (LEBIH DARI SATU)
              </legend>
              {currentQuestion.options.map((opt) => {
                const currentList = Array.isArray(answers[currentQuestion.id])
                  ? (answers[currentQuestion.id] as string[])
                  : [];
                const checked = currentList.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className={`flex min-h-[54px] items-start gap-3 rounded-xl border p-3.5 sm:p-4 transition-colors cursor-pointer ${
                      checked
                        ? 'border-teal-700 bg-teal-50/80 ring-1 ring-teal-700'
                        : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleComplexToggle(opt.id)}
                        className="h-5 w-5 rounded border-slate-300 accent-teal-700 cursor-pointer"
                      />
                    </span>
                    <span className="font-display text-sm font-bold text-teal-900 shrink-0 mt-0.5">
                      {opt.id}.
                    </span>
                    <span className="text-sm sm:text-[15px] leading-relaxed text-slate-800 min-w-0">
                      <MathText text={opt.text} />
                    </span>
                  </label>
                );
              })}
            </fieldset>
          )}

          {/* Type 3: True/False 4 Statements (Soal 5) */}
          {currentQuestion.type === 'true_false_4' && currentQuestion.statements && (
            <div className="space-y-3">
              <p className="text-xs font-bold tracking-wide text-slate-600">
                TENTUKAN BENAR ATAU SALAH UNTUK SETIAP PERNYATAAN (+2,5 BENAR · -1 SALAH · 0 KOSONG)
              </p>
              {currentQuestion.statements.map((st, idx) => {
                const mapVal =
                  answers[currentQuestion.id] &&
                  typeof answers[currentQuestion.id] === 'object' &&
                  !Array.isArray(answers[currentQuestion.id])
                    ? (answers[currentQuestion.id] as Record<string, TrueFalseChoice | null>)
                    : {};
                const selectedChoice = mapVal[st.id] ?? null;

                return (
                  <div
                    key={st.id}
                    className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 sm:p-4 space-y-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono-num text-xs font-bold text-teal-800 mt-0.5 shrink-0">
                        {idx + 1}.
                      </span>
                      <div className="text-sm sm:text-[15px] leading-relaxed text-slate-800">
                        <MathText text={st.text} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {(['BENAR', 'SALAH'] as const).map((choice) => {
                        const active = selectedChoice === choice;
                        return (
                          <button
                            key={choice}
                            type="button"
                            onClick={() => handleTrueFalseChange(st.id, choice)}
                            aria-pressed={active}
                            className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                              active
                                ? 'border-teal-700 bg-teal-700 text-white'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-teal-400 hover:text-teal-900'
                            }`}
                          >
                            {active && <Check className="h-4 w-4" aria-hidden="true" />}
                            <span>{choice}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Type 4: Short Numeric (Soal 6-10) with mandatory non-spoiler Tutorial */}
          {currentQuestion.type === 'short_numeric' && (
            <div className="space-y-4">
              {/* Tutorial Box before input */}
              <div className="rounded-xl border border-teal-200 bg-slate-50 p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-900">
                  <HelpCircle className="h-4 w-4 shrink-0 text-teal-700" aria-hidden="true" />
                  <span>PETUNJUK PENGISIAN JAWABAN</span>
                </div>

                <MrJoVoiceControl
                  textToSpeak={FILL_TUTORIAL_SPEECH}
                  listenLabel="DENGARKAN PETUNJUK PENGISIAN"
                  resetKey={`tut-${currentQuestion.id}`}
                  compact
                />

                <ol className="space-y-1 text-xs sm:text-sm leading-relaxed text-slate-700 list-decimal pl-5">
                  <li>Baca besaran yang diminta dengan teliti.</li>
                  <li>Masukkan angka hasil perhitungan pada kolom jawaban.</li>
                  <li>
                    Jika jawaban memerlukan satuan, tuliskan satuan setelah angka dengan satu
                    spasi.
                  </li>
                  <li>
                    Gunakan titik (<code className="font-mono-num font-bold">.</code>) untuk
                    desimal.
                  </li>
                  <li>Jangan memasukkan langkah perhitungan ke dalam kolom jawaban.</li>
                  <li>Jangan menambahkan simbol atau karakter yang tidak diperlukan.</li>
                </ol>

                <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Contoh format penulisan:
                  </span>{' '}
                  <code className="font-mono-num font-bold text-teal-800">25 N</code> ·{' '}
                  <code className="font-mono-num font-bold text-teal-800">12.5 Nm</code> ·{' '}
                  <code className="font-mono-num font-bold text-teal-800">0.4</code>
                  <span className="block mt-1 text-[11px] text-slate-500">
                    Contoh di atas hanya menunjukkan format penulisan, bukan petunjuk jawaban
                    soal.
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`short-answer-${currentQuestion.id}`}
                  className="block text-sm font-bold text-slate-900"
                >
                  Jawaban Akhir Anda (Soal {currentQuestion.id})
                </label>
                <input
                  id={`short-answer-${currentQuestion.id}`}
                  type="text"
                  value={
                    typeof answers[currentQuestion.id] === 'string'
                      ? (answers[currentQuestion.id] as string)
                      : ''
                  }
                  onChange={(e) => onChangeAnswer(currentQuestion.id, e.target.value)}
                  placeholder="Ketik angka dan satuan sesuai format (mis. 25 N)"
                  autoComplete="off"
                  className="mt-2 w-full min-h-[52px] rounded-xl border-2 border-slate-300 bg-white px-4 py-3 font-mono-num text-base font-semibold text-slate-900 placeholder:font-sans placeholder:font-normal placeholder:text-slate-400 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/20"
                />
              </div>
            </div>
          )}
        </article>

        {/* Generous empty whitespace at the bottom of the page — ZERO buttons or interactive footer */}
        <div className="h-36 sm:h-48" aria-hidden="true" />
      </main>
    </div>
  );
};
