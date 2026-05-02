import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";
import toast from "react-hot-toast";
const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <div className="w-full p-8 rounded-[4px] shadow-2xl bg-[#313338] text-gray-200">
        <h1 className="text-2xl font-bold text-center text-white mb-6 tracking-wide">
          Create an account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-0 pb-2">
              <span className="text-xs font-bold uppercase text-gray-300">Full Name</span>
            </label>
            <input
              type="text"
              className="w-full input border-none bg-[#1E1F22] text-gray-200 h-10 rounded-[3px] focus:outline-none focus:ring-0"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="label p-0 pb-2">
              <span className="text-xs font-bold uppercase text-gray-300">Username</span>
            </label>
            <input
              type="text"
              className="w-full input border-none bg-[#1E1F22] text-gray-200 h-10 rounded-[3px] focus:outline-none focus:ring-0"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="label p-0 pb-2">
              <span className="text-xs font-bold uppercase text-gray-300">Password</span>
            </label>
            <input
              type="password"
              className="w-full input border-none bg-[#1E1F22] text-gray-200 h-10 rounded-[3px] focus:outline-none focus:ring-0"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="label p-0 pb-2">
              <span className="text-xs font-bold uppercase text-gray-300">Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full input border-none bg-[#1E1F22] text-gray-200 h-10 rounded-[3px] focus:outline-none focus:ring-0"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              required
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link
            className="text-xs text-[#00A8FC] hover:underline mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>

          <div className="pt-2">
            <button
              className="btn btn-block bg-[#5865F2] hover:bg-[#4752C4] text-white border-none rounded-[3px] min-h-[44px] h-[44px]"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
