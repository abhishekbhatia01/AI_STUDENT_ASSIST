import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getNoteById } from "../api/notes/notesApi";
import NotesContent from "../components/NotesContent";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const NoteDetails = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getNoteById(noteId);
        setNote(response.data || null);
      } catch (err) {
        const message =
          err.response?.data?.message || "Unable to load this note.";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f4ed] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse rounded-xl border border-[#d7dcd3] bg-white p-6">
            <div className="mb-4 h-4 w-28 rounded bg-slate-200" />
            <div className="mb-6 h-10 w-3/4 rounded bg-slate-200" />
            <div className="mb-3 h-4 w-1/2 rounded bg-slate-200" />
            <div className="h-72 rounded bg-slate-100" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !note) {
    return (
      <main className="min-h-screen bg-[#f5f4ed] px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl rounded-xl border border-[#d7dcd3] bg-white p-8 text-center shadow-sm">
          <h1 className="font-serif text-3xl text-[#1b2925]">Note not found</h1>
          <p className="mt-3 text-sm text-[#68736c]">
            {error || "This note could not be loaded."}
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

  return (
    <>
      <main className="min-h-screen bg-[#f5f4ed] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center rounded-[3px] border border-[#d7dcd3] bg-white px-4 py-2 text-sm font-semibold text-[#1b2925] transition hover:border-[#b7c3bc]"
            >
              ← Back
            </button>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate(`/quizzes/${noteId}`)}
                className="inline-flex items-center rounded-[3px] border border-[#ef6f61] bg-white px-4 py-2 text-sm font-bold text-[#c9554d] transition hover:bg-[#fff1ed]"
              >
                Take quiz
              </button>

              {note.fileUrl && (
                <a
                  href={note.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-[3px] bg-[#1b2925] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#1b2925]/15 transition hover:bg-[#2c403a]"
                >
                  Download file
                </a>
              )}
            </div>
          </div>

          <article className="overflow-hidden rounded-xl border border-[#d7dcd3] bg-white shadow-[0_16px_40px_rgba(67,80,68,0.07)]">
            <header className="border-b border-[#e5e9df] bg-[#fffef8] p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#f8dfc5] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a65a25]">
                  {note.fileType || "notes"}
                </span>
                <span className="text-xs font-medium text-[#68736c]">
                  {note.createdAt
                    ? formatDate(note.createdAt)
                    : "Recently saved"}
                </span>
              </div>

              <h1 className="font-serif text-3xl font-normal tracking-[-.04em] text-[#1b2925] sm:text-4xl">
                {note.title || "AI Generated Notes"}
              </h1>

              {(note.originalFileName || note.prompt) && (
                <div className="mt-4 space-y-2 text-sm text-[#68736c]">
                  {note.originalFileName && (
                    <p>
                      <span className="font-semibold text-[#1b2925]">
                        Source:
                      </span>{" "}
                      {note.originalFileName}
                    </p>
                  )}
                  {note.prompt && (
                    <p>
                      <span className="font-semibold text-[#1b2925]">
                        Prompt:
                      </span>{" "}
                      {note.prompt}
                    </p>
                  )}
                </div>
              )}
            </header>

            <div className="p-6 sm:p-8">
              <NotesContent content={note.aiResponse} />
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default NoteDetails;
