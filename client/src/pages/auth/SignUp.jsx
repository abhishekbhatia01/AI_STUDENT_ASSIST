import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../../api/auth/authApi.js";
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
    <div className="flex min-h-screen items-center justify-center bg-[#f5f4ed] px-4 py-10">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-normal tracking-[-.04em] text-[#1b2925]">
            Create your account
          </h1>

          <p className="mt-2 text-[#68736c]">
            Start learning smarter with StudyZen
          </p>
        </div>

        {/* Signup Card */}
        <div className="rounded-[3px] border border-[#d7dcd3] bg-[#fffef8] p-7 shadow-xl shadow-[#435044]/10 sm:p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="mb-2 block text-sm font-medium text-[#304039]"
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
                bg-[#f5f4ed] text-[#1b2925] placeholder:text-[#87908a]
                outline-none transition
                focus:bg-white focus:border-[#e9914d]
                focus:ring-4 focus:ring-[#e9914d]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#304039]"
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
                bg-[#f5f4ed] text-[#1b2925] placeholder:text-[#87908a]
                outline-none transition
                focus:bg-white focus:border-[#e9914d]
                focus:ring-4 focus:ring-[#e9914d]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#304039]"
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
                bg-[#f5f4ed] text-[#1b2925] placeholder:text-[#87908a]
                outline-none transition
                focus:bg-white focus:border-[#e9914d]
                focus:ring-4 focus:ring-[#e9914d]/10"
              />

              <p className="mt-2 text-xs text-[#87908a]">
                Use a strong password to keep your account secure.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-[#304039]"
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
                bg-[#f5f4ed] text-[#1b2925] placeholder:text-[#87908a]
                outline-none transition
                focus:bg-white focus:border-[#e9914d]
                focus:ring-4 focus:ring-[#e9914d]/10"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-[3px] bg-[#1b2925] hover:bg-[#2c403a]
              disabled:bg-[#aeb9ae] disabled:cursor-not-allowed
              text-white font-semibold py-3.5 rounded-xl
              transition duration-200
              shadow-lg shadow-[#1b2925]/20
              hover:shadow-[#1b2925]/30
              active:scale-[0.98]"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#68736c]">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-[#d4773d] hover:text-[#b45b2b]"
              >
                Log in
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#87908a]">
          Your learning journey starts here.
        </p>
      </div>
    </div>
  );
}

export default SignUp;
