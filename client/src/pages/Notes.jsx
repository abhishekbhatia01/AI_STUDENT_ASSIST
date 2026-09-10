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
      file: e.target.files[0],
    }));
  };

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

      await saveNotes(generatedNotes);

      toast.success("Notes saved successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save notes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f4ed] lg:flex">
      <StudySidebar />
      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e9914d]">
              Study workspace
            </p>
            <h1 className="font-serif text-4xl font-normal tracking-[-.04em] text-[#1b2925] sm:text-5xl">
              Turn study material into clear notes.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#68736c]">
              Add a file, describe what you need, and keep the finished notes
              beside your workspace.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.45fr)]">
            <section className="rounded-[3px] border border-[#d7dcd3] bg-[#fffef8] p-6 shadow-[0_18px_50px_rgba(67,80,68,0.08)] sm:p-8">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8dfc5] text-lg text-[#d4773d]">
                  ✦
                </div>
                <div>
                  <h2 className="font-serif text-xl font-normal text-[#1b2925]">
                    Create notes
                  </h2>
                  <p className="text-xs text-[#68736c]">
                    Give AI the right context
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="file"
                    className="text-sm font-semibold text-[#304039]"
                  >
                    Study material
                  </label>
                  <div className="rounded-[3px] border-2 border-dashed border-[#efc18e] bg-[#fff7ec] p-4 transition hover:border-[#e9914d]">
                    <input
                      id="file"
                      type="file"
                      name="file"
                      accept=".pdf,.docx,.pptx,image/*"
                      onChange={handleFileChange}
                      className="w-full text-sm text-[#68736c] file:mr-3 file:rounded-[3px] file:border-0 file:bg-[#1b2925] file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-[#2c403a]"
                    />
                    <p className="mt-3 text-xs leading-5 text-[#87908a]">
                      PDF, DOCX, PPTX, or an image
                    </p>
                  </div>
                  {formData.file && (
                    <p className="truncate text-xs font-medium text-[#d4773d]">
                      Selected: {formData.file.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="prompt"
                    className="text-sm font-semibold text-[#304039]"
                  >
                    Your prompt
                  </label>
                  <textarea
                    id="prompt"
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                    placeholder="Summarize the key concepts and create revision questions..."
                    rows="9"
                    className="w-full resize-y rounded-[3px] border border-[#d7dcd3] bg-[#f5f4ed] px-4 py-3 text-sm leading-6 text-[#304039] outline-none transition placeholder:text-[#87908a] focus:border-[#e9914d] focus:bg-white focus:ring-4 focus:ring-[#e9914d]/10"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-[3px] bg-[#1b2925] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1b2925]/15 transition hover:bg-[#2c403a] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Generating..." : "Generate notes"}
                </button>
              </form>
            </section>

            <section className="min-h-135 rounded-[3px] border border-[#d7dcd3] bg-[#fffef8] p-6 shadow-[0_18px_50px_rgba(67,80,68,0.08)] sm:p-8">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-[#e9914d]">
                    Output
                  </p>
                  <h2 className="font-serif text-3xl font-normal text-[#1b2925]">
                    Generated notes
                  </h2>
                  {generatedNotes?.originalFileName && (
                    <p className="mt-1 max-w-120 truncate text-sm text-[#68736c]">
                      {generatedNotes.originalFileName}
                    </p>
                  )}
                </div>
                {generatedNotes && (
                  <span className="shrink-0 rounded-full bg-[#e3eee4] px-3 py-1 text-xs font-bold text-[#557b5f]">
                    Ready
                  </span>
                )}
              </div>

              {generatedNotes ? (
                <>
                  <div className="max-h-162.5 overflow-y-auto rounded-[3px] border border-[#d7dcd3] bg-[#f5f4ed] p-5 sm:p-8">
                    <article className="prose prose-indigo max-w-none">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {generatedNotes.aiResponse}
                      </ReactMarkdown>
                    </article>
                  </div>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="mt-6 w-full rounded-[3px] bg-[#d4773d] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#b45b2b] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Saving..." : "Save notes"}
                  </button>
                </>
              ) : (
                <div className="flex min-h-100 flex-col items-center justify-center rounded-[3px] border border-dashed border-[#c9cec5] bg-[#f5f4ed] px-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#f8dfc5] text-2xl text-[#d4773d] shadow-sm">
                    ◌
                  </div>
                  <h3 className="font-serif text-xl font-normal text-[#1b2925]">
                    Your notes will appear here
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#68736c]">
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
