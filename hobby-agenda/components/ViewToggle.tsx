type Props = {
  view: "agenda" | "calendar";
  onChange: (view: "agenda" | "calendar") => void;
};

export default function ViewToggle({ view, onChange }: Props) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange("agenda")}
        className={`rounded px-4 py-2 ${view === "agenda"
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
          }`}
      >
        Agenda
      </button>

      <button
        onClick={() => onChange("calendar")}
        className={`rounded px-4 py-2 ${view === "calendar"
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
          }`}
      >
        Calendar
      </button>
    </div>
  );
}