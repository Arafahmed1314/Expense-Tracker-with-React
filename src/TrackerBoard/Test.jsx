import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Test({ onSave, taskToUpdate }) {
  const [formValue, setFormValue] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      type: "expense",
      category: "Education",
      amount: "",
      date: new Date(),
    }
  );
  const [activeTab, setActiveTab] = useState("expense");

  const handleChange = (evt) => {
    const name = evt.target.name;
    let value = evt.target.value;
    setFormValue({ ...formValue, [name]: value });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormValue({ ...formValue, type: tab }); // Update the type based on the tab
  };
  const isAdd = !taskToUpdate;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // onSave(formValue, isAdd); // Pass true if adding a new task
    setFormValue({
      id: crypto.randomUUID(),
      type: "expense",
      category: "Education",
      amount: "",
      date: new Date(),
    }); // Reset the form after saving
  };

  return (
    <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
      <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
        Expense Tracker
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
          <button
            type="button"
            onClick={() => handleTabClick("expense")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              activeTab === "expense" ? "active" : ""
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => handleTabClick("income")}
            className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
              activeTab === "income" ? "active" : ""
            }`}
          >
            Income
          </button>
        </div>

        {/* Category Selector */}
        <div className="mt-3">
          <label
            htmlFor="category"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Category
          </label>
          <div className="mt-2">
            <select
              id="category"
              name="category"
              required
              value={formValue.category} // Correct value binding
              onChange={handleChange}
              autoComplete="category-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            >
              {activeTab === "expense" ? (
                <>
                  <option>Education</option>
                  <option>Food</option>
                  <option>Health</option>
                  <option>Bill</option>
                  <option>Insurance</option>
                  <option>Tax</option>
                  <option>Transport</option>
                  <option>Telephone</option>
                </>
              ) : (
                <>
                  <option>Salary</option>
                  <option>Outsourcing</option>
                  <option>Bond</option>
                  <option>Dividend</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mt-3">
          <label
            htmlFor="amount"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Amount
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="amount"
              id="amount"
              required
              value={formValue.amount} // Correct value binding
              onChange={handleChange}
              autoComplete="off"
              placeholder="12931"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="mt-3">
          <label
            htmlFor="date"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Date
          </label>
          <div className="mt-2">
            <input
              type="date"
              name="date"
              value={formValue.date.toISOString().split("T")[0]} // Format the date correctly
              onChange={handleChange}
              id="date"
              required
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          onClick={() => onSave(formValue, isAdd)}
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {taskToUpdate ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
}
