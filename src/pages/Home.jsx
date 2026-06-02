import { useState } from "react";

import api from "../api/axios";

import SearchForm from "../components/SearchForm";
import ResultCard from "../components/ResultCard";
import Loading from "../components/Loading";

export default function Home() {
  const [examNumber, setExamNumber] =
    useState("");

  const [candidate, setCandidate] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleSearch = async () => {
    if (!examNumber.trim()) {
      setError("Vui lòng nhập số báo danh");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCandidate(null);

      const res = await api.get(
        `/candidates/lookup/${examNumber}`
      );

      setCandidate(
        res.data.candidate
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Không tìm thấy thí sinh"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-b
        from-blue-50
        via-slate-50
        to-white
      "
    >
      {/* Banner */}

      <div className="max-w-6xl mx-auto px-4 pt-6">
        <img
          src="/banner.jpg"
          alt="Banner"
          className="
            w-full
            h-auto
            rounded-3xl
            shadow-2xl
            border
            border-white
          "
        />
      </div>

      {/* Nội dung */}

      <div
        className="
          max-w-4xl
          mx-auto
          px-4
          py-8
        "
      >
        <div
          className="
            bg-white
            rounded-3xl
            shadow-xl
            p-6
            md:p-10
          "
        >
          <div className="text-center">
            <h1
              className="
                text-3xl
                md:text-5xl
                font-extrabold
                text-blue-700
              "
            >
              TRA CỨU ĐIỂM THI
            </h1>

            <p
              className="
                text-gray-500
                mt-3
                text-sm
                md:text-base
              "
            >
              Nhập số báo danh để xem kết quả thi
            </p>
          </div>

          <div className="mt-8">
            <SearchForm
              value={examNumber}
              onChange={setExamNumber}
              onSearch={handleSearch}
              loading={loading}
            />
          </div>

          {error && (
            <div
              className="
                mt-4
                p-4
                bg-red-50
                border
                border-red-200
                rounded-xl
                text-red-600
                text-center
              "
            >
              {error}
            </div>
          )}

          {loading && <Loading />}

          {candidate && (
            <ResultCard
              candidate={candidate}
            />
          )}
        </div>

        {/* Footer */}

        <div
          className="
            text-center
            text-gray-500
            text-sm
            mt-8
            pb-8
          "
        >
          © {new Date().getFullYear()}
          {" "}
          Hệ thống tra cứu điểm thi
        </div>
      </div>
    </div>
  );
}