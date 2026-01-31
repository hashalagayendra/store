import { useState } from "react";

const CategoryTabs = () => {
  const categories = [
    "All",
    "Laptops",
    "Components",
    "Monitors",
    "Accessories",
  ];
  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-4 py-2 rounded-full font-medium transition-colors ${
            active === cat
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
