export default function SearchForm({
  value,
  onChange,
  onSearch,
  loading,
}) {
  return (
    <div
      className="
        flex
        flex-col
        md:flex-row
        gap-3
      "
    >
      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Nhập số báo danh..."
        className="
          flex-1
          bg-gray-50
          border
          border-gray-200
          rounded-2xl
          px-5
          py-4
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-8
          py-4
          rounded-2xl
          font-semibold
          transition
        "
      >
        {loading
          ? "Đang tra cứu..."
          : "Tra cứu"}
      </button>
    </div>
  );
}