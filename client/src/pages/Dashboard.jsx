import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StudySidebar from "../components/StudySidebar";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  if (user?.role === "admin") {
    return <AdminDashboard />;
  }

  const firstName = user?.fullname?.split(" ")[0] || "there";

  return (
    <main className="min-h-screen bg-[#f5f4ed] lg:flex">
      <StudySidebar />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-6xl">
          <header className="border-b border-[#d7dcd3] pb-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#e9914d]">
              Your study space
            </p>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <h1 className="font-serif text-5xl font-normal tracking-tighter text-[#1b2925] sm:text-6xl">
                  Good to see you,{" "}
                  <em className="text-[#e9914d]">{firstName}.</em>
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-6 text-[#68736c]">
                  Pick up where you left off, or make a little room for
                  something new to click.
                </p>
              </div>
              <Link
                to="/noteGenerate"
                className="inline-flex items-center justify-center gap-4 rounded-[3px] bg-[#1b2925] px-5 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#1b2925]/15 transition hover:-translate-y-0.5 hover:bg-[#2c403a]"
              >
                Create notes <span className="text-[#f2b16d]">↗</span>
              </Link>
            </div>
          </header>

          <section className="grid gap-4 py-8 sm:grid-cols-3">
            {[
              [
                "01",
                "Generate",
                "Turn material into clear notes.",
                "/noteGenerate",
              ],
              [
                "02",
                "Save",
                "Keep the ideas worth revisiting.",
                "/saved-courses",
              ],
              [
                "03",
                "Return",
                "Build a study rhythm that lasts.",
                "/saved-courses",
              ],
            ].map(([number, title, text, path]) => (
              <Link
                key={number}
                to={path}
                className="group border-t border-[#c9cec5] py-5 transition hover:border-[#e9914d]"
              >
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-[.15em] text-[#a0a9a0]">
                  <span>{number}</span>
                  <span className="text-xl font-normal text-[#e9914d]">↗</span>
                </div>
                <h2 className="mt-10 font-serif text-2xl font-normal text-[#1b2925] group-hover:text-[#d4773d]">
                  {title}
                </h2>
                <p className="mt-2 text-xs leading-5 text-[#68736c]">{text}</p>
              </Link>
            ))}
          </section>

          <section className="grid gap-5 border-t border-[#d7dcd3] pt-8 lg:grid-cols-[1.25fr_.75fr]">
            <div className="min-h-64 border border-[#d7dcd3] bg-[#fffef8] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e9914d]">
                Start here
              </p>
              <h2 className="mt-4 max-w-md font-serif text-4xl font-normal leading-none tracking-[-.04em] text-[#1b2925]">
                The next thing you&apos;ll understand is closer than you think.
              </h2>
              <Link
                to="/noteGenerate"
                className="mt-8 inline-block border-b border-[#b6bcb5] pb-1 text-xs font-bold text-[#304039]"
              >
                Open the notes studio{" "}
                <span className="ml-2 text-[#e9914d]">↗</span>
              </Link>
            </div>
            <div className="border border-[#d7dcd3] bg-[#e7ede0] p-6 sm:p-8">
              <span className="text-3xl text-[#e9914d]">✦</span>
              <h2 className="mt-16 font-serif text-3xl font-normal leading-none text-[#1b2925]">
                Small steps.
                <br />
                <em className="text-[#d4773d]">Better recall.</em>
              </h2>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
