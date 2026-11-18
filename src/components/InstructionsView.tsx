import React from 'react';
import { ArrowRight, CheckSquare, FileText, Lock, Scale } from 'lucide-react';
import { ASSESSMENT_META } from '../data/studentQuestions';
import { MrJoVoiceControl } from './MrJoVoiceControl';
import { MathText } from './MathText';

interface InstructionsViewProps {
  studentName: string;
  studentClass: string;
  onStartExam: () => void;
  onOpenTeacherMode: () => void;
}

const INSTRUCTIONS_SPEECH_TEXT =
  'Selamat datang di Penilaian Fisika SMA materi Dinamika Rotasi, Kesetimbangan Benda Tegar bersama MR JO. ' +
  'Penilaian ini terdiri atas 10 soal dengan skor maksimal 100 poin dan percepatan gravitasi g sama dengan 10 meter per sekon kuadrat. ' +
  'Soal nomor 1 dan 2 berbentuk pilihan ganda biasa bernilai 10 poin per soal. ' +
  'Soal nomor 3 dan 4 berbentuk pilihan ganda kompleks dengan kotak centang; seluruh pilihan tepat bernilai 10 poin, jika ada satu kekeliruan bernilai 0 poin tanpa poin parsial. ' +
  'Soal nomor 5 berbentuk Benar atau Salah dengan 4 pernyataan; setiap pernyataan bernilai plus 2,5 jika benar, minus 1 jika salah, dan 0 jika tidak dijawab. ' +
  'Soal nomor 6 sampai 10 berbentuk isian singkat matematis bernilai 10 poin per soal. Bacalah petunjuk pengisian jawaban sebelum menuliskan angka dan satuannya. ' +
  'Seluruh tombol navigasi soal dan tombol kumpulkan jawaban berada di bagian atas halaman. Tekan tombol Mulai Mengerjakan Soal jika Anda sudah siap.';

export const InstructionsView: React.FC<InstructionsViewProps> = ({
  studentName,
  studentClass,
  onStartExam,
  onOpenTeacherMode,
}) => {
  return (
    <div className="min-h-screen bg-slate-50">
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

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-10 pb-24">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-bold tracking-wide text-teal-700">
                PETUNJUK PENGERJAAN PENILAIAN
              </p>
              <h1 className="mt-1 font-display text-xl sm:text-2xl font-bold text-slate-900">
                {ASSESSMENT_META.topic}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                Peserta: <strong className="text-slate-900">{studentName}</strong> · Kelas:{' '}
                <strong className="text-slate-900">{studentClass}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={onStartExam}
              className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-teal-800 cursor-pointer"
            >
              <span>MULAI MENGERJAKAN SOAL</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <MrJoVoiceControl
            textToSpeak={INSTRUCTIONS_SPEECH_TEXT}
            listenLabel="DENGARKAN PETUNJUK"
            resetKey="instructions"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-teal-900">
                <FileText className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <span>Ketentuan Umum & Tetapan</span>
              </div>
              <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-slate-700 list-disc pl-5">
                <li>
                  Jumlah soal sebanyak <strong>10 butir HOTS</strong> dengan skor maksimal{' '}
                  <strong>100 poin</strong>.
                </li>
                <li>
                  Gunakan percepatan gravitasi{' '}
                  <MathText text="$g = 10\text{ m/s}^2$" /> dan nilai trigonometri yang
                  tercantum pada setiap soal.
                </li>
                <li>
                  Periksa setiap <strong>gambar stimulus fisika</strong> dengan teliti. Anda
                  dapat menekan tombol <em>Perbesar</em> untuk melihat detail ukuran pada layar
                  kecil.
                </li>
                <li>
                  Seluruh kontrol navigasi nomor soal, tombol <em>Sebelumnya</em>,{' '}
                  <em>Berikutnya</em>, dan <em>Kumpulkan Jawaban</em> tersedia di{' '}
                  <strong>bagian atas halaman</strong>.
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-teal-900">
                <CheckSquare className="h-4 w-4 text-teal-700" aria-hidden="true" />
                <span>Aturan Bentuk Soal & Penilaian</span>
              </div>
              <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-slate-700 list-disc pl-5">
                <li>
                  <strong>Soal 1–2 (Pilihan Ganda):</strong> pilih 1 jawaban benar (Benar ={' '}
                  <span className="font-semibold tabular-nums">10</span>, Salah ={' '}
                  <span className="font-semibold tabular-nums">0</span>).
                </li>
                <li>
                  <strong>Soal 3–4 (Pilihan Ganda Kompleks):</strong> pilih lebih dari 1
                  pernyataan benar dengan kotak centang. Skor{' '}
                  <span className="font-semibold tabular-nums">10</span> hanya jika <strong>seluruh</strong>{' '}
                  pilihan tepat (tanpa poin parsial).
                </li>
                <li>
                  <strong>Soal 5 (Benar / Salah · 4 Pernyataan):</strong> Benar{' '}
                  <span className="font-semibold tabular-nums">+2,5</span>, Salah{' '}
                  <span className="font-semibold tabular-nums">-1</span>, Tidak dijawab{' '}
                  <span className="font-semibold tabular-nums">0</span> (Maks{' '}
                  <span className="font-semibold tabular-nums">10</span>, Min{' '}
                  <span className="font-semibold tabular-nums">-4</span>).
                </li>
                <li>
                  <strong>Soal 6–10 (Isian Singkat Matematis):</strong> ikuti tutorial
                  penulisan angka dan satuan yang tampil pada soal. Benar ={' '}
                  <span className="font-semibold tabular-nums">10</span>, Salah ={' '}
                  <span className="font-semibold tabular-nums">0</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
