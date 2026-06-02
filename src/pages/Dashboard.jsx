import { useEffect, useState } from "react";

import api from "../api/axios";

import UploadExcel from "../components/UploadExcel";
import CandidateTable from "../components/CandidateTable";

export default function Dashboard() {
  const [summary, setSummary] =
    useState(null);

  const [candidates, setCandidates] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [pagination, setPagination] =
    useState(null);

  const token =
    localStorage.getItem("token");

  const config = {
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };

  const loadSummary =
    async () => {
      const res =
        await api.get(
          "/admin/summary",
          config
        );

      setSummary(res.data);
    };
const exportExcel = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/admin/export",
        {
          responseType: "blob",
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "danh-sach-diem.xlsx";

    document.body.appendChild(
      link
    );

    link.click();

    link.remove();
  } catch (error) {
    alert(
      "Xuất file thất bại"
    );
  }
};
  const loadCandidates =
    async () => {
      const res =
        await api.get(
          `/candidates?page=${page}&search=${search}`,
          config
        );

      setCandidates(
        res.data.items
      );

      setPagination(
        res.data.pagination
      );
    };

  useEffect(() => {
    loadSummary();
  }, []);

  useEffect(() => {
    loadCandidates();
  }, [page]);

  return (
    <div
      className="
        max-w-7xl
        mx-auto
        p-4
      "
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          mb-6
          gap-3
        "
      >
        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Dashboard
        </h1>

        <button
          onClick={() => {
            localStorage.clear();

            window.location.href =
              "/admin";
          }}
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Đăng xuất
        </button>
      </div>

      <div
        className="
          bg-white
          p-5
          rounded-2xl
          shadow
          mb-6
        "
      >
        Tổng thí sinh:
        <strong>
          {" "}
          {
            summary?.totalCandidates
          }
        </strong>
      </div>

      <UploadExcel
        reload={loadCandidates}
      />

      <div
        className="
          bg-white
          p-4
          rounded-2xl
          shadow
          mt-6
        "
      >
        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-3
            mb-4
          "
        >
          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Tìm theo SBD hoặc tên"
            className="
              border
              rounded-xl
              p-3
              flex-1
            "
          />

          <button
            onClick={() => {
              setPage(1);
              loadCandidates();
            }}
            className="
              bg-blue-600
              text-white
              px-5
              rounded-xl
            "
          >
            Tìm kiếm
          </button>

          <button
  onClick={exportExcel}
  className="
    bg-green-600
    text-white
    px-5
    rounded-xl
  "
>
  Export
</button>
        </div>

        <CandidateTable
          candidates={
            candidates
          }
        />

        {pagination && (
          <div
            className="
              flex
              justify-center
              gap-2
              mt-5
            "
          >
            <button
              disabled={
                page <= 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
            >
              ←
            </button>

            <span>
              {pagination.page}
              /
              {
                pagination.totalPages
              }
            </span>

            <button
              disabled={
                page >=
                pagination.totalPages
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}