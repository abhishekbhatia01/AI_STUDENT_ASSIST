import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StudySidebar from "../components/StudySidebar";
import QuizAttemptDetails from "../components/QuizAttemptDetails";
import {
  generateQuiz,
  getNoteById,
  getQuizAttempts,
} from "../api/notes/notesApi";
import { setActiveNote, setQuizAttempts } from "../store/quizSlice/quizSlice";

const QuizSetup = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [note, setNote] = useState(null);
  const attempts = useSelector((state) => state.quiz.attempts);
  const [difficulty, setDifficulty] = useState("medium");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const loadQuizSetup = async () => {
      try {
        const [noteResponse, attemptsResponse] = await Promise.all([
          getNoteById(noteId),
          getQuizAttempts(noteId),
        ]);
        setNote(noteResponse.data);
        dispatch(setActiveNote(noteResponse.data));
        dispatch(setQuizAttempts(attemptsResponse.data || []));
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load this quiz.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadQuizSetup();
  }, [dispatch, noteId]);

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      const response = await generateQuiz(note.aiResponse, difficulty, noteId);
      navigate(`/notes/${noteId}/quiz`, {
        state: {
          quiz: response.data,
          noteId: Number(noteId),
          noteTitle: note.title || "AI Generated Notes",
          difficulty,
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to generate a quiz right now.",
      );
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen animate-pulse bg-[#f5f4ed]" />;
  }

  if (!note) {
    return (
      <main className="min-h-screen bg-[#f5f4ed] px-4 py-12 text-center">
        <h1 className="font-serif text-3xl text-[#1b2925]">Note not found</h1>
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
        <div className="mx-auto max-w-4xl">
          <button
            type="button"
            onClick={() => navigate("/quizzes")}
            className="mb-8 rounded-[3px] border border-[#d7dcd3] bg-white px-4 py-2 text-sm font-semibold text-[#1b2925]"
          >
            ← Back to quizzes
          </button>

          <section className="rounded-xl border border-[#c8dce6] bg-white p-6 shadow-[0_16px_40px_rgba(67,80,68,0.07)] sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
              Quiz setup
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[#12263a]">
              {note.title || "AI Generated Notes"}
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#557080]">
              Choose a difficulty. A new quiz will contain exactly 10 questions.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {["easy", "medium", "hard"].map((level) => (
                <label
                  key={level}
                  className={`cursor-pointer border p-4 transition ${
                    difficulty === level
                      ? "border-[#ef6f61] bg-[#fff1ed]"
                      : "border-[#d7e4e9] hover:border-[#ef6f61]"
                  }`}
                >
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={difficulty === level}
                    onChange={() => setDifficulty(level)}
                    className="sr-only"
                  />
                  <span className="block text-sm font-bold capitalize text-[#12263a]">
                    {level}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-[#557080]">
                    {level === "easy"
                      ? "Definitions and direct facts"
                      : level === "medium"
                        ? "Understanding and application"
                        : "Analysis and multi-step reasoning"}
                  </span>
                </label>
              ))}
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={generating}
              className="mt-8 rounded-[3px] bg-[#12263a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d4964] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generating ? "Generating..." : "Generate 10 questions"}
            </button>
          </section>

          <section className="mt-8 rounded-xl border border-[#d7dcd3] bg-white p-6 sm:p-8">
            <h2 className="font-serif text-3xl text-[#1b2925]">
              Previous attempts
            </h2>
            {attempts.length === 0 ? (
              <p className="mt-3 text-sm text-[#68736c]">
                No completed quizzes for this note yet.
              </p>
            ) : (
              <div className="mt-5 divide-y divide-[#e5e9df]">
                {attempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div>
                      <p className="text-sm font-bold capitalize text-[#1b2925]">
                        {attempt.difficulty} quiz
                      </p>
                      <p className="mt-1 text-xs text-[#68736c]">
                        {new Intl.DateTimeFormat("en", {
                          dateStyle: "medium",
                        }).format(new Date(attempt.createdAt))}
                      </p>
                      <QuizAttemptDetails attempt={attempt} />
                    </div>
                    <span className="text-sm font-bold text-[#287277]">
                      {attempt.score}/{attempt.totalQuestions}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default QuizSetup;
