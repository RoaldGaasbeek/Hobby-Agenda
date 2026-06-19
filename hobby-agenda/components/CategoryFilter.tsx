import { Category } from "@/types/activity";

type Props = {
  categories: Category[];
  selected: string;
  onSelect: (categoryId: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={`rounded px-3 py-1 ${selected === "all"
          ? "bg-black text-white"
          : "bg-gray-200"
          }`}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`rounded px-3 py-1 ${selected === category.id
            ? "bg-black text-white"
            : "bg-gray-200"
            }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}