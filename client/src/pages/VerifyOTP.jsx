import { useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOTP, resendOTP } from "../api/auth/authApi.js";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  // Handle OTP input
  const handleChange = (e) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
  };

  // Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please register again.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOTP(email, otp);

      console.log("OTP verified:", response);

      toast.success(
        "OTP verified successfully. Your account is now verified."
      );

      navigate("/login");
    } catch (error) {
      console.error("OTP verification error:", error);

      toast.error(
        error.response?.data?.message ||
          "An error occurred during OTP verification."
      );
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!email) {
      toast.error("Email not found. Please register again.");
      return;
    }

    try {
      setResendLoading(true);

      const response = await resendOTP(email);

      console.log("OTP resent successfully:", response);

      toast.success(
        "OTP resent successfully. Please check your email."
      );
    } catch (error) {
      console.error("Resend OTP error:", error);

      toast.error(
        error.response?.data?.message ||
          "An error occurred while resending OTP."
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Verify Your Email
          </h1>

          <p className="text-slate-500 mt-2">
            We've sent a 6-digit verification code to
          </p>

          <p className="text-sm font-semibold text-slate-700 mt-2 break-all">
            {email || "your email"}
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 sm:p-8"
        >
          {/* OTP Input */}
          <div>
            <label
              htmlFor="otp"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Enter OTP
            </label>

            <input
              type="text"
              id="otp"
              name="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-4 rounded-xl border border-slate-200
                bg-slate-50 text-slate-900
                text-center text-2xl font-semibold tracking-[0.5em]
                outline-none transition
                focus:bg-white
                focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10
                disabled:opacity-60"
            />

            <p className="text-xs text-slate-400 text-center mt-3">
              Enter the 6-digit code sent to your email.
            </p>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || resendLoading || otp.length !== 6}
            className="w-full mt-6 py-3.5 rounded-xl
              bg-blue-600 text-white font-semibold
              hover:bg-blue-700
              disabled:bg-blue-300
              disabled:cursor-not-allowed
              transition duration-200
              shadow-lg shadow-blue-600/20"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          {/* Resend */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-500">
              Didn't receive the code?
            </p>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendLoading || loading}
              className="mt-1 text-sm font-semibold text-blue-600
                hover:text-blue-700
                disabled:text-blue-300
                disabled:cursor-not-allowed"
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Secure email verification for AI Student Assistant
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;