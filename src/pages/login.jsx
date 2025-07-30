import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      console.log("Login response:", response.data);
      if (response.status === 200) {
        localStorage.setItem("email", JSON.stringify(response.data.user.email));
        sessionStorage.setItem("role", response.data.user.role);
        localStorage.setItem("userId", JSON.stringify(response.data.user.id));
        localStorage.setItem("role", response.data.user.role);

        if (response.data.user.role === "investigator") {
          navigate("/admin", { replace: true });
        }
        else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Login failed");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[url(/assets/image7.jpg)] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6">
          Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-medium rounded-md shadow-md"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="underline hover:text-blue-800">
            Sign up
          </Link>
        </p>
        <p className="mt-2 text-sm text-center text-gray-600">
          Forgot password?{" "}
          <Link to="/reset-password" className="underline hover:text-blue-800">
            Reset
          </Link>
        </p>
      </div>
    </div>
  );
}
