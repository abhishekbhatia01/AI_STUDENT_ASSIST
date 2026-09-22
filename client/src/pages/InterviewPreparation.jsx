import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StudySidebar from "../components/StudySidebar";
import {
  createInterviewPreparation,
  getInterviewPreparations,
} from "../api/notes/notesApi";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Java Developer",
  "Python Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Data Analyst",
  "Data Engineer",
  "QA Engineer",
  "Mobile App Developer",
];

const preparationTypes = [
  [
    "oa",
    "Online Assessment",
    "Prepare for aptitude, reasoning, coding and assessment questions.",
  ],
  [
    "technical",
    "Technical Interview",
    "Prepare for technical and role-specific interview questions.",
  ],
  ["hr", "HR Round", "Prepare for HR, behavioral and situational questions."],
];

const labels = {
  oa: "Online Assessment",
  technical: "Technical Interview",
  hr: "HR Round",
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(date));

const InterviewPreparation = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    companyName: "",
    jobDescription: "",
    targetRole: "",
    preparationType: "technical",
    file: null,
  });
  const [preparations, setPreparations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const loadPreparations = async () => {
      try {
        const response = await getInterviewPreparations();
        setPreparations(response.data || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load previous preparations.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadPreparations();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleGenerate = async (event) => {
    event.preventDefault();
    if (!form.jobDescription.trim() && !form.file && !form.targetRole.trim()) {
      toast.error(
        "Please paste or upload a job description, or select a target role.",
      );
      return;
    }

    try {
      setGenerating(true);
      const response = await createInterviewPreparation(form);
      setPreparations((current) => [response.data, ...current]);
      setForm((current) => ({ ...current, file: null }));
      toast.success("Interview preparation generated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to generate preparation.",
      );
    } finally {
      setGenerating(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f4ed] lg:flex">
      <StudySidebar />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="w-full">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-8 rounded-[3px] border border-[#d7dcd3] bg-white px-4 py-2 text-sm font-semibold text-[#1b2925]"
          >
            ← Back to dashboard
          </button>

          <section className="rounded-xl border border-[#c8dce6] bg-white p-6 shadow-[0_16px_40px_rgba(67,80,68,0.07)] sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#ef6f61]">
              Interview preparation
            </p>
            <h1 className="mt-2 font-serif text-4xl text-[#12263a]">
              Prepare with purpose
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#557080]">
              Prepare for your interview based on your job description or
              selected role.
            </p>

            <form onSubmit={handleGenerate} className="mt-8 space-y-5">
              <label className="block text-sm font-bold text-[#12263a]">
                Company name{" "}
                <span className="font-normal text-[#7892a1]">(optional)</span>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={updateField}
                  placeholder="Enter company name"
                  className="mt-2 w-full rounded-[3px] border border-[#d7e4e9] px-3 py-3 text-sm font-normal outline-none focus:border-[#ef6f61]"
                />
              </label>

              <label className="block text-sm font-bold text-[#12263a]">
                Job description{" "}
                <span className="font-normal text-[#7892a1]">
                  (optional if you select a role)
                </span>
                <textarea
                  name="jobDescription"
                  value={form.jobDescription}
                  onChange={updateField}
                  rows="6"
                  placeholder="Paste job description here..."
                  className="mt-2 w-full resize-y rounded-[3px] border border-[#d7e4e9] px-3 py-3 text-sm font-normal leading-6 outline-none focus:border-[#ef6f61]"
                />
              </label>

              <label className="block text-sm font-bold text-[#12263a]">
                Upload JD
                <input
                  type="file"
                  accept=".pdf,.docx,.pptx,.txt,application/pdf,text/plain"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      file: event.target.files[0] || null,
                    }))
                  }
                  className="mt-2 block w-full rounded-[3px] border border-[#d7e4e9] bg-[#f8fbfc] px-3 py-3 text-xs font-normal text-[#557080]"
                />
                <span className="mt-1 block text-[10px] font-normal text-[#7892a1]">
                  PDF, DOCX, PPTX, or TXT up to 20MB
                </span>
              </label>

              <label className="block text-sm font-bold text-[#12263a]">
                Target role
                <select
                  name="targetRole"
                  value={form.targetRole}
                  onChange={updateField}
                  className="mt-2 w-full rounded-[3px] border border-[#d7e4e9] bg-white px-3 py-3 text-sm font-normal outline-none focus:border-[#ef6f61]"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset>
                <legend className="mb-3 text-sm font-bold text-[#12263a]">
                  Preparation type
                </legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {preparationTypes.map(([value, title, description]) => (
                    <label
                      key={value}
                      className={`cursor-pointer border p-4 transition ${form.preparationType === value ? "border-[#ef6f61] bg-[#fff1ed]" : "border-[#d7e4e9] hover:border-[#ef6f61]"}`}
                    >
                      <input
                        type="radio"
                        name="preparationType"
                        value={value}
                        checked={form.preparationType === value}
                        onChange={updateField}
                        className="sr-only"
                      />
                      <span className="block text-sm font-bold text-[#12263a]">
                        {title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-[#557080]">
                        {description}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                disabled={generating}
                className="rounded-[3px] bg-[#12263a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d4964] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {generating
                  ? "Generating preparation..."
                  : "Generate Preparation"}
              </button>
            </form>
          </section>

          <section className="mt-8 rounded-xl border border-[#d7dcd3] bg-white p-6 sm:p-8">
            <h2 className="font-serif text-3xl text-[#1b2925]">
              Previous Preparations
            </h2>
            {loading ? (
              <div className="mt-5 h-24 animate-pulse bg-[#f4f9fc]" />
            ) : preparations.length === 0 ? (
              <p className="mt-3 text-sm text-[#68736c]">
                No previous preparations yet.
              </p>
            ) : (
              <div className="mt-5 divide-y divide-[#e5e9df]">
                {preparations.map((preparation) => (
                  (() => {
                    const companyName = preparation.companyName?.trim();

                    return (
                      <div
                        key={preparation.id}
                        className="flex flex-wrap items-center justify-between gap-4 py-5"
                      >
                        <div>
                          <p className="text-sm font-bold text-[#1b2925]">
                            {labels[preparation.preparationType]}
                          </p>
                          <p className="mt-1 text-sm text-[#557080]">
                            {preparation.targetRole ||
                              "Role based on job description"}
                          </p>
                          <p className="mt-1 text-xs text-[#7892a1]">
                            {companyName || "Company not specified"} ·{" "}
                            {formatDate(preparation.createdAt)} ·{" "}
                            {preparation.questions?.length || 0} Questions
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/interview-preparation/${preparation.id}`)
                          }
                          className="text-sm font-bold text-[#287277] hover:text-[#c9554d]"
                        >
                          View questions →
                        </button>
                      </div>
                    );
                  })()
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default InterviewPreparation;
