import { useState } from "react";
import AdjustmentsAltIcon from "../../SvgIcon/AdjustmentsAltIcon";

export default function Filtering({
  categories,
  onSelectCategory,
  selectedCategories,
}) {
  const [filterButton, setFilterButton] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm"
        id="filter-button"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => setFilterButton((prev) => !prev)}
      >
        <AdjustmentsAltIcon />
      </button>
      {filterButton && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white shadow-lg">
          <div className="py-1 ">
            {categories.map((category, index) => (
              <label
                key={index}
                className="inline-flex items-center px-4 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onSelectCategory(category)}
                  className="form-checkbox h-4  rounded-md"
                />
                <span className="ml-2">{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
