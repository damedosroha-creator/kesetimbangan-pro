import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatScore,
  gradeAssessment,
  gradeQuestion,
  parseShortNumericAnswer,
  type QuestionGradingRule,
} from './scoring';

test('parseShortNumericAnswer handles units, decimals, and rejects expressions', () => {
  assert.deepEqual(parseShortNumericAnswer('160 N'), {
    valid: true,
    value: 160,
    unit: 'n',
  });
  assert.deepEqual(parseShortNumericAnswer('4.8 m'), {
    valid: true,
    value: 4.8,
    unit: 'm',
  });
  assert.deepEqual(parseShortNumericAnswer('3,75 meter'), {
    valid: true,
    value: 3.75,
    unit: 'm',
  });
  assert.deepEqual(parseShortNumericAnswer('40kg'), {
    valid: true,
    value: 40,
    unit: 'kg',
  });
  assert.equal(parseShortNumericAnswer('100 + 60 N').valid, false);
  assert.equal(parseShortNumericAnswer('').valid, false);
});

test('single_choice grants 10 for exact match and 0 otherwise', () => {
  const rule: QuestionGradingRule = {
    questionId: 1,
    type: 'single_choice',
    maxPoints: 10,
    correctOption: 'C',
    correctAnswerDisplay: 'C',
  };
  assert.equal(gradeQuestion(rule, 'C').earnedPoints, 10);
  assert.equal(gradeQuestion(rule, 'A').earnedPoints, 0);
  assert.equal(gradeQuestion(rule, undefined).earnedPoints, 0);
});

test('complex_choice gives 10 ONLY when exact set matches (no partial points)', () => {
  const rule: QuestionGradingRule = {
    questionId: 3,
    type: 'complex_choice',
    maxPoints: 10,
    correctOptions: ['A', 'C', 'D'],
    correctAnswerDisplay: 'A, C, D',
  };
  assert.equal(gradeQuestion(rule, ['D', 'A', 'C']).earnedPoints, 10);
  assert.equal(gradeQuestion(rule, ['A', 'C']).earnedPoints, 0);
  assert.equal(gradeQuestion(rule, ['A', 'B', 'C', 'D']).earnedPoints, 0);
  assert.equal(gradeQuestion(rule, []).earnedPoints, 0);
});

test('true_false_4 applies +2.5 correct, -1 wrong, 0 unanswered per statement', () => {
  const rule: QuestionGradingRule = {
    questionId: 5,
    type: 'true_false_4',
    maxPoints: 10,
    correctStatements: {
      S1: 'BENAR',
      S2: 'SALAH',
      S3: 'BENAR',
      S4: 'SALAH',
    },
    correctAnswerDisplay: 'S1: BENAR | S2: SALAH | S3: BENAR | S4: SALAH',
  };

  // All 4 correct = +10
  assert.equal(
    gradeQuestion(rule, {
      S1: 'BENAR',
      S2: 'SALAH',
      S3: 'BENAR',
      S4: 'SALAH',
    }).earnedPoints,
    10
  );

  // All 4 wrong = -4
  assert.equal(
    gradeQuestion(rule, {
      S1: 'SALAH',
      S2: 'BENAR',
      S3: 'SALAH',
      S4: 'BENAR',
    }).earnedPoints,
    -4
  );

  // 2 correct (+5), 1 wrong (-1), 1 blank (0) = +4
  assert.equal(
    gradeQuestion(rule, {
      S1: 'BENAR',
      S2: 'BENAR',
      S3: 'BENAR',
      S4: null,
    }).earnedPoints,
    4
  );

  // 1 correct (+2.5), 3 blank (0) = +2.5
  assert.equal(
    gradeQuestion(rule, {
      S1: 'BENAR',
      S2: null,
      S3: null,
      S4: null,
    }).earnedPoints,
    2.5
  );
});

test('short_numeric respects tolerance and required unit', () => {
  const rule: QuestionGradingRule = {
    questionId: 6,
    type: 'short_numeric',
    maxPoints: 10,
    expectedNumeric: 160,
    tolerance: 0.5,
    expectedUnit: 'N',
    correctAnswerDisplay: '160 N',
  };

  assert.equal(gradeQuestion(rule, '160 N').earnedPoints, 10);
  assert.equal(gradeQuestion(rule, '160.2 newton').earnedPoints, 10);
  assert.equal(gradeQuestion(rule, '160 kg').earnedPoints, 0);
  assert.equal(gradeQuestion(rule, '160').earnedPoints, 0);
  assert.equal(gradeQuestion(rule, '162 N').earnedPoints, 0);
});

test('gradeAssessment sums all 10 questions cleanly up to 100', () => {
  const rules: QuestionGradingRule[] = [
    { questionId: 1, type: 'single_choice', maxPoints: 10, correctOption: 'C', correctAnswerDisplay: 'C' },
    {
      questionId: 5,
      type: 'true_false_4',
      maxPoints: 10,
      correctStatements: { S1: 'BENAR', S2: 'SALAH', S3: 'BENAR', S4: 'SALAH' },
      correctAnswerDisplay: '',
    },
  ];
  const res = gradeAssessment(rules, {
    1: 'C',
    5: { S1: 'BENAR', S2: null, S3: null, S4: null },
  });
  assert.equal(res.totalScore, 12.5);
  assert.equal(formatScore(res.totalScore), '12.5');
});
