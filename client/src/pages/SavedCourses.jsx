import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getSavedNotes } from "../api/notes/notesApi";
import StudySidebar from "../components/StudySidebar";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const SavedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await getSavedNotes();
        setCourses(response.data || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load your saved courses.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return courses;

    return courses.filter((course) =>
      [course.title, course.originalFileName, course.prompt]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [courses, search]);

  return (
    <main className="min-h-screen bg-[#f5f4ed] lg:flex">
      <StudySidebar />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 flex flex-col gap-6 border-b border-[#d7dcd3] pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#e9914d]">
                Your library
              </p>
              <h1 className="font-serif text-5xl font-normal tracking-[-.04em] text-[#1b2925]">
                Saved courses
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#68736c]">
                Revisit every set of AI-generated notes in one focused study
                space.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-[3px] border border-[#d7dcd3] bg-[#fffef8] px-4 py-3 shadow-sm">
              <span className="text-2xl font-bold text-[#d4773d]">
                {courses.length}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#68736c]">
                saved {courses.length === 1 ? "course" : "courses"}
              </span>
            </div>
          </header>

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <label htmlFor="course-search" className="sr-only">
                Search saved courses
              </label>
              <input
                id="course-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your saved courses"
                className="w-full rounded-[3px] border border-[#d7dcd3] bg-[#fffef8] px-4 py-3 text-sm text-[#304039] outline-none transition placeholder:text-[#87908a] focus:border-[#e9914d] focus:ring-4 focus:ring-[#e9914d]/10"
              />
            </div>
            <a
              href="/noteGenerate"
              className="inline-flex items-center justify-center rounded-[3px] bg-[#1b2925] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#1b2925]/15 transition hover:bg-[#2c403a]"
            >
              Create new course
            </a>
          </div>

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-64 animate-pulse rounded-3xl bg-white"
                />
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <section className="rounded-[3px] border border-dashed border-[#c9cec5] bg-[#fffef8] px-6 py-20 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8dfc5] text-3xl text-[#d4773d]">
                +
              </div>
              <h2 className="font-serif text-2xl font-normal text-[#1b2925]">
                {search ? "No matching courses" : "Your library is empty"}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#68736c]">
                {search
                  ? "Try another title, file name, or prompt."
                  : "Generate and save your first course notes to start building your library."}
              </p>
            </section>
          ) : (
            <section className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((course) => {
                const isExpanded = expandedId === course.id;

                return (
                  <article
                    key={course.id}
                    className="overflow-hidden rounded-[3px] border border-[#d7dcd3] bg-[#fffef8] shadow-[0_16px_40px_rgba(67,80,68,0.07)]"
                  >
                    <div className="border-b border-[#e5e9df] bg-linear-to-br from-[#fff7ec] via-[#fffef8] to-[#e7ede0] p-6">
                      <div className="mb-8 flex items-start justify-between gap-3">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700 shadow-sm">
                          {course.fileType || "notes"}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {course.createdAt
                            ? formatDate(course.createdAt)
                            : "Recently saved"}
                        </span>
                      </div>
                      <h2 className="line-clamp-2 min-h-14 text-xl font-bold leading-7 text-slate-900">
                        {course.title || "AI Generated Notes"}
                      </h2>
                      {course.originalFileName && (
                        <p className="mt-3 truncate text-xs font-medium text-slate-500">
                          {course.originalFileName}
                        </p>
                      )}
                    </div>

                    <div className="p-6">
                      <p
                        className={`text-sm leading-6 text-slate-600 ${isExpanded ? "" : "line-clamp-3"}`}
                      >
                        {course.prompt ||
                          "A focused set of notes created from your study material."}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId(isExpanded ? null : course.id)
                        }
                        className="mt-5 text-sm font-bold text-indigo-600 transition hover:text-indigo-800"
                      >
                        {isExpanded ? "Hide notes" : "Read notes"}
                      </button>
                      {isExpanded && (
                        <div className="prose prose-sm prose-indigo mt-5 max-h-80 max-w-none overflow-y-auto border-t border-slate-100 pt-5">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {course.aiResponse || "No note content available."}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </div>
    </main>
  );
};

export default SavedCourses;
