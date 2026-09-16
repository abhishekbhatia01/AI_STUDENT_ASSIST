import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveQuizAttempt } from "../api/notes/notesApi";
import { addQuizAttempt, setActiveQuiz } from "../store/quizSlice/quizSlice";

const Quiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const routeQuiz = state?.quiz;
  const storedQuiz = useSelector(
    (currentState) => currentState.quiz.activeQuiz,
  );
  const quiz = routeQuiz || storedQuiz;
  const noteId = state?.noteId;
  const difficulty = state?.difficulty;
  const noteTitle = state?.noteTitle;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (routeQuiz) {
      dispatch(setActiveQuiz(routeQuiz));
    }
  }, [dispatch, routeQuiz]);

  const score = useMemo(
    () =>
      quiz?.questions.reduce(
        (total, question, index) =>
          total + (answers[index] === question.answer ? 1 : 0),
        0,
      ),
    [answers, quiz],
  );

  if (!quiz?.questions?.length) {
    return (
      <main className="min-h-screen bg-[#f5f4ed] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-xl border border-[#d7dcd3] bg-white p-8 text-center shadow-sm">
          <h1 className="font-serif text-3xl text-[#1b2925]">
            Quiz unavailable
          </h1>
          <p className="mt-3 text-sm text-[#68736c]">
            Generate a quiz from a note before opening this page.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-6 rounded-[3px] bg-[#1b2925] px-5 py-3 text-sm font-bold text-white"
          >
            Go back
          </button>
        </div>
      </main>
    );
  }

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== quiz.questions.length) {
      toast.error("Answer every question before checking your score.");
      return;
    }

    setSubmitted(true);

    if (noteId && difficulty) {
      try {
        setSaving(true);
        const response = await saveQuizAttempt({
          noteId,
          difficulty,
          score,
          totalQuestions: quiz.questions.length,
          questions: quiz.questions,
        });
        dispatch(addQuizAttempt(response.data));
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Your score was shown, but the attempt could not be saved.",
        );
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f4ed] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-[3px] border border-[#d7dcd3] bg-white px-4 py-2 text-sm font-semibold text-[#1b2925] transition hover:border-[#b7c3bc]"
          >
            ← Back to notes
          </button>
          {noteTitle && (
            <p className="text-sm font-medium text-[#68736c]">{noteTitle}</p>
          )}
        </div>

        <section className="rounded-xl border border-[#c8dce6] bg-white p-6 shadow-[0_16px_40px_rgba(67,80,68,0.07)] sm:p-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3 border-b border-[#e5e9df] pb-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
                Practice mode
              </p>
              <h1 className="mt-1 font-serif text-3xl text-[#12263a]">
                Test your understanding
              </h1>
              <p className="mt-2 text-sm text-[#557080]">
                {quiz.questions.length} questions from your study notes
              </p>
            </div>
            {submitted && (
              <p className="text-sm font-bold text-[#287277]">
                Score: {score}/{quiz.questions.length}
              </p>
            )}
          </div>

          <div className="space-y-8">
            {quiz.questions.map((question, questionIndex) => (
              <fieldset key={`${question.question}-${questionIndex}`}>
                <legend className="text-sm font-bold leading-6 text-[#12263a]">
                  {questionIndex + 1}. {question.question}
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {question.options.map((option, optionIndex) => {
                    const selected = answers[questionIndex] === optionIndex;
                    const correct =
                      submitted && optionIndex === question.answer;
                    const incorrect =
                      submitted && selected && optionIndex !== question.answer;

                    return (
                      <label
                        key={option}
                        className={`flex cursor-pointer items-start gap-3 border px-3 py-3 text-sm transition ${
                          correct
                            ? "border-[#81b9a9] bg-[#edf8f4] text-[#287277]"
                            : incorrect
                              ? "border-[#ef6f61] bg-[#fff1ed] text-[#c9554d]"
                              : selected
                                ? "border-[#ef6f61] bg-[#fff1ed] text-[#c9554d]"
                                : "border-[#d7e4e9] text-[#557080] hover:border-[#ef6f61]"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          checked={selected}
                          disabled={submitted}
                          onChange={() =>
                            setAnswers((current) => ({
                              ...current,
                              [questionIndex]: optionIndex,
                            }))
                          }
                          className="mt-0.5 accent-[#ef6f61]"
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
                {submitted && (
                  <p className="mt-2 text-xs leading-5 text-[#68736c]">
                    {question.explanation}
                  </p>
                )}
              </fieldset>
            ))}
          </div>

          {!submitted && (
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-8 rounded-[3px] bg-[#12263a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d4964]"
            >
              {saving ? "Saving result..." : "Check answers"}
            </button>
          )}
        </section>
      </div>
    </main>
  );
};

export default Quiz;
