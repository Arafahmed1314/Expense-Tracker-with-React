import { useState } from "react";
import SortDescendingIcon from "../SvgIcon/SortDescendingIcon";

// eslint-disable-next-line react/prop-types
export default function Sorting({ onSort }) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleSort = (order) => {
    onSort(order);
    setToggle(false); // Close the dropdown after sorting
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <SortDescendingIcon />
        </button>
      </div>
      {toggle && (
        <div
          className="hover:active absolute z-10 mt-2 left-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              id="menu-item-0"
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleSort("low-to-high")}
            >
              Low to High
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
              id="menu-item-1"
              role="menuitem"
              tabIndex="-1"
              onClick={() => handleSort("high-to-low")}
            >
              High to Low
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
