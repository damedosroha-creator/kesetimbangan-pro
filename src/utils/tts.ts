/**
 * Converts text containing LaTeX math ($...$ or $$...$$) and physics symbols/units
 * into clean, natural Indonesian spoken prose for MR JO Voice Guidance.
 * Never speaks raw LaTeX backslashes or braces.
 */
export function latexToSpeechIndonesian(input: string): string {
  let text = input;

  // Replace display and inline math delimiters cleanly
  text = text.replace(/\$\$([\s\S]*?)\$\$/g, ' $1 ');
  text = text.replace(/\$([^$]+)\$/g, ' $1 ');

  // Replace common LaTeX fractions: \frac{a}{b} -> "a per b"
  // Run multiple times for simple nested cases
  for (let i = 0; i < 3; i++) {
    text = text.replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '$1 per $2');
  }

  // Square root: \sqrt{x} -> "akar dari x"
  text = text.replace(/\\sqrt\{([^{}]+)\}/g, 'akar dari $1');

  // Physics unit combinations before individual replacements
  text = text
    .replace(/\\text\{N\s*\\cdot\s*m\}|N\\cdot m|N\s*·\s*m|Nm\b/gi, ' newton meter ')
    .replace(/\\text\{m\/s\^2\}|m\/s\^2|m\/s²/gi, ' meter per sekon kuadrat ')
    .replace(/\\text\{kg\}/g, ' kilogram ')
    .replace(/\\text\{N\}/g, ' newton ')
    .replace(/\\text\{m\}/g, ' meter ')
    .replace(/\\text\{([^}]*)\}/g, ' $1 ');

  // Greek letters and physics symbols — use (?![a-zA-Z]) so subscripts like \tau_A match cleanly
  const symbolReplacements: Array<[RegExp, string]> = [
    [/\\Sigma(?![a-zA-Z])|Σ/g, ' sigma '],
    [/\\tau(?![a-zA-Z])|τ/g, ' tau '],
    [/\\theta(?![a-zA-Z])|θ/g, ' theta '],
    [/\\alpha(?![a-zA-Z])|α/g, ' alfa '],
    [/\\phi(?![a-zA-Z])|φ/g, ' phi '],
    [/\\mu_\{?s,\\min\}?|\\mu_\{?s,\s*\\min\}?|μ_s,min/g, ' koefisien gesekan statis minimum '],
    [/\\mu_s(?![a-zA-Z])|\\mu(?![a-zA-Z])|μ_s|μ/g, ' koefisien gesekan '],
    [/\\sin(?![a-zA-Z])/g, ' sinus '],
    [/\\cos(?![a-zA-Z])/g, ' kosinus '],
    [/\\tan(?![a-zA-Z])/g, ' tangen '],
    [/\\times|×/g, ' kali '],
    [/\\cdot|·/g, ' kali '],
    [/\\approx|≈/g, ' kira-kira sama dengan '],
    [/\\ge|≥/g, ' lebih besar atau sama dengan '],
    [/\\le|≤/g, ' lebih kecil atau sama dengan '],
    [/\\ne|≠/g, ' tidak sama dengan '],
    [/\\implies|⇒/g, ' maka '],
    [/\\to|→/g, ' menjadi '],
    [/\^\{\\circ\}|\^\\circ|°/g, ' derajat '],
    [/\^2(?![0-9])|²/g, ' kuadrat '],
    [/\s*=\s*/g, ' sama dengan '],
    [/\s*>\s*/g, ' lebih besar dari '],
    [/\s*<\s*/g, ' lebih kecil dari '],
    [/\s*\+\s*/g, ' tambah '],
    [/(\d)\s*-\s*(\d)/g, '$1 kurang $2'],
  ];

  for (const [pattern, replacement] of symbolReplacements) {
    text = text.replace(pattern, replacement);
  }

  // Subscript cleanups like F_1, W_b, R_{Ax}, N_L, N_D, f_s, or "tau _A"
  text = text
    .replace(/R_\{?Ax\}?/g, 'R A x')
    .replace(/R_\{?Ay\}?/g, 'R A y')
    .replace(/R_A\b/g, 'R A')
    .replace(/R_B\b/g, 'R B')
    .replace(/N_L\b/g, 'gaya normal lantai')
    .replace(/N_D\b/g, 'gaya normal dinding')
    .replace(/N_O\b/g, 'gaya normal titik tumpu O')
    .replace(/f_\{?s,\\max\}?/g, 'gaya gesek statis maksimum')
    .replace(/f_s\b/g, 'gaya gesek statis')
    .replace(/W_\{?total\}?/g, 'berat total')
    .replace(/W_\{?papan\}?/g, 'berat papan')
    .replace(/W_\{?balok\}?/g, 'berat balok')
    .replace(/m_\{?papan\}?/g, 'massa papan')
    .replace(/m_\{?balok\}?/g, 'massa balok')
    .replace(/([A-Za-z])\s*_\s*\{?([A-Za-z0-9]+)\}?/g, '$1 $2');

  // Standalone units after numbers (e.g. "160 N", "4,8 m", "40 kg")
  text = text
    .replace(/(\d+(?:[.,]\d+)?)\s*N\b/g, '$1 newton')
    .replace(/(\d+(?:[.,]\d+)?)\s*kg\b/g, '$1 kilogram')
    .replace(/(\d+(?:[.,]\d+)?)\s*m\b/g, '$1 meter');

  // Convert Indonesian decimal comma between digits into "koma" for crisp pronunciation
  text = text.replace(/(\d),(\d)/g, '$1 koma $2');
  // Convert decimal dot between digits into "koma" in Indonesian speech
  text = text.replace(/(\d)\.(\d)/g, '$1 koma $2');

  // Strip remaining LaTeX braces, backslashes, or parentheses artifacts
  text = text
    .replace(/\\left|\\right/g, ' ')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[_^{}]/g, ' ')
    .replace(/\s+([.,!?])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

export interface SpeechChunk {
  text: string;
}

export function splitIntoSpeechChunks(text: string): string[] {
  const spoken = latexToSpeechIndonesian(text);
  if (!spoken) return [];
  // Split cleanly at sentence boundaries so pause/resume & step-by-step playback feel natural
  const rawParts = spoken.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  for (const part of rawParts) {
    const trimmed = part.trim();
    if (trimmed) chunks.push(trimmed);
  }
  return chunks.length > 0 ? chunks : [spoken];
}

/**
 * Selects the best available Indonesian male voice from browser SpeechSynthesis.
 * Returns null if none found (caller falls back to browser default id-ID voice).
 */
export function selectMrJoVoice(
  voices: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  if (!voices || voices.length === 0) return null;

  const idVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith('id')
  );
  if (idVoices.length === 0) return null;

  // Heuristic preference for male / clear adult Indonesian voices across Chrome/Edge/macOS/Android
  const maleHints = ['ardika', 'ardi', 'damar', 'male', 'laki', 'pria', 'andika', 'budi'];
  for (const hint of maleHints) {
    const found = idVoices.find((v) => v.name.toLowerCase().includes(hint));
    if (found) return found;
  }

  // Avoid known female-named voices if another id-ID voice exists
  const femaleHints = ['gadis', 'damayanti', 'female', 'wanita', 'perempuan'];
  const nonFemale = idVoices.find(
    (v) => !femaleHints.some((f) => v.name.toLowerCase().includes(f))
  );
  return nonFemale ?? idVoices[0];
}
