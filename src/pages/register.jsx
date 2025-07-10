import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users", {
        name,
        email,
        password,
      });

      console.log("Registration response:", response.data);
      if (response.status === 201) {
        setIsLoading(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }, 5000);
        navigate("/login");
      }
    } catch (error) {
        setIsLoading(false);
        setError(
          error.response && error.response.data
            ? error.response.data.error || "Registration failed"
            : "An error occurred. Please try again."
        );
    }
  };

  return (
    <div className="min-h-screen bg-[url(/assets/image7.jpg)] bg-no-repeat bg-cover bg-center flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-semibold text-blue-700 text-center mb-6">
          Register
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium text-blue-800 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>

          {success && (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center">
              Registration successful! You can now log in.
            </div>
          )}
          {isLoading ? (
            <button
              type="button"
              className="w-full py-2 bg-blue-600 text-white font-medium rounded-md shadow-md cursor-not-allowed opacity-50"
              disabled
            >
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition
                duration-200 text-white font-medium rounded-md shadow-md"
            >
              Register
            </button>
          )}
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to='/login' className="underline hover:text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
