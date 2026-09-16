import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { submitUnblockRequest } from "../../api/unblockRequestApi";

const BlockedAccount = () => {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await submitUnblockRequest(email, message);
      setSubmitted(true);
      toast.success("Your request was sent to the administrator.");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to send your request.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f4ed] px-4 py-10">
      <section className="w-full max-w-lg border border-[#d7dcd3] bg-[#fffef8] p-7 shadow-xl shadow-[#435044]/10 sm:p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#fff0ed] text-[#c65045]">
            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.008M10.29 3.86l-7.04 12A2 2 0 005 19h14a2 2 0 001.73-3.14l-7.04-12a2 2 0 00-3.4 0z"
              />
            </svg>
          </div>
          <h1 className="mt-5 font-serif text-4xl font-normal tracking-[-.04em] text-[#1b2925]">
            Your account is blocked
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#68736c]">
            An administrator has temporarily blocked access to your account. You
            can send a request below for the decision to be reviewed.
          </p>
        </div>

        {submitted ? (
          <div className="border border-[#b8d9cf] bg-[#edf8f4] p-5 text-center">
            <h2 className="font-semibold text-[#287277]">Request received</h2>
            <p className="mt-2 text-sm leading-6 text-[#557b77]">
              The administrator will review your request. You can try signing in
              again after your account is unblocked.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="blocked-email"
                className="mb-2 block text-sm font-semibold text-[#304039]"
              >
                Email address
              </label>
              <input
                id="blocked-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-[3px] border border-[#d7dcd3] bg-[#f5f4ed] px-4 py-3.5 text-sm text-[#1b2925] outline-none transition focus:border-[#e9914d] focus:bg-white focus:ring-4 focus:ring-[#e9914d]/10"
              />
            </div>
            <div>
              <label
                htmlFor="unblock-message"
                className="mb-2 block text-sm font-semibold text-[#304039]"
              >
                Why should access be restored?
              </label>
              <textarea
                id="unblock-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Explain why you believe your account should be unblocked."
                required
                rows="5"
                className="w-full resize-y rounded-[3px] border border-[#d7dcd3] bg-[#f5f4ed] px-4 py-3.5 text-sm text-[#1b2925] outline-none transition focus:border-[#e9914d] focus:bg-white focus:ring-4 focus:ring-[#e9914d]/10"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[3px] bg-[#1b2925] py-3.5 text-sm font-semibold text-white transition hover:bg-[#2c403a] disabled:cursor-not-allowed disabled:bg-[#aeb9ae]"
            >
              {loading ? "Sending request..." : "Request unblock"}
            </button>
          </form>
        )}

        <p className="mt-7 text-center text-sm text-[#68736c]">
          <Link
            to="/login"
            className="font-semibold text-[#d4773d] hover:text-[#b45b2b]"
          >
            Return to sign in
          </Link>
        </p>
      </section>
    </main>
  );
};

export default BlockedAccount;
