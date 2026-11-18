import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, Square, Volume2 } from 'lucide-react';
import { selectMrJoVoice, splitIntoSpeechChunks } from '../utils/tts';

interface MrJoVoiceControlProps {
  textToSpeak: string;
  listenLabel?: string;
  resetKey?: string | number;
  compact?: boolean;
}

type SpeechStatus = 'idle' | 'speaking' | 'paused' | 'unsupported';

export const MrJoVoiceControl: React.FC<MrJoVoiceControlProps> = ({
  textToSpeak,
  listenLabel = 'DENGARKAN SOAL',
  resetKey,
  compact = false,
}) => {
  const [status, setStatus] = useState<SpeechStatus>('idle');
  const [chunkProgress, setChunkProgress] = useState<{ current: number; total: number }>({
    current: 0,
    total: 0,
  });
  const [voiceLabel, setVoiceLabel] = useState<string>('Suara Browser Bahasa Indonesia');
  const chunksRef = useRef<string[]>([]);
  const chunkIndexRef = useRef<number>(0);
  const activeRunIdRef = useRef<number>(0);
  const selectedVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatus('unsupported');
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const chosen = selectMrJoVoice(voices);
      selectedVoiceRef.current = chosen;
      if (chosen) {
        setVoiceLabel(`${chosen.name} (${chosen.lang})`);
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices);
    };
  }, []);

  const stopSpeech = () => {
    activeRunIdRef.current += 1;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    chunkIndexRef.current = 0;
    setChunkProgress({ current: 0, total: 0 });
    setStatus(
      typeof window !== 'undefined' && 'speechSynthesis' in window
        ? 'idle'
        : 'unsupported'
    );
  };

  // Stop playback cleanly when switching questions or unmounting
  useEffect(() => {
    stopSpeech();
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [resetKey]);

  const speakChunkAt = (index: number, runId: number) => {
    if (runId !== activeRunIdRef.current) return;
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const chunks = chunksRef.current;
    if (index >= chunks.length) {
      setStatus('idle');
      setChunkProgress({ current: 0, total: 0 });
      chunkIndexRef.current = 0;
      return;
    }

    chunkIndexRef.current = index;
    setChunkProgress({ current: index + 1, total: chunks.length });

    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92; // Tenang, jelas, tidak terlalu cepat
    utterance.pitch = 0.88; // Sedikit lebih rendah agar mendekati karakter suara laki-laki dewasa
    if (selectedVoiceRef.current) {
      utterance.voice = selectedVoiceRef.current;
    }

    utterance.onend = () => {
      if (runId !== activeRunIdRef.current) return;
      speakChunkAt(index + 1, runId);
    };

    utterance.onerror = () => {
      if (runId !== activeRunIdRef.current) return;
      setStatus('idle');
      setChunkProgress({ current: 0, total: 0 });
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleStart = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setStatus('unsupported');
      return;
    }
    window.speechSynthesis.cancel();
    const runId = activeRunIdRef.current + 1;
    activeRunIdRef.current = runId;

    const chunks = splitIntoSpeechChunks(textToSpeak);
    if (chunks.length === 0) return;

    chunksRef.current = chunks;
    setStatus('speaking');
    speakChunkAt(0, runId);
  };

  const handlePause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  };

  const handleResume = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.resume();
    setStatus('speaking');
  };

  return (
    <div
      className={`rounded-xl border border-teal-200 bg-teal-50/70 ${
        compact ? 'p-3' : 'p-3.5 sm:p-4'
      }`}
      aria-label="Narator Suara MR JO"
    >
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2.5 min-w-0">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-800 text-white">
            <Volume2 className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold tracking-wide text-teal-900">
              VOICE GUIDANCE – MR JO
            </p>
            <p className="text-xs text-teal-800/80 truncate">
              {status === 'unsupported'
                ? 'Browser Anda tidak mendukung fitur Text-to-Speech.'
                : status === 'speaking'
                  ? `Membacakan bagian ${chunkProgress.current} dari ${chunkProgress.total}`
                  : status === 'paused'
                    ? `Dijeda pada bagian ${chunkProgress.current} dari ${chunkProgress.total}`
                    : `Audio bawaan browser · ${voiceLabel}`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {status === 'idle' && (
            <button
              type="button"
              onClick={handleStart}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{listenLabel}</span>
            </button>
          )}

          {status === 'speaking' && (
            <button
              type="button"
              onClick={handlePause}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-teal-800 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 cursor-pointer"
            >
              <Pause className="h-3.5 w-3.5" aria-hidden="true" />
              <span>JEDA</span>
            </button>
          )}

          {status === 'paused' && (
            <button
              type="button"
              onClick={handleResume}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" aria-hidden="true" />
              <span>LANJUTKAN</span>
            </button>
          )}

          {(status === 'speaking' || status === 'paused') && (
            <button
              type="button"
              onClick={stopSpeech}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-teal-300 bg-white px-4 py-2 text-xs font-semibold text-teal-900 transition-colors hover:bg-teal-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 cursor-pointer"
            >
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              <span>HENTIKAN</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
