import { useState } from "react";

// eslint-disable-next-line react/prop-types
export default function ExpenseTracker({ onSave, taskToUpdate }) {
  const isAdd = !taskToUpdate; // Check if taskToUpdate is null/undefined
  const initialFormState = {
    id: taskToUpdate?.id || crypto.randomUUID(),
    type: taskToUpdate?.type || "expense",
    category: taskToUpdate?.category || "Education",
    amount: taskToUpdate?.amount || "",
    date: taskToUpdate?.date || new Date(),
  };

  const [formValue, setFormValue] = useState(initialFormState);
  const [activeTab, setActiveTab] = useState(taskToUpdate?.type || "expense");

  // Manually update form when taskToUpdate changes
  if (taskToUpdate && formValue.id !== taskToUpdate.id) {
    setFormValue(taskToUpdate);
    setActiveTab(taskToUpdate.type);
  }

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setFormValue((prevState) => ({
      ...prevState,
      type: tab,
      category: isAdd
        ? tab === "expense"
          ? "Education"
          : "Salary"
        : prevState.category,
    }));
  };

  // Handle form input changes
  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    const updatedFormValue = {
      ...formValue,
      type: activeTab,
      date: formatDate(new Date(formValue.date)),
    };

    onSave(updatedFormValue);

    // Reset form if it's for adding a new task
    if (isAdd) {
      setFormValue({
        id: crypto.randomUUID(),
        type: activeTab,
        category: activeTab === "expense" ? "Education" : "Salary",
        amount: "",
        date: new Date(),
      });
    }
  };

  // Format the date to "yyyy-MM-dd"
  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
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
              value={formValue.category}
              onChange={handleForm}
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
              value={formValue.amount}
              onChange={handleForm}
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
              value={formatDate(new Date(formValue.date))} // Ensure date is formatted correctly in input
              onChange={handleForm}
              id="date"
              required
              autoComplete="off"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
        >
          {isAdd ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
}
