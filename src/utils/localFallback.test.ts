import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildCsvContent,
  loadTeacherDashboardLocal,
  submitAssessmentLocal,
  verifyTeacherPasswordLocal,
} from './localFallback';

test('verifyTeacherPasswordLocal accepts ABC and rejects wrong passwords', async () => {
  assert.equal(await verifyTeacherPasswordLocal('ABC'), true);
  assert.equal(await verifyTeacherPasswordLocal('abc'), false);
  assert.equal(await verifyTeacherPasswordLocal('XYZ'), false);
  assert.equal(await verifyTeacherPasswordLocal(''), false);
});

test('loadTeacherDashboardLocal loads all 10 questions and explanations without server', async () => {
  const dash = await loadTeacherDashboardLocal();
  assert.equal(dash.questions.length, 10);
  assert.ok(dash.storageNote.includes('Mode Tanpa Server'));
});

test('submitAssessmentLocal grades answers locally and buildCsvContent produces valid UTF-8 BOM CSV', async () => {
  const result = await submitAssessmentLocal({
    studentName: 'Budi Vercel',
    studentClass: 'XI IPA 2',
    answers: { 1: 'C', 2: 'B' },
  });
  assert.equal(result.totalScore, 20);
  assert.equal(result.answeredCount, 2);

  const csv = buildCsvContent([
    {
      ...result,
      breakdowns: [
        {
          questionId: 1,
          type: 'single_choice',
          maxPoints: 10,
          earnedPoints: 10,
          isCorrect: true,
          isAnswered: true,
          studentAnswerDisplay: 'C',
          correctAnswerDisplay: 'C',
        },
      ],
      rawAnswers: { 1: 'C' },
    },
  ]);
  assert.ok(csv.startsWith('\uFEFF'));
  assert.ok(csv.includes('Budi Vercel'));
  assert.ok(csv.includes('XI IPA 2'));
});
