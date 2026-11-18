import type {
  QuestionScoreBreakdown,
  QuestionType,
  StatementBreakdown,
  StudentAnswersMap,
  StudentAnswerValue,
  TrueFalseChoice,
} from '../types/assessment';

export interface QuestionGradingRule {
  questionId: number;
  type: QuestionType;
  maxPoints: number;
  // single_choice
  correctOption?: string;
  // complex_choice
  correctOptions?: string[];
  // true_false_4
  correctStatements?: Record<string, TrueFalseChoice>;
  // short_numeric
  expectedNumeric?: number;
  tolerance?: number;
  expectedUnit?: string; // e.g., 'N', 'm', 'kg', or '' if dimensionless
  acceptedUnits?: string[];
  correctAnswerDisplay: string;
}

export interface ParsedNumericInput {
  valid: boolean;
  value: number | null;
  unit: string;
}

const UNIT_ALIASES: Record<string, string> = {
  n: 'n',
  newton: 'n',
  m: 'm',
  meter: 'm',
  mtr: 'm',
  kg: 'kg',
  kilogram: 'kg',
  nm: 'nm',
  'n.m': 'nm',
  'n*m': 'nm',
  'n m': 'nm',
  'newton meter': 'nm',
};

export function normalizeUnit(rawUnit: string): string {
  const cleaned = rawUnit.trim().toLowerCase().replace(/\s+/g, ' ');
  return UNIT_ALIASES[cleaned] ?? cleaned;
}

/**
 * Parses a student's short numeric response like "160 N", "4.8 m", "3,75 m", "40 kg".
 * Rejects mathematical expressions (e.g., "100+60 N") so students must compute the final value.
 */
export function parseShortNumericAnswer(raw: string): ParsedNumericInput {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { valid: false, value: null, unit: '' };
  }

  // Match optional sign, digits with optional single decimal separator (. or ,), optional unit
  const match = /^([+-]?\d+(?:[.,]\d+)?)\s*([a-zA-Z.* ]*)$/.exec(trimmed);
  if (!match) {
    return { valid: false, value: null, unit: '' };
  }

  const numStr = match[1].replace(',', '.');
  const parsed = Number(numStr);
  if (!Number.isFinite(parsed)) {
    return { valid: false, value: null, unit: '' };
  }

  const unit = normalizeUnit(match[2] ?? '');
  return { valid: true, value: parsed, unit };
}

export function formatScore(score: number): string {
  const rounded = Math.round(score * 100) / 100;
  if (Number.isInteger(rounded)) {
    return String(rounded);
  }
  return rounded.toFixed(2).replace(/\.?0+$/, '');
}

export function isQuestionAnswered(
  type: QuestionType,
  answer: StudentAnswerValue | undefined
): boolean {
  if (answer === undefined || answer === null) return false;
  if (type === 'single_choice' || type === 'short_numeric') {
    return typeof answer === 'string' && answer.trim().length > 0;
  }
  if (type === 'complex_choice') {
    return Array.isArray(answer) && answer.length > 0;
  }
  if (type === 'true_false_4') {
    if (typeof answer !== 'object' || Array.isArray(answer)) return false;
    return Object.values(answer).some((v) => v === 'BENAR' || v === 'SALAH');
  }
  return false;
}

export function gradeQuestion(
  rule: QuestionGradingRule,
  answer: StudentAnswerValue | undefined
): QuestionScoreBreakdown {
  const answered = isQuestionAnswered(rule.type, answer);

  if (rule.type === 'single_choice') {
    const selected = typeof answer === 'string' ? answer.trim().toUpperCase() : '';
    const isCorrect = selected.length > 0 && selected === rule.correctOption;
    return {
      questionId: rule.questionId,
      type: rule.type,
      maxPoints: rule.maxPoints,
      earnedPoints: isCorrect ? 10 : 0,
      isCorrect,
      isAnswered: answered,
      studentAnswerDisplay: selected || '(Tidak dijawab)',
      correctAnswerDisplay: rule.correctAnswerDisplay,
    };
  }

  if (rule.type === 'complex_choice') {
    const selectedList = Array.isArray(answer)
      ? Array.from(new Set(answer.map((s) => s.trim().toUpperCase()))).sort()
      : [];
    const expectedList = [...(rule.correctOptions ?? [])].sort();
    const isCorrect =
      selectedList.length === expectedList.length &&
      selectedList.every((val, idx) => val === expectedList[idx]);

    return {
      questionId: rule.questionId,
      type: rule.type,
      maxPoints: rule.maxPoints,
      earnedPoints: isCorrect ? 10 : 0,
      isCorrect,
      isAnswered: answered,
      studentAnswerDisplay:
        selectedList.length > 0 ? selectedList.join(', ') : '(Tidak dijawab)',
      correctAnswerDisplay: rule.correctAnswerDisplay,
    };
  }

  if (rule.type === 'true_false_4') {
    const studentMap =
      answer && typeof answer === 'object' && !Array.isArray(answer)
        ? (answer as Record<string, TrueFalseChoice | null>)
        : {};
    const expectedMap = rule.correctStatements ?? {};
    const statementIds = ['S1', 'S2', 'S3', 'S4'];
    const details: StatementBreakdown[] = [];
    let total = 0;

    for (const sid of statementIds) {
      const studentChoice = studentMap[sid] ?? null;
      const correctChoice = expectedMap[sid];
      let pts = 0;
      let status: StatementBreakdown['status'] = 'unanswered';
      if (studentChoice === 'BENAR' || studentChoice === 'SALAH') {
        if (studentChoice === correctChoice) {
          pts = 2.5;
          status = 'correct';
        } else {
          pts = -1;
          status = 'incorrect';
        }
      }
      total += pts;
      details.push({
        id: sid,
        studentChoice,
        correctChoice,
        points: pts,
        status,
      });
    }

    const displayParts = details.map(
      (d) => `${d.id}: ${d.studentChoice ?? '-'}`
    );

    return {
      questionId: rule.questionId,
      type: rule.type,
      maxPoints: rule.maxPoints,
      earnedPoints: Math.round(total * 100) / 100,
      isCorrect: details.every((d) => d.status === 'correct'),
      isAnswered: answered,
      studentAnswerDisplay: displayParts.join(' | '),
      correctAnswerDisplay: rule.correctAnswerDisplay,
      statementDetails: details,
    };
  }

  // short_numeric
  const rawStr = typeof answer === 'string' ? answer.trim() : '';
  const parsed = parseShortNumericAnswer(rawStr);
  let isCorrect = false;

  if (parsed.valid && parsed.value !== null && rule.expectedNumeric !== undefined) {
    const tol = rule.tolerance ?? 0.01;
    const numOk = Math.abs(parsed.value - rule.expectedNumeric) <= tol;
    const expectedUnitNorm = normalizeUnit(rule.expectedUnit ?? '');
    const acceptedSet = new Set(
      [expectedUnitNorm, ...(rule.acceptedUnits ?? []).map(normalizeUnit)].filter(
        Boolean
      )
    );

    let unitOk = false;
    if (!expectedUnitNorm) {
      unitOk = parsed.unit === '';
    } else {
      unitOk = acceptedSet.has(parsed.unit);
    }

    isCorrect = numOk && unitOk;
  }

  return {
    questionId: rule.questionId,
    type: rule.type,
    maxPoints: rule.maxPoints,
    earnedPoints: isCorrect ? 10 : 0,
    isCorrect,
    isAnswered: answered,
    studentAnswerDisplay: rawStr || '(Tidak dijawab)',
    correctAnswerDisplay: rule.correctAnswerDisplay,
  };
}

export function gradeAssessment(
  rules: QuestionGradingRule[],
  answers: StudentAnswersMap
): {
  breakdowns: QuestionScoreBreakdown[];
  totalScore: number;
  maxScore: number;
  answeredCount: number;
} {
  const breakdowns = rules.map((rule) =>
    gradeQuestion(rule, answers[rule.questionId])
  );
  const totalScore =
    Math.round(breakdowns.reduce((acc, b) => acc + b.earnedPoints, 0) * 100) /
    100;
  const maxScore = breakdowns.reduce((acc, b) => acc + b.maxPoints, 0);
  const answeredCount = breakdowns.filter((b) => b.isAnswered).length;

  return {
    breakdowns,
    totalScore,
    maxScore,
    answeredCount,
  };
}
