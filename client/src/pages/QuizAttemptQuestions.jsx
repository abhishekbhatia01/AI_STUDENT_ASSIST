import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import StudySidebar from "../components/StudySidebar";
import { getQuizAttempt } from "../api/notes/notesApi";

const QuizAttemptQuestions = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttempt = async () => {
      try {
        const response = await getQuizAttempt(attemptId);
        setAttempt(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load this quiz attempt.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadAttempt();
  }, [attemptId]);

  if (loading) {
    return <div className="min-h-screen animate-pulse bg-[#f5f4ed]" />;
  }

  if (!attempt) {
    return (
      <main className="min-h-screen bg-[#f5f4ed] px-4 py-12 text-center">
        <h1 className="font-serif text-3xl text-[#1b2925]">Quiz not found</h1>
        <button
          type="button"
          onClick={() => navigate("/quizzes")}
          className="mt-5 rounded-[3px] bg-[#1b2925] px-5 py-3 text-sm font-bold text-white"
        >
          Back to quizzes
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f4ed] lg:flex">
      <StudySidebar />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-8 rounded-[3px] border border-[#d7dcd3] bg-white px-4 py-2 text-sm font-semibold text-[#1b2925]"
          >
            ← Back
          </button>

          <section className="rounded-xl border border-[#c8dce6] bg-white p-6 shadow-[0_16px_40px_rgba(67,80,68,0.07)] sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e5e9df] pb-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
                  Previous quiz
                </p>
                <h1 className="mt-2 font-serif text-4xl text-[#12263a]">
                  {attempt.noteTitle}
                </h1>
                <p className="mt-2 text-sm capitalize text-[#557080]">
                  {attempt.difficulty} difficulty
                </p>
              </div>
              <p className="text-sm font-bold text-[#287277]">
                Score: {attempt.score}/{attempt.totalQuestions}
              </p>
            </div>

            <div className="mt-8 space-y-8">
              {attempt.questions.map((question, questionIndex) => (
                <div key={`${question.question}-${questionIndex}`}>
                  <h2 className="text-sm font-bold leading-6 text-[#12263a]">
                    {questionIndex + 1}. {question.question}
                  </h2>
                  <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                    {question.options.map((option, optionIndex) => (
                      <li
                        key={option}
                        className={`border px-3 py-3 text-sm ${
                          optionIndex === question.answer
                            ? "border-[#81b9a9] bg-[#edf8f4] font-bold text-[#287277]"
                            : "border-[#d7e4e9] text-[#557080]"
                        }`}
                      >
                        {option}
                        {optionIndex === question.answer && " (correct answer)"}
                      </li>
                    ))}
                  </ol>
                  {question.explanation && (
                    <p className="mt-3 text-xs leading-5 text-[#68736c]">
                      {question.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default QuizAttemptQuestions;
