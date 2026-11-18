import test from 'node:test';
import assert from 'node:assert/strict';
import { latexToSpeechIndonesian, splitIntoSpeechChunks } from './tts';

test('latexToSpeechIndonesian strips raw LaTeX and speaks physics symbols naturally', () => {
  const sample =
    'Gunakan $\\Sigma \\tau_A = 0$ dan $\\sin 37^{\\circ} = 0,6$ dengan $F_2 = 160\\text{ N}$ serta $\\mu_{s,\\min} = 0,375$.';
  const spoken = latexToSpeechIndonesian(sample);

  assert.equal(spoken.includes('\\'), false);
  assert.equal(spoken.includes('$'), false);
  assert.equal(spoken.includes('{'), false);
  assert.match(spoken, /sigma/i);
  assert.match(spoken, /tau/i);
  assert.match(spoken, /sinus/i);
  assert.match(spoken, /derajat/i);
  assert.match(spoken, /newton/i);
  assert.match(spoken, /koefisien gesekan statis minimum/i);
  assert.match(spoken, /0 koma 6/);
});

test('splitIntoSpeechChunks splits long explanation into readable sentences', () => {
  const chunks = splitIntoSpeechChunks(
    'Langkah pertama hitung berat batang $W_b = 120\\text{ N}$. Langkah kedua gunakan $\\Sigma \\tau_A = 0$.'
  );
  assert.equal(chunks.length, 2);
});
