import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./api";
import { FaUserCircle } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <div className="flex justify-center mb-4">
          <FaUserCircle className="text-7xl text-blue-600" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2">
          SkillSwap AI
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Login
          </button>

        </form>
        <p className="text-center mt-5">
  Don't have an account?

  <button
    onClick={() => navigate("/register")}
    className="text-blue-600 ml-2 hover:underline"
  >
    Register
  </button>
</p>

      </div>

    </div>
  );
}

export default Login;