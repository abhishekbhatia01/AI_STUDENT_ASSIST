import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  generateMoreInterviewQuestions,
  getInterviewPreparation,
  getInterviewQuestions,
} from "../api/notes/notesApi";

const labels = {
  oa: "Online Assessment",
  technical: "Technical Interview",
  hr: "HR Round",
};
const filters = ["All", "Easy", "Medium", "Hard"];
const PAGE_SIZE = 5;

const getPageNumbers = (totalPages, currentPage) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = [1];
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  if (start > 2) pages.push("ellipsis-start");
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < totalPages - 1) pages.push("ellipsis-end");
  pages.push(totalPages);
  return pages;
};

const InterviewQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preparation, setPreparation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [questionsRefreshKey, setQuestionsRefreshKey] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [generatingMore, setGeneratingMore] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const loadPreparation = async () => {
      try {
        const response = await getInterviewPreparation(id);
        setPreparation(response.data);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to load preparation.",
        );
      } finally {
        setLoading(false);
      }
    };
    loadPreparation();
  }, [id]);

  useEffect(() => {
    const loadQuestions = async () => {
      setQuestionsLoading(true);
      setQuestions([]);
      try {
        const response = await getInterviewQuestions(
          id,
          currentPage,
          PAGE_SIZE,
          search,
          filter,
        );
        setQuestions(response.data.questions || []);
        setPagination(response.data.pagination);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load interview questions.",
        );
        setPagination(null);
      } finally {
        setQuestionsLoading(false);
      }
    };

    loadQuestions();
  }, [currentPage, filter, id, questionsRefreshKey, search]);

  const handleGenerateMore = async () => {
    try {
      setGeneratingMore(true);
      setSuccessMessage("");
      const response = await generateMoreInterviewQuestions(id);
      const newQuestions = response.data?.questions || [];
      setQuestionsRefreshKey((key) => key + 1);
      setSuccessMessage(`${newQuestions.length} new questions added.`);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to generate more questions. Please try again.",
      );
    } finally {
      setGeneratingMore(false);
    }
  };

  if (loading)
    return <div className="min-h-screen animate-pulse bg-[#f5f4ed]" />;

  if (!preparation) {
    return (
      <main className="min-h-screen bg-[#f5f4ed] px-4 py-12 text-center">
        <h1 className="font-serif text-3xl text-[#1b2925]">
          Preparation not found
        </h1>
        <button
          type="button"
          onClick={() => navigate("/interview-preparation")}
          className="mt-5 rounded-[3px] bg-[#1b2925] px-5 py-3 text-sm font-bold text-white"
        >
          Back to preparation
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f4ed] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/interview-preparation")}
          className="mb-8 rounded-[3px] border border-[#d7dcd3] bg-white px-4 py-2 text-sm font-semibold text-[#1b2925]"
        >
          ← Back to Interview Preparation
        </button>

        <section className="rounded-xl border border-[#c8dce6] bg-white p-6 shadow-[0_16px_40px_rgba(67,80,68,0.07)] sm:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e5e9df] pb-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
                Interview questions
              </p>
              <h1 className="mt-2 font-serif text-4xl text-[#12263a]">
                {labels[preparation.preparationType]}
              </h1>
              <p className="mt-2 text-sm text-[#557080]">
                {preparation.targetRole || "Role based on job description"} ·{" "}
                {preparation.companyName || "Company not specified"}
              </p>
            </div>
            <p className="text-sm font-bold text-[#287277]">
              {pagination?.totalQuestions || 0} Questions
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search questions..."
              className="min-w-0 flex-1 rounded-[3px] border border-[#d7e4e9] px-3 py-3 text-sm outline-none focus:border-[#ef6f61]"
            />
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    setFilter(option);
                    setCurrentPage(1);
                  }}
                  className={`rounded-[3px] border px-3 py-2 text-xs font-bold ${filter === option ? "border-[#ef6f61] bg-[#fff1ed] text-[#c9554d]" : "border-[#d7e4e9] text-[#557080]"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {questionsLoading ? (
              <div className="h-64 animate-pulse rounded-[3px] bg-[#f4f9fc]" />
            ) : questions.length === 0 ? (
              <p className="rounded-[3px] border border-dashed border-[#d7dcd3] px-5 py-12 text-center text-sm text-[#68736c]">
                No questions found.
              </p>
            ) : (
              questions.map((question, index) => (
                <article
                  key={question.id || index}
                  className="border border-[#d7e4e9] bg-[#fbfdfe] p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
                      Question{" "}
                      {String(
                        (currentPage - 1) * PAGE_SIZE + index + 1,
                      ).padStart(2, "0")}
                    </p>
                    {question.difficulty && (
                      <span className="rounded-full bg-[#eef6fb] px-3 py-1 text-[10px] font-bold text-[#287277]">
                        {question.difficulty}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 text-lg font-bold leading-7 text-[#12263a]">
                    {question.question}
                  </h2>
                  <div className="mt-6 border-l-2 border-[#ef6f61] pl-4">
                    <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7892a1]">
                      Answer
                    </p>
                    <p className="mt-2 text-sm leading-7 text-[#29465a]">
                      {question.answer}
                    </p>
                    {question.explanation && (
                      <p className="mt-3 text-xs leading-6 text-[#557080]">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                  {question.keyPoints?.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7892a1]">
                        Key points
                      </p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {question.keyPoints.map((point) => (
                          <li
                            key={point}
                            className="rounded-full bg-[#edf8f4] px-3 py-1.5 text-xs font-semibold text-[#287277]"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>

          {pagination && pagination.totalQuestions > 0 && (
            <div className="mt-8 flex flex-col items-center gap-3 border-t border-[#e5e9df] pt-6 sm:flex-row sm:justify-between">
              <p className="text-xs text-[#68736c]">
                Showing {(pagination.currentPage - 1) * pagination.pageSize + 1}
                –
                {Math.min(
                  pagination.currentPage * pagination.pageSize,
                  pagination.totalQuestions,
                )}{" "}
                of {pagination.totalQuestions} questions
              </p>

              {pagination.totalPages > 1 && (
                <nav
                  aria-label="Question pages"
                  className="flex max-w-full items-center gap-1 overflow-x-auto"
                >
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page - 1)}
                    disabled={questionsLoading || !pagination.hasPreviousPage}
                    className="shrink-0 rounded-[3px] border border-[#d7e4e9] px-3 py-2 text-xs font-bold text-[#557080] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  {getPageNumbers(
                    pagination.totalPages,
                    pagination.currentPage,
                  ).map((page) =>
                    typeof page === "string" ? (
                      <span
                        key={page}
                        className="px-2 text-xs text-[#7892a1]"
                        aria-hidden="true"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        disabled={questionsLoading}
                        aria-current={
                          pagination.currentPage === page ? "page" : undefined
                        }
                        className={`h-9 min-w-9 shrink-0 rounded-[3px] border px-3 text-xs font-bold ${pagination.currentPage === page ? "border-[#ef6f61] bg-[#fff1ed] text-[#c9554d]" : "border-[#d7e4e9] text-[#557080]"}`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    onClick={() => setCurrentPage((page) => page + 1)}
                    disabled={questionsLoading || !pagination.hasNextPage}
                    className="shrink-0 rounded-[3px] border border-[#d7e4e9] px-3 py-2 text-xs font-bold text-[#557080] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>
                </nav>
              )}
            </div>
          )}

          <div className="mt-10 border-t border-[#e5e9df] pt-8 text-center">
            <button
              type="button"
              onClick={handleGenerateMore}
              disabled={generatingMore}
              className="rounded-[3px] bg-[#12263a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d4964] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {generatingMore
                ? "Generating Questions..."
                : "Generate More Questions"}
            </button>
            {successMessage && (
              <p className="mt-3 text-sm font-semibold text-[#287277]">
                {successMessage}
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default InterviewQuestions;
