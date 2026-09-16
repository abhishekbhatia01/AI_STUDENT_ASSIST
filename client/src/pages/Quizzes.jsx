import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StudySidebar from "../components/StudySidebar";
import QuizAttemptDetails from "../components/QuizAttemptDetails";
import { getQuizAttempts } from "../api/notes/notesApi";
import { getSavedNotes } from "../api/notes/notesApi";
import {
  setQuizAttempts,
  setQuizError,
  setQuizLoading,
  setQuizNotes,
} from "../store/quizSlice/quizSlice";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const Quizzes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notes, attempts, loading } = useSelector((state) => state.quiz);

  useEffect(() => {
    const loadQuizWorkspace = async () => {
      try {
        dispatch(setQuizLoading(true));
        dispatch(setQuizError(null));
        const [notesResponse, attemptsResponse] = await Promise.all([
          getSavedNotes(),
          getQuizAttempts(),
        ]);
        dispatch(setQuizNotes(notesResponse.data || []));
        dispatch(setQuizAttempts(attemptsResponse.data || []));
      } catch (error) {
        dispatch(
          setQuizError(
            error.response?.data?.message ||
              "Unable to load your quiz workspace.",
          ),
        );
        toast.error(
          error.response?.data?.message ||
            "Unable to load your quiz workspace.",
        );
      } finally {
        dispatch(setQuizLoading(false));
      }
    };

    loadQuizWorkspace();
  }, [dispatch]);

  return (
    <main className="min-h-screen bg-[#f5f4ed] lg:flex">
      <StudySidebar />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 border-b border-[#d7dcd3] pb-8">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e9914d]">
              Practice workspace
            </p>
            <h1 className="font-serif text-5xl font-normal tracking-[-.04em] text-[#1b2925]">
              Quizzes
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736c]">
              Choose any saved note to create a 10-question practice quiz, or
              review your previous attempts below.
            </p>
          </header>

          <section>
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl text-[#1b2925]">
                  Your notes
                </h2>
                <p className="mt-1 text-sm text-[#68736c]">
                  Select a note to choose your difficulty.
                </p>
              </div>
              <span className="text-sm font-bold text-[#d4773d]">
                {notes.length} {notes.length === 1 ? "note" : "notes"}
              </span>
            </div>

            {loading ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-48 animate-pulse rounded-xl bg-white"
                  />
                ))}
              </div>
            ) : notes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#c9cec5] bg-[#fffef8] px-6 py-16 text-center">
                <h2 className="font-serif text-2xl text-[#1b2925]">
                  No saved notes yet
                </h2>
                <p className="mt-2 text-sm text-[#68736c]">
                  Save a set of notes first, then return here to practice.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/noteGenerate")}
                  className="mt-5 rounded-[3px] bg-[#1b2925] px-5 py-3 text-sm font-bold text-white"
                >
                  Create notes
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {notes.map((note) => (
                  <button
                    key={note.id}
                    type="button"
                    onClick={() => navigate(`/quizzes/${note.id}`)}
                    className="text-left rounded-xl border border-[#d7dcd3] bg-[#fffef8] p-6 shadow-[0_16px_40px_rgba(67,80,68,0.07)] transition hover:-translate-y-0.5 hover:border-[#efc18e]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-[#f8dfc5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a65a25]">
                        {note.fileType || "notes"}
                      </span>
                      <span className="text-xs text-[#68736c]">
                        {note.createdAt ? formatDate(note.createdAt) : "Saved"}
                      </span>
                    </div>
                    <h3 className="mt-8 line-clamp-2 min-h-14 font-serif text-2xl text-[#1b2925]">
                      {note.title || "AI Generated Notes"}
                    </h3>
                    <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#ef6f61]">
                      Choose difficulty →
                    </p>
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="mt-12">
            <div className="mb-5">
              <h2 className="font-serif text-3xl text-[#1b2925]">
                Previous quizzes
              </h2>
              <p className="mt-1 text-sm text-[#68736c]">
                Your completed attempts are saved here.
              </p>
            </div>
            {attempts.length === 0 ? (
              <div className="rounded-xl border border-[#d7dcd3] bg-white px-6 py-10 text-sm text-[#68736c]">
                No completed quizzes yet.
              </div>
            ) : (
              <div className="overflow-hidden rounded-xl border border-[#d7dcd3] bg-white">
                {attempts.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e9df] px-5 py-4 last:border-b-0"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[#1b2925]">
                        {attempt.noteTitle}
                      </h3>
                      <p className="mt-1 text-xs capitalize text-[#68736c]">
                        {attempt.difficulty} · {formatDate(attempt.createdAt)}
                      </p>
                      <QuizAttemptDetails attempt={attempt} />
                    </div>
                    <p className="text-sm font-bold text-[#287277]">
                      {attempt.score}/{attempt.totalQuestions}
                    </p>
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

export default Quizzes;
