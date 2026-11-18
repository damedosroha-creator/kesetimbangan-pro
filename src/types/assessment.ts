export type QuestionType =
  | 'single_choice'
  | 'complex_choice'
  | 'true_false_4'
  | 'short_numeric';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface TrueFalseStatement {
  id: 'S1' | 'S2' | 'S3' | 'S4';
  text: string;
}

export interface PublicQuestion {
  id: number;
  type: QuestionType;
  typeLabel: string;
  maxPoints: number;
  title: string;
  prompt: string;
  stimulusCaption: string;
  stimulusImageAlt: string;
  options?: QuestionOption[];
  statements?: TrueFalseStatement[];
  requiresTutorial?: boolean;
  requiresUnit?: boolean;
}

export type TrueFalseChoice = 'BENAR' | 'SALAH';

export type StudentAnswerValue =
  | string // for single_choice or short_numeric
  | string[] // for complex_choice
  | Record<string, TrueFalseChoice | null>; // for true_false_4

export type StudentAnswersMap = Record<number, StudentAnswerValue>;

export interface StatementBreakdown {
  id: string;
  studentChoice: TrueFalseChoice | null;
  correctChoice: TrueFalseChoice;
  points: number;
  status: 'correct' | 'incorrect' | 'unanswered';
}

export interface QuestionScoreBreakdown {
  questionId: number;
  type: QuestionType;
  maxPoints: number;
  earnedPoints: number;
  isCorrect: boolean;
  isAnswered: boolean;
  studentAnswerDisplay: string;
  correctAnswerDisplay: string;
  statementDetails?: StatementBreakdown[];
}

export interface SubmissionResultPublic {
  id: string;
  studentName: string;
  studentClass: string;
  material: string;
  teacherName: string;
  submittedAt: string;
  answeredCount: number;
  totalQuestions: number;
  totalScore: number;
  maxScore: number;
  status: 'SELESAI DIKUMPULKAN';
}

export interface SubmissionRecordFull extends SubmissionResultPublic {
  breakdowns: QuestionScoreBreakdown[];
  rawAnswers: StudentAnswersMap;
}

export interface TextbookExplanation {
  identifikasiMasalah: string;
  diketahui: string[];
  ditanyakan: string;
  landasanTeori: string[];
  fbdSummary: string;
  fbdComponents: string[];
  penyelesaianMatematis: string[];
  verifikasi: string[];
  kesimpulan: string;
}

export interface TeacherQuestionFull extends PublicQuestion {
  correctAnswerDisplay: string;
  explanation: TextbookExplanation;
}
