import { useState } from "react";
import ErrorIcon from "../../SvgIcon/ErrorIcon";
import Filtering from "../Income/Filtering";
import Sorting from "../Sorting";
import TaskLists from "../TaskLists";

export default function Expense({ tasks, deleteTask, editTask }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortValue, setSortValue] = useState(null);
  // Use a Set to get unique categories
  const categories = [...new Set(tasks.map((task) => task.category))];

  const filteredData =
    selectedCategories.length === 0
      ? tasks
      : tasks.filter((item) => selectedCategories.includes(item.category));

  const toggleCategorySelection = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((selectedCat) => selectedCat !== category)
        : [...prev, category]
    );
    setSortValue(null);
  };
  const handleSort = (order) => {
    const sortItems = [...tasks];
    if (order === "low-to-high") sortItems.sort((a, b) => a.amount - b.amount);
    else if (order === "high-to-low")
      sortItems.sort((a, b) => b.amount - a.amount);
    setSortValue(sortItems);
  };

  return (
    <div className="border rounded-md">
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center">
            <ErrorIcon />
          </div>
          <h3 className="text-xl font-semibold leading-7 text-gray-800">
            Expense
          </h3>
        </div>
        <div>
          <Sorting onSort={handleSort} />
          <Filtering
            selectedCategories={selectedCategories}
            onSelectCategory={toggleCategorySelection}
            categories={categories}
          />
        </div>
      </div>
      <div className="p-4 divide-y">
        {filteredData.length > 0 ? (
          <TaskLists
            tasks={sortValue ? sortValue : filteredData}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ) : (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}
      </div>
    </div>
  );
}
