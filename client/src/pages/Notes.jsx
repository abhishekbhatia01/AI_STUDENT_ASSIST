import { useState } from "react";
import { toast } from "react-toastify";
import { generateNotes, saveNotes } from "../api/notes/notesApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    <div className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
            Study workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Turn study material into clear notes.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            Add a file, describe what you need, and keep the finished notes
            beside your workspace.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.45fr)]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-lg text-indigo-700">
                ✦
              </div>
              <div>
                <h2 className="font-bold text-slate-900">Create notes</h2>
                <p className="text-xs text-slate-500">
                  Give AI the right context
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="file"
                  className="text-sm font-semibold text-slate-700"
                >
                  Study material
                </label>
                <div className="rounded-2xl border-2 border-dashed border-indigo-200 bg-indigo-50/60 p-4 transition hover:border-indigo-400">
                  <input
                    id="file"
                    type="file"
                    name="file"
                    accept=".pdf,.docx,.pptx,image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-slate-600 file:mr-3 file:rounded-xl file:border-0 file:bg-indigo-600 file:px-4 file:py-2.5 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                  />
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    PDF, DOCX, PPTX, or an image
                  </p>
                </div>
                {formData.file && (
                  <p className="truncate text-xs font-medium text-indigo-700">
                    Selected: {formData.file.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="prompt"
                  className="text-sm font-semibold text-slate-700"
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
                  className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Generating..." : "Generate notes"}
              </button>
            </form>
          </section>

          <section className="min-h-[540px] rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Output
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  Generated notes
                </h2>
                {generatedNotes?.originalFileName && (
                  <p className="mt-1 max-w-[30rem] truncate text-sm text-slate-500">
                    {generatedNotes.originalFileName}
                  </p>
                )}
              </div>
              {generatedNotes && (
                <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                  Ready
                </span>
              )}
            </div>

            {generatedNotes ? (
              <>
                <div className="max-h-[650px] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
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
                  className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save notes"}
                </button>
              </>
            ) : (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                  ◌
                </div>
                <h3 className="font-semibold text-slate-800">
                  Your notes will appear here
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Upload a study file and add a prompt to create a focused set
                  of notes.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Notes;
