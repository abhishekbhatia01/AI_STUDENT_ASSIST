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
    <div className="min-h-screen bg-gray-50 px-5 py-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* Generator Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              AI Notes Generator
            </h1>

            <p className="text-sm leading-relaxed text-gray-500">
              Upload your study material and tell AI how you want it analyzed.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* File Upload */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="file"
                className="text-sm font-semibold text-gray-700"
              >
                Upload Study Material
              </label>

              <input
                id="file"
                type="file"
                name="file"
                accept=".pdf,.docx,.pptx,image/*"
                onChange={handleFileChange}
                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
              />

              {formData.file && (
                <p className="text-xs text-gray-500">
                  Selected: {formData.file.name}
                </p>
              )}
            </div>

            {/* Prompt */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="prompt"
                className="text-sm font-semibold text-gray-700"
              >
                Your Prompt
              </label>

              <textarea
                id="prompt"
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                placeholder="What do you want AI to do with this file?"
                rows="7"
                className="w-full resize-y rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Generating..." : "Generate Notes"}
            </button>
          </form>
        </div>

        {generatedNotes && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Generated Notes
                </h2>

                {generatedNotes.originalFileName && (
                  <p className="mt-1 text-sm text-gray-500">
                    {generatedNotes.originalFileName}
                  </p>
                )}
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Generated
              </span>
            </div>

            <div className="max-h-[650px] overflow-y-auto rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
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
              className="mt-6 w-full rounded-xl bg-green-600 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Notes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
