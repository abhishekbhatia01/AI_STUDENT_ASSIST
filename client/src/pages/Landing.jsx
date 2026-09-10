import { Link } from "react-router-dom";

const features = [
  [
    "01",
    "Turn hours into highlights",
    "Upload course material and get clear, structured notes in moments.",
    "✦",
  ],
  [
    "02",
    "Study with direction",
    "Ask questions, uncover connections, and move forward without the guesswork.",
    "↗",
  ],
  [
    "03",
    "Keep your best thinking",
    "Save useful courses and notes in one calm, searchable study space.",
    "⌁",
  ],
];

const Landing = () => (
  <main className="min-h-screen overflow-hidden bg-[#f5f4ed] font-sans text-[#18221f]">
    <nav
      className="mx-auto flex h-[72px] w-[calc(100%-36px)] max-w-[1160px] items-center justify-between md:h-[88px] md:w-[calc(100%-64px)]"
      aria-label="Main navigation"
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-[17px] font-bold tracking-[-.04em]"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f4a248] text-white">
          S/
        </span>
        <span>StudyZen</span>
      </Link>
      <div className="hidden gap-8 text-xs text-[#68736c] md:flex">
        <a href="#how-it-works" className="hover:text-[#18221f]">
          How it works
        </a>
        <a href="#features" className="hover:text-[#18221f]">
          Features
        </a>
      </div>
      <div className="flex items-center gap-3 text-xs font-bold md:gap-6">
        <Link to="/login" className="hidden hover:text-[#18221f] md:block">
          Log in
        </Link>
        <Link
          to="/signup"
          className="inline-flex items-center gap-3 rounded-[3px] bg-[#1b2925] px-3.5 py-3 text-white shadow-lg shadow-[#1b2925]/10 transition hover:-translate-y-0.5 hover:bg-[#2c403a]"
        >
          Get started <span>↗</span>
        </Link>
      </div>
    </nav>

    <section className="mx-auto grid min-h-0 w-[calc(100%-36px)] max-w-[1160px] items-center gap-10 pt-16 md:min-h-[610px] md:w-[calc(100%-64px)] md:grid-cols-[.92fr_1.08fr] md:pt-0">
      <div>
        <p className="mb-6 text-[10px] font-bold uppercase tracking-[.13em] text-[#ef9450]">
          <span className="mr-2 inline-block h-[7px] w-[7px] rounded-full bg-[#ef9450]" />
          Your second brain for school
        </p>
        <h1 className="mb-6 max-w-[620px] font-serif text-[clamp(48px,6.3vw,82px)] font-normal leading-[.98] tracking-[-.055em]">
          Study less scattered.
          <br />
          <em className="text-[#e9914d]">Learn more deeply.</em>
        </h1>
        <p className="max-w-[405px] text-sm leading-7 text-[#68736c]">
          StudyZen turns your course material into useful notes, thoughtful
          answers, and a study rhythm that feels like yours.
        </p>
        <div className="mt-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
          <Link
            to="/signup"
            className="inline-flex items-center gap-5 rounded-[3px] bg-[#1b2925] px-5 py-4 text-xs font-bold text-white shadow-lg shadow-[#1b2925]/10 transition hover:-translate-y-0.5 hover:bg-[#2c403a]"
          >
            Start learning free <span>↗</span>
          </Link>
          <a
            href="#how-it-works"
            className="border-b border-[#b6bcb5] pb-1 text-xs font-bold text-[#68736c]"
          >
            See how it works <span className="ml-2 text-[#ef9450]">↓</span>
          </a>
        </div>
        <div className="mt-10 flex items-center gap-3 text-[10px] leading-4 text-[#87908a] md:mt-14">
          <div className="flex">
            <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-[#f5f4ed] bg-[#92aaa1] text-[9px] text-white">
              R
            </span>
            <span className="-ml-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-[#f5f4ed] bg-[#e5b99c] text-[9px] text-white">
              M
            </span>
            <span className="-ml-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-[#f5f4ed] bg-[#d59e79] text-[9px] text-white">
              A
            </span>
            <span className="-ml-1.5 grid h-6 w-6 place-items-center rounded-full border-2 border-[#f5f4ed] bg-[#e2e4d9] text-[9px] text-[#68736c]">
              +
            </span>
          </div>
          <p>
            <strong className="text-[11px] text-[#33413a]">
              Made for curious minds
            </strong>
            <br />A clearer way to keep up.
          </p>
        </div>
      </div>
      <div
        className="relative h-[470px] md:h-[520px]"
        aria-label="AI study workspace preview"
      >
        <div className="absolute right-[2%] top-[9%] h-[330px] w-[330px] rounded-full bg-[#e7ede0] md:right-[4%] md:h-[420px] md:w-[420px]" />
        <div className="absolute right-[8%] top-[13%] h-[348px] w-[278px] rotate-[14deg] border border-[#d7d0bd] bg-[#efe6d1] shadow-[15px_17px_0_#d7b38233] md:right-[19%]" />
        <div className="absolute right-[15%] top-[19%] h-[348px] w-[278px] rotate-[7deg] border border-[#d7d0bd] bg-[#fbfaf2] p-[22px] shadow-[15px_17px_0_#d7b38233] md:right-[25%]">
          <div className="flex justify-between text-[7px] font-bold tracking-[.13em] text-[#d78d50]">
            <span>STUDYZEN</span>
            <span>●●●</span>
          </div>
          <div className="mt-[63px] font-serif text-[34px] leading-[.94] tracking-[-.06em]">
            The art of
            <br />
            <span className="text-[#d78d50] italic">understanding</span>
          </div>
          <div className="my-5 h-px bg-[#d8d0bd]" />
          <div className="grid gap-2">
            <i className="h-1 w-[90%] bg-[#e5e0d4]" />
            <i className="h-1 w-[72%] bg-[#e5e0d4]" />
            <i className="h-1 w-[82%] bg-[#e5e0d4]" />
            <i className="h-1 w-[55%] bg-[#e5e0d4]" />
          </div>
          <div className="mt-7 text-[7px] font-bold tracking-[.11em] text-[#d78d50]">
            KEY IDEA <b className="float-right text-sm">↗</b>
          </div>
          <div className="absolute bottom-7 right-6 h-[5px] w-16 bg-[#f2c47b]" />
        </div>
        <div className="absolute left-0 top-[20%] flex -rotate-2 items-center gap-2 border border-[#e4e5d9] bg-white px-3 py-2.5 text-[10px] text-[#68736c] shadow-lg shadow-[#435044]/10 md:left-[4%]">
          ✦ Break it down
        </div>
        <div className="absolute bottom-[20%] right-0 flex rotate-1 items-center gap-2 border border-[#e4e5d9] bg-white px-3 py-2.5 text-[10px] text-[#68736c] shadow-lg shadow-[#435044]/10 md:right-[2%]">
          ✓ You&apos;re on track
        </div>
        <div className="absolute bottom-[5%] left-[4%] -rotate-2 font-serif text-xl leading-[1.1] text-[#87908a]">
          A little more clarity
          <br />
          <strong className="font-normal text-[#304039]">
            goes a long way.
          </strong>
        </div>
      </div>
    </section>

    <section
      className="flex min-h-16 items-center justify-start gap-6 overflow-hidden whitespace-nowrap bg-[#e9914d] px-5 text-[9px] font-bold tracking-[.15em] text-white md:justify-center md:gap-10"
      aria-label="Study tools"
    >
      <span>MAKE SPACE FOR BETTER THINKING</span>
      <b>✦</b>
      <span>LEARN IN YOUR OWN LANGUAGE</span>
      <b>✦</b>
      <span>MAKE SPACE FOR BETTER THINKING</span>
    </section>
    <section
      className="mx-auto w-[calc(100%-36px)] max-w-[1160px] py-20 md:w-[calc(100%-64px)] md:py-32"
      id="features"
    >
      <p className="mb-6 text-[10px] font-bold uppercase tracking-[.13em] text-[#ef9450]">
        A better study loop
      </p>
      <h2 className="mb-6 font-serif text-[clamp(43px,5vw,66px)] font-normal leading-[.98] tracking-[-.055em]">
        From overwhelmed
        <br />
        <em className="text-[#e9914d]">to in control.</em>
      </h2>
      <div className="mt-10 grid gap-2 md:mt-16 md:grid-cols-3 md:gap-[18px]">
        {features.map(([number, title, description, icon]) => (
          <article
            className="border-t border-[#c9cec5] py-6 md:min-h-[230px] md:p-6"
            key={number}
          >
            <div className="flex justify-between text-[11px] text-[#a0a9a0]">
              <span>{number}</span>
              <b className="text-xl font-normal text-[#e9914d]">{icon}</b>
            </div>
            <h3 className="mt-7 max-w-[230px] font-serif text-[22px] font-normal tracking-[-.04em] md:mt-11">
              {title}
            </h3>
            <p className="mt-3 max-w-[250px] text-xs leading-5 text-[#77827a]">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
    <section
      className="mx-auto w-[calc(100%-36px)] max-w-[1160px] border-t border-[#d7dcd3] py-20 md:w-[calc(100%-64px)] md:py-24"
      id="how-it-works"
    >
      <p className="mb-6 text-[10px] font-bold uppercase tracking-[.13em] text-[#ef9450]">
        The simple version
      </p>
      <h2 className="mb-6 font-serif text-[clamp(43px,5vw,66px)] font-normal leading-[.98] tracking-[-.055em]">
        Bring the mess.
        <br />
        <em className="text-[#e9914d]">Leave with a map.</em>
      </h2>
      <div className="mt-9 grid gap-2 md:mt-14 md:flex">
        {["Add your material", "Ask better questions", "Keep moving"].map(
          (step, index) => (
            <span
              className="flex-1 border-b border-[#aeb9ae] py-3.5 text-xs text-[#68736c] md:py-[18px]"
              key={step}
            >
              <b className="mr-6 text-[10px] text-[#e9914d]">0{index + 1}</b>
              {step}
            </span>
          ),
        )}
      </div>
    </section>
    <footer className="mx-auto flex min-h-[120px] w-[calc(100%-36px)] max-w-[1160px] flex-wrap items-center justify-between gap-4 border-t border-[#d7dcd3] py-6 text-[10px] text-[#87908a] md:min-h-[100px] md:w-[calc(100%-64px)] md:py-0">
      <Link
        to="/"
        className="flex items-center gap-2 text-[17px] font-bold tracking-[-.04em] text-[#18221f]"
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#f4a248] text-white">
          S/
        </span>
        <span>StudyZen</span>
      </Link>
      <span>Built for the next thing you&apos;ll understand.</span>
      <Link to="/signup" className="font-bold text-[#304039]">
        Get started ↗
      </Link>
    </footer>
  </main>
);

export default Landing;
