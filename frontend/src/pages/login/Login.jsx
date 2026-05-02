import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-4">
      <div className="w-full p-8 rounded-[4px] shadow-2xl bg-[#313338] text-gray-200">
        <h1 className="text-2xl font-bold text-center text-white mb-2 tracking-wide">
          Welcome back!
        </h1>
        <p className="text-center text-gray-400 text-sm mb-6">
          We're so excited to see you again!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label p-0 pb-2">
              <span className="text-xs font-bold uppercase text-gray-300">Username</span>
            </label>
            <input
              type="text"
              className="w-full input border-none bg-[#1E1F22] text-gray-200 h-10 rounded-[3px] focus:outline-none focus:ring-0"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link
              to="/signup"
              className="text-xs text-[#00A8FC] hover:underline mt-2 inline-block"
            >
              Need an account? Register
            </Link>
          </div>

          <div className="pt-2">
            <button 
              className="btn btn-block bg-[#5865F2] hover:bg-[#4752C4] text-white border-none rounded-[3px] min-h-[44px] h-[44px]" 
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
