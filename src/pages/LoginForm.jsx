import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../api/products";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isLoading) return;
    if (isError) {
      setError("Failed to fetch users.");
      return;
    }

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setUser(user);
      if (user.role === "admin") {
        navigate("/admin-panel");
      } else {
        navigate("/home");
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-progress"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
      <div>
        <p>Use these to enter:</p>
        <p>username:john@mail.com, pwd:changeme (CUSTOMER)</p>
        <p>username:admin@mail.com, pwd:admin123 (ADMIN)</p>
        <br />
        <p>More usernames: https://api.escuelajs.co/api/v1/users</p>
      </div>
    </div>
  );
};

export default LoginForm;
