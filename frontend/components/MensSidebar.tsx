type Props = {
  categories: string[];
  activeCategory: string | null;
  onSelect: (category: string | null) => void;
};

export function MensCategorySidebar({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  return (
    <aside className="w-64 border-r border-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-4">Men Categories</h2>

      <ul className="space-y-2">
        <li
          onClick={() => onSelect(null)}
          className={`cursor-pointer px-3 py-2 rounded-md ${activeCategory === null
              ? "bg-rose-100 text-rose-600"
              : "hover:bg-gray-100"
            }`}
        >
          All
        </li>

        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => onSelect(cat)}
            className={`cursor-pointer px-3 py-2 rounded-md capitalize ${activeCategory === cat
                ? "bg-rose-100 text-rose-600"
                : "hover:bg-gray-100"
              }`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
