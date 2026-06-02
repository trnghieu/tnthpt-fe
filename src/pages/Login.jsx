import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

export default function Login() {
  const navigate =
    useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const login = async () => {
    try {
      setLoading(true);
      setError("");

      const res =
        await api.post(
          "/auth/login",
          {
            username,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(
          res.data.admin
        )
      );

      navigate(
        "/admin/dashboard"
      );
    } catch (err) {
      setError(
        err.response?.data
          ?.message ||
          "Đăng nhập thất bại"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          shadow-lg
          p-8
          w-full
          max-w-md
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-center
            mb-6
          "
        >
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          className="
            w-full
            border
            p-3
            rounded-xl
            mb-3
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          className="
            w-full
            border
            p-3
            rounded-xl
            mb-3
          "
        />

        {error && (
          <div
            className="
              text-red-600
              mb-3
            "
          >
            {error}
          </div>
        )}

        <button
          onClick={login}
          disabled={loading}
          className="
            w-full
            bg-blue-600
            text-white
            p-3
            rounded-xl
            font-semibold
          "
        >
          {loading
            ? "Đang đăng nhập..."
            : "Đăng nhập"}
        </button>
      </div>
    </div>
  );
}