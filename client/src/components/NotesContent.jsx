import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
  h1: ({ ...props }) => (
    <h1
      className="mt-0 border-b border-[#e5e9df] pb-4 text-3xl font-semibold tracking-tight text-[#12263a] sm:text-4xl"
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      className="mt-10 border-b border-[#e5e9df] pb-2 text-2xl font-semibold tracking-tight text-[#12263a] sm:text-3xl"
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      className="mt-8 text-xl font-semibold text-[#1d4964] sm:text-2xl"
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <p className="wrap-break-word leading-8 text-[#29465a]" {...props} />
  ),
  ul: ({ ...props }) => (
    <ul className="my-5 space-y-2 pl-6 text-[#29465a]" {...props} />
  ),
  ol: ({ ...props }) => (
    <ol className="my-5 space-y-2 pl-6 text-[#29465a]" {...props} />
  ),
  li: ({ ...props }) => (
    <li
      className="wrap-break-word leading-7 marker:text-[#ef6f61]"
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-[#ef6f61] bg-[#fff1ed] px-5 py-3 text-[#557080]"
      {...props}
    />
  ),
  strong: ({ ...props }) => (
    <strong className="font-bold text-[#12263a]" {...props} />
  ),
  em: ({ ...props }) => <em className="text-[#1d4964]" {...props} />,
  a: ({ ...props }) => (
    <a
      className="wrap-break-word font-semibold text-[#287277] underline decoration-[#9db8c6] underline-offset-4 transition hover:text-[#c9554d]"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  code: ({ inline, className, children, ...props }) => {
    if (inline) {
      return (
        <code
          className="rounded bg-[#eef6fb] px-1.5 py-0.5 text-[0.9em] font-semibold text-[#1d4964]"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code
        className={`block min-w-0 text-sm leading-7 text-[#eef6fb] ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ ...props }) => (
    <pre
      className="my-6 max-w-full overflow-x-auto rounded-xl bg-[#12263a] p-5 shadow-inner"
      {...props}
    />
  ),
  table: ({ ...props }) => (
    <div className="my-6 max-w-full overflow-x-auto rounded-lg border border-[#c8dce6]">
      <table className="m-0 min-w-full divide-y divide-[#c8dce6]" {...props} />
    </div>
  ),
  thead: ({ ...props }) => (
    <thead
      className="bg-[#eef6fb] text-left text-sm text-[#12263a]"
      {...props}
    />
  ),
  th: ({ ...props }) => (
    <th className="whitespace-nowrap px-4 py-3 font-bold" {...props} />
  ),
  td: ({ ...props }) => (
    <td
      className="border-t border-[#e5e9df] px-4 py-3 text-sm text-[#29465a]"
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-10 border-0 border-t border-[#c8dce6]" {...props} />
  ),
};

const NotesContent = ({ content }) => {
  const noteContent = content?.trim();

  if (!noteContent) {
    return (
      <p className="rounded-lg border border-dashed border-[#c8dce6] bg-[#eef6fb] px-4 py-5 text-center text-[#557080]">
        No content available for this note.
      </p>
    );
  }

  return (
    <div className="prose prose-slate max-w-none overflow-hidden text-base prose-headings:font-serif prose-headings:leading-tight prose-p:my-5 prose-strong:text-[#12263a] prose-pre:overflow-x-auto prose-li:my-1">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {noteContent}
      </ReactMarkdown>
    </div>
  );
};

export default NotesContent;
