export default function ResultCard({
  candidate,
}) {
  return (
    <div
      className="
        mt-8
        bg-gradient-to-r
        from-blue-50
        to-indigo-50
        rounded-3xl
        p-6
        shadow-lg
      "
    >
      <div className="text-center">
        <h2
          className="
            text-2xl
            font-bold
          "
        >
          {candidate.fullName}
        </h2>

        <p className="text-gray-500">
          SBD: {candidate.examNumber}
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-3
          gap-4
          mt-6
        "
      >
        <ScoreItem
          label="Toán"
          value={candidate.scores?.math}
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
          bg-white
          rounded-xl
          p-4
          text-center
        "
      >
        <span className="font-semibold">
          Phòng thi:
        </span>
        {" "}
        {candidate.examRoom}
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
        bg-white
        rounded-2xl
        p-5
        shadow
        text-center
      "
    >
      <div
        className="
          text-gray-500
          text-sm
        "
      >
        {label}
      </div>

      <div
        className="
          text-3xl
          font-bold
          text-blue-600
          mt-2
        "
      >
        {value ?? "--"}
      </div>
    </div>
  );
}