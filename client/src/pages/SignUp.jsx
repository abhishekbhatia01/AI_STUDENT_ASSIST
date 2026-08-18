import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../api/auth/authApi.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (userData.password !== userData.confirmPassword) {
    //   toast.error("Passwords do not match");
    //   return;
    // }

    try {
      setLoading(true);

      const response = await registerUser(userData);

      console.log("User registered successfully:", response);

      toast.success(
        "Registration successful. Please check your email for the OTP.",
      );

      navigate("/verify-otp", {
        state: {
          email: userData.email,
        },
      });
    } catch (error) {
      console.error(error);

      const validationError = error.response?.data?.errors?.[0];

      toast.error(
        validationError?.message ||
          error.response?.data?.message ||
          "An error occurred during registration.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Create your account
          </h1>

          <p className="text-slate-500 mt-2">
            Start learning smarter with AI Student Assistant
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-7 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Full Name
              </label>

              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Enter your full name"
                value={userData.fullname}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200
                bg-slate-50 text-slate-900 placeholder:text-slate-400
                outline-none transition
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={userData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200
                bg-slate-50 text-slate-900 placeholder:text-slate-400
                outline-none transition
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200
                bg-slate-50 text-slate-900 placeholder:text-slate-400
                outline-none transition
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10"
              />

              <p className="text-xs text-slate-400 mt-2">
                Use a strong password to keep your account secure.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm Password
              </label>

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={userData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200
                bg-slate-50 text-slate-900 placeholder:text-slate-400
                outline-none transition
                focus:bg-white focus:border-blue-500
                focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700
              disabled:bg-blue-300 disabled:cursor-not-allowed
              text-white font-semibold py-3.5 rounded-xl
              transition duration-200
              shadow-lg shadow-blue-600/20
              hover:shadow-blue-600/30
              active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Log in
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Your learning journey starts here.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
