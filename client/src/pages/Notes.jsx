import { useState } from "react";
import { toast } from "react-toastify";
import { generateNotes, saveNotes } from "../api/notes/notesApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import StudySidebar from "../components/StudySidebar";

const Notes = () => {
  const [formData, setFormData] = useState({
    file: null,
    prompt: "",
  });

  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0] || null,
    }));
  };

  const clearFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const promptSuggestions = [
    "Summarize",
    "Key points",
    "Revision questions",
    "Explain simply",
    "Add examples",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await generateNotes(formData.file, formData.prompt);

      console.log("Generated Notes:", response);

      setGeneratedNotes(response.data);

      toast.success("Notes generated successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while generating notes.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedNotes) {
      toast.error("Generate notes first.");
      return;
    }

    try {
      setSaving(true);

      const formDataToSend = new FormData();

      // Original file: upload only when Save is clicked
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      // Generated notes
      formDataToSend.append("notesData", JSON.stringify(generatedNotes));

      await saveNotes(formDataToSend);

      toast.success("Notes saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save notes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eef6fb] lg:flex">
      <StudySidebar />

      <div className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-12 lg:py-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="relative mb-7 flex flex-col justify-between gap-5 overflow-hidden border-b border-[#c8dce6] pb-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#ef6f61]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ef6f61]" />
                Study workspace
              </div>

              <h1 className="max-w-3xl font-serif text-3xl font-normal tracking-[-.035em] text-[#12263a] sm:text-4xl lg:text-5xl">
                Turn study material into clear notes.
              </h1>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-[#557080] sm:text-sm">
                Upload your study material, tell us what you need, and keep the
                finished notes right beside your workspace.
              </p>
            </div>

            <div className="hidden shrink-0 items-center gap-3 rounded-[50%] bg-[#f9ede2] px-8 py-5 text-right text-xs italic text-[#557080] shadow-[0_10px_30px_rgba(97,122,139,0.08)] sm:flex">
              <span className="text-3xl not-italic text-[#ef6f61]">▱</span>
              <span>
                &quot;Better notes.
                <br />
                Brighter learning.&quot;
              </span>
            </div>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[minmax(300px,0.72fr)_minmax(0,1.45fr)]">
            {/* Create notes */}
            <section className="rounded-[5px] border border-[#c8dce6] bg-white p-5 shadow-[0_18px_50px_rgba(69,111,139,0.1)] sm:p-6">
              <div className="mb-6 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0e8] text-lg text-[#ef6f61]">
                    ✦
                  </div>
                  <div>
                    <h2 className="font-serif text-xl font-normal text-[#12263a]">
                      Create notes
                    </h2>
                    <p className="text-[11px] text-[#557080]">
                      Give AI the right context to generate focused notes
                    </p>
                  </div>
                </div>
                <span className="hidden text-[10px] font-bold uppercase tracking-[0.12em] text-[#7892a1] sm:block">
                  AI assist
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="file"
                      className="text-xs font-bold text-[#29465a]"
                    >
                      Study material
                    </label>
                    <span className="text-[10px] font-semibold text-[#7892a1]">
                      Supported formats ⓘ
                    </span>
                  </div>

                  <label
                    htmlFor="file"
                    className="cursor-pointer rounded-[4px] border-2 border-dashed border-[#f3a49a] bg-[#fff8f5] px-4 py-5 text-center transition hover:border-[#ef6f61] hover:bg-[#fff1ed]"
                  >
                    <span className="mx-auto flex h-10 w-10 items-center justify-center text-3xl text-[#ef6f61]">
                      ⇧
                    </span>
                    <p className="mt-2 text-xs font-bold text-[#29465a]">
                      Drop your file here or click to upload
                    </p>
                    <p className="mt-1 text-[10px] text-[#7892a1]">
                      PDF, DOCX, PPTX, or an image (Max 20MB)
                    </p>
                    <input
                      id="file"
                      type="file"
                      name="file"
                      accept=".pdf,.docx,.pptx,image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>

                  {formData.file && (
                    <div className="flex items-center gap-3 rounded-[4px] border border-[#d3e4eb] bg-[#f4f9fc] px-3 py-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-[#fff0e8] text-xs font-bold text-[#ef6f61]">
                        PDF
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] font-bold text-[#29465a]">
                          {formData.file.name}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#7892a1]">
                          {formData.file.type || "Document"} ·{" "}
                          {formatFileSize(formData.file.size)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={clearFile}
                        className="text-lg leading-none text-[#7892a1] transition hover:text-[#ef6f61]"
                        aria-label="Remove selected file"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="prompt"
                      className="text-xs font-bold text-[#29465a]"
                    >
                      Your prompt
                    </label>
                    <span className="text-[10px] font-semibold text-[#7892a1]">
                      💡 Try examples
                    </span>
                  </div>

                  <textarea
                    id="prompt"
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                    placeholder="Summarize the key concepts and create revision questions..."
                    rows="6"
                    maxLength="1000"
                    className="w-full resize-y rounded-[4px] border border-[#c8dce6] bg-white px-3 py-3 text-xs leading-5 text-[#29465a] outline-none transition placeholder:text-[#9db8c6] focus:border-[#ef6f61] focus:ring-4 focus:ring-[#ef6f61]/10"
                  />
                  <div className="flex flex-wrap gap-2">
                    {promptSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            prompt: suggestion,
                          }))
                        }
                        className="rounded-full border border-[#d3e4eb] bg-[#f4f9fc] px-3 py-1.5 text-[10px] font-semibold text-[#557080] transition hover:border-[#ef6f61] hover:bg-[#fff1ed] hover:text-[#c9554d]"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-[4px] bg-[#12263a] px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#12263a]/15 transition hover:bg-[#1d4964] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Generating..." : "✦  Generate notes  →"}
                </button>
                <p className="text-center text-[10px] text-[#7892a1]">
                  ♙ &nbsp; Your files and data are secure and private.
                </p>
              </form>
            </section>

            {/* Generated notes */}
            <section className="min-h-135 rounded-[5px] border border-[#c8dce6] bg-white p-5 shadow-[0_18px_50px_rgba(69,111,139,0.1)] sm:p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ef6f61]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ef6f61]" />
                    Output
                  </div>

                  <h2 className="font-serif text-2xl font-normal text-[#12263a] sm:text-3xl">
                    Generated notes
                  </h2>

                  {generatedNotes?.originalFileName && (
                    <p className="mt-1 max-w-120 truncate text-xs text-[#557080]">
                      {generatedNotes.originalFileName}
                    </p>
                  )}
                </div>

                {generatedNotes && (
                  <span className="shrink-0 rounded-full bg-[#d8f0ec] px-3 py-1 text-[10px] font-bold text-[#287277]">
                    ✓ Ready
                  </span>
                )}
              </div>

              {generatedNotes ? (
                <>
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-[4px] border border-[#d3e4eb] bg-[#f4f9fc] px-3 py-2">
                    <span className="text-[10px] font-semibold text-[#557080]">
                      Document preview
                    </span>
                    <div className="flex gap-4 text-[10px] font-semibold text-[#557080]">
                      <button
                        type="button"
                        className="transition hover:text-[#ef6f61]"
                      >
                        ▣ Copy
                      </button>
                      <button
                        type="button"
                        className="transition hover:text-[#ef6f61]"
                      >
                        ⇩ Download
                      </button>
                      <button
                        type="button"
                        className="transition hover:text-[#ef6f61]"
                      >
                        ↗ Fullscreen
                      </button>
                    </div>
                  </div>
                  <div className="max-h-162.5 overflow-y-auto rounded-[4px] border border-[#d3e4eb] bg-[#f4f9fc] p-5 sm:p-7">
                    <article className="prose prose-slate max-w-none text-[#29465a]">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {generatedNotes.aiResponse}
                      </ReactMarkdown>
                    </article>
                  </div>

                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="mt-5 w-full rounded-[4px] bg-[#ef6f61] px-5 py-3.5 text-xs font-bold text-white transition hover:bg-[#c9554d] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "▱  Save notes"}
                  </button>
                </>
              ) : (
                <div className="flex min-h-100 flex-col items-center justify-center rounded-[4px] border border-[#d3e4eb] bg-[#f4f9fc] px-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff0e8] text-2xl text-[#ef6f61] shadow-sm">
                    ▤
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#12263a]">
                    Your notes will appear here
                  </h3>

                  <p className="mt-2 max-w-sm text-xs leading-6 text-[#557080]">
                    Upload a study file and add a prompt to create a focused set
                    of notes.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
