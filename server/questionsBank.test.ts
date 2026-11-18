import test from 'node:test';
import assert from 'node:assert/strict';
import { GRADING_RULES, TEACHER_QUESTIONS_FULL } from './questionsBank';
import { gradeAssessment } from '../src/utils/scoring';

test('all 10 questions grade to exact 100 when answered with verified physics solutions', () => {
  const perfectAnswers = {
    1: 'C',
    2: 'B',
    3: ['A', 'C', 'D'],
    4: ['A', 'C', 'D'],
    5: { S1: 'BENAR' as const, S2: 'SALAH' as const, S3: 'BENAR' as const, S4: 'SALAH' as const },
    6: '160 N',
    7: '4.8 m',
    8: '3.75 m',
    9: '40 kg',
    10: '500 N',
  };

  const result = gradeAssessment(GRADING_RULES, perfectAnswers);
  assert.equal(result.totalScore, 100);
  assert.equal(result.maxScore, 100);
  assert.equal(result.answeredCount, 10);
  assert.equal(result.breakdowns.every((b) => b.earnedPoints === 10), true);
});

test('every question 1..10 has complete 8-section textbook explanation', () => {
  assert.equal(TEACHER_QUESTIONS_FULL.length, 10);
  for (const q of TEACHER_QUESTIONS_FULL) {
    assert.ok(q.explanation.identifikasiMasalah.length > 20);
    assert.ok(q.explanation.diketahui.length >= 3);
    assert.ok(q.explanation.ditanyakan.length > 10);
    assert.ok(q.explanation.landasanTeori.length >= 2);
    assert.ok(q.explanation.fbdSummary.length > 20);
    assert.ok(q.explanation.fbdComponents.length >= 3);
    assert.ok(q.explanation.penyelesaianMatematis.length >= 4);
    assert.ok(q.explanation.verifikasi.length >= 1);
    assert.ok(q.explanation.kesimpulan.length > 15);
  }
});
