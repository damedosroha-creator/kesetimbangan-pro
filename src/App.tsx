import { useEffect, useState } from 'react';
import { ExamWorkspace } from './components/ExamWorkspace';
import { InstructionsView } from './components/InstructionsView';
import { LoginView } from './components/LoginView';
import { ResultView } from './components/ResultView';
import { TeacherAuthModal, TeacherDashboard } from './components/TeacherDashboard';
import {
  LOCAL_TEACHER_TOKEN,
  submitAssessmentLocal,
} from './utils/localFallback';
import type {
  StudentAnswersMap,
  SubmissionRecordFull,
  SubmissionResultPublic,
  TeacherQuestionFull,
} from './types/assessment';

type AppStage = 'login' | 'instructions' | 'exam' | 'result' | 'teacher';

export default function App() {
  const [stage, setStage] = useState<AppStage>('login');
  const [previousStage, setPreviousStage] = useState<AppStage>('login');

  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [answers, setAnswers] = useState<StudentAnswersMap>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submissionResult, setSubmissionResult] =
    useState<SubmissionResultPublic | null>(null);

  // Teacher mode state (password ALWAYS requested when entering Mode Guru)
  const [teacherAuthOpen, setTeacherAuthOpen] = useState(false);
  const [teacherSession, setTeacherSession] = useState<{
    token: string;
    submissions: SubmissionRecordFull[];
    questions: TeacherQuestionFull[];
    storageNote: string;
  } | null>(null);

  // Support ?autostart=1 for deterministic verification/demo inspection
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1' && !studentName) {
      setStudentName('Siswa Uji');
      setStudentClass('XI IPA 1');
      setStage('exam');
    }
  }, [studentName]);

  const handleStudentLogin = (name: string, cls: string) => {
    setStudentName(name);
    setStudentClass(cls);
    setAnswers({});
    setSubmissionResult(null);
    setSubmitError('');
    setStage('instructions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartExam = () => {
    setStage('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerChange = (
    questionId: number,
    value: StudentAnswersMap[number]
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmitExam = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    const runLocalSubmit = async () => {
      const localResult = await submitAssessmentLocal({
        studentName,
        studentClass,
        answers,
      });
      setSubmissionResult(localResult);
      setStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          studentClass,
          answers,
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');

      if (!isJson || res.status === 404 || res.status === 405 || res.status >= 500) {
        await runLocalSubmit();
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || 'Gagal mengumpulkan jawaban.');
        return;
      }
      setSubmissionResult(data as SubmissionResultPublic);
      setStage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      try {
        await runLocalSubmit();
      } catch {
        setSubmitError('Gagal memproses pengumpulan jawaban.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartNewSession = () => {
    setStudentName('');
    setStudentClass('');
    setAnswers({});
    setSubmissionResult(null);
    setSubmitError('');
    setStage('login');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTeacherMode = () => {
    setPreviousStage(stage === 'teacher' ? 'login' : stage);
    setTeacherAuthOpen(true);
  };

  const handleTeacherAuthSuccess = (
    token: string,
    payload: {
      submissions: SubmissionRecordFull[];
      questions: TeacherQuestionFull[];
      storageNote: string;
    }
  ) => {
    setTeacherSession({
      token,
      ...payload,
    });
    setTeacherAuthOpen(false);
    setStage('teacher');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitTeacherMode = async () => {
    if (teacherSession?.token && teacherSession.token !== LOCAL_TEACHER_TOKEN) {
      try {
        await fetch('/api/teacher/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${teacherSession.token}` },
        });
      } catch {
        // Ignore network error during logout cleanup
      }
    }
    setTeacherSession(null);
    setStage(previousStage);
  };

  return (
    <>
      {stage === 'login' && (
        <LoginView
          onLogin={handleStudentLogin}
          onOpenTeacherMode={handleOpenTeacherMode}
        />
      )}

      {stage === 'instructions' && (
        <InstructionsView
          studentName={studentName}
          studentClass={studentClass}
          onStartExam={handleStartExam}
          onOpenTeacherMode={handleOpenTeacherMode}
        />
      )}

      {stage === 'exam' && (
        <ExamWorkspace
          studentName={studentName}
          studentClass={studentClass}
          answers={answers}
          onChangeAnswer={handleAnswerChange}
          onSubmitExam={handleSubmitExam}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onOpenTeacherMode={handleOpenTeacherMode}
        />
      )}

      {stage === 'result' && submissionResult && (
        <ResultView
          result={submissionResult}
          onOpenTeacherMode={handleOpenTeacherMode}
          onStartNewSession={handleStartNewSession}
        />
      )}

      {stage === 'teacher' && teacherSession && (
        <TeacherDashboard
          token={teacherSession.token}
          submissions={teacherSession.submissions}
          questions={teacherSession.questions}
          storageNote={teacherSession.storageNote}
          onExit={handleExitTeacherMode}
        />
      )}

      {teacherAuthOpen && (
        <TeacherAuthModal
          onSuccess={handleTeacherAuthSuccess}
          onCancel={() => setTeacherAuthOpen(false)}
        />
      )}
    </>
  );
}
