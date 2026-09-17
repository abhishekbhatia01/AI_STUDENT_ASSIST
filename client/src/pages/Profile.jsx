import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import StudySidebar from "../components/StudySidebar";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <main className="min-h-screen bg-[#f5f4ed] lg:flex">
      <StudySidebar />
      <div className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/dashboard"
            className="text-xs font-bold text-[#d4773d] hover:text-[#b45b2b]"
          >
            ← Back to dashboard
          </Link>

          <header className="mt-8 border-b border-[#d7dcd3] pb-8">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#e9914d]">
              Account profile
            </p>
            <h1 className="font-serif text-5xl font-normal tracking-tighter text-[#1b2925] sm:text-6xl">
              {user.fullname || "Your profile"}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#68736c]">
              Your StudyZen account details and account status.
            </p>
          </header>

          <section className="mt-8 grid gap-5 sm:grid-cols-2">
            <article className="border border-[#d7dcd3] bg-[#fffef8] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a0a9a0]">
                Full name
              </p>
              <p className="mt-3 wrap-break-word font-serif text-3xl text-[#1b2925]">
                {user.fullname || "Not available"}
              </p>
            </article>

            <article className="border border-[#d7dcd3] bg-[#fffef8] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a0a9a0]">
                Email address
              </p>
              <p className="mt-3 wrap-break-word text-lg text-[#1b2925]">
                {user.email || "Not available"}
              </p>
            </article>

            <article className="border border-[#d7dcd3] bg-[#e7ede0] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#87908a]">
                Role
              </p>
              <p className="mt-3 text-2xl font-bold capitalize text-[#1b2925]">
                {user.role || "User"}
              </p>
            </article>

            <article className="border border-[#d7dcd3] bg-[#fffef8] p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#a0a9a0]">
                Account status
              </p>
              <p className="mt-3 text-2xl font-bold text-[#287277]">
                {user.isBlocked ? "Blocked" : "Active"}
              </p>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
