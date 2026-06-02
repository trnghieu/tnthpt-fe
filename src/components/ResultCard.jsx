export default function ResultCard({
  candidate,
}) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        shadow-lg
        p-6
        mt-6
      "
    >
      <div className="border-b pb-4 mb-5">
        <h2
          className="
            text-2xl
            font-bold
            text-gray-800
          "
        >
          {candidate.fullName}
        </h2>

        <div className="mt-2 text-gray-600">
          SBD:{" "}
          <span className="font-semibold">
            {candidate.examNumber}
          </span>
        </div>

        {candidate.schoolName && (
          <div className="text-gray-600">
            Trường:{" "}
            <span className="font-medium">
              {candidate.schoolName}
            </span>
          </div>
        )}
      </div>

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-4
          gap-4
        "
      >
        <ScoreItem
          label="Toán"
          value={candidate.scores?.math}
        />

        <ScoreItem
          label="Văn"
          value={candidate.scores?.literature}
        />

        <ScoreItem
          label="Lý"
          value={candidate.scores?.physics}
        />

        <ScoreItem
          label="Hóa"
          value={candidate.scores?.chemistry}
        />
      </div>

      <div
        className="
          mt-6
          p-4
          bg-gray-50
          rounded-xl
        "
      >
        <span className="font-medium">
          Phòng thi:
        </span>{" "}
        <span className="font-bold text-blue-600">
          {candidate.examRoom || "Chưa cập nhật"}
        </span>
      </div>
    </div>
  );
}

function ScoreItem({
  label,
  value,
}) {
  return (
    <div
      className="
        bg-blue-50
        rounded-xl
        p-4
        text-center
      "
    >
      <div
        className="
          text-gray-500
          text-sm
          mb-2
        "
      >
        {label}
      </div>

      <div
        className="
          text-2xl
          font-bold
        "
      >
        {value !== null &&
        value !== undefined ? (
          value
        ) : (
          <span
            className="
              text-orange-500
              text-sm
              font-semibold
            "
          >
            Đang cập nhật
          </span>
        )}
      </div>
    </div>
  );
}