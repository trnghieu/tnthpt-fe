import { useState } from "react";

import api from "../api/axios";

export default function UploadExcel({
  reload,
}) {
  const [file, setFile] =
    useState(null);

  const upload =
    async () => {
      if (!file) return;

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      try {
        await api.post(
          "/admin/import",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${localStorage.getItem(
                  "token"
                )}`,
            },
          }
        );

        alert(
          "Import thành công"
        );

        reload();
      } catch {
        alert(
          "Import thất bại"
        );
      }
    };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow
        p-5
      "
    >
      <div
        className="
          flex
          flex-col
          md:flex-row
          gap-3
        "
      >
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={(e) =>
            setFile(
              e.target.files[0]
            )
          }
        />

        <button
          onClick={upload}
          className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-xl
          "
        >
          Import Excel
        </button>
      </div>
    </div>
  );
}