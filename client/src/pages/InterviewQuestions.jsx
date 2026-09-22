import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  generateMoreInterviewQuestions,
  getInterviewPreparation,
} from "../api/notes/notesApi";

const labels = {
  oa: "Online Assessment",
  technical: "Technical Interview",
  hr: "HR Round",
};
const filters = ["All", "Easy", "Medium", "Hard"];

const InterviewQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preparation, setPreparation] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const questions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return (preparation?.questions || []).filter((question) => {
      const matchesDifficulty =
        filter === "All" || question.difficulty === filter;
      const searchable = [
        question.question,
        question.answer,
        question.explanation,
        ...(question.keyPoints || []),
      ]
        .join(" ")
        .toLowerCase();
      return matchesDifficulty && (!query || searchable.includes(query));
    });
  }, [filter, preparation, search]);

  const handleGenerateMore = async () => {
    try {
      setGeneratingMore(true);
      setSuccessMessage("");
      const response = await generateMoreInterviewQuestions(id);
      const newQuestions = response.data?.questions || [];
      setPreparation((current) => ({
        ...current,
        questions: [...current.questions, ...newQuestions],
      }));
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
              {preparation.questions.length} Questions
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search questions..."
              className="min-w-0 flex-1 rounded-[3px] border border-[#d7e4e9] px-3 py-3 text-sm outline-none focus:border-[#ef6f61]"
            />
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  className={`rounded-[3px] border px-3 py-2 text-xs font-bold ${filter === option ? "border-[#ef6f61] bg-[#fff1ed] text-[#c9554d]" : "border-[#d7e4e9] text-[#557080]"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {questions.length === 0 ? (
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
                      Question {String(index + 1).padStart(2, "0")}
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
