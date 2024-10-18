import { useState } from "react";
import Expense from "./Expenses/Expense";
import Income from "./Income";
import AllBalances from "./AllBalances";
import Test from "./ExpenseTracker";

export default function Demo() {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    deleteTask(taskToDelete);
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setTaskToDelete(null);
  };

  const handleEditTask = (updatedTask) => {
    setTaskToUpdate(updatedTask);
  };

  const handleData = (newTask, isAdd) => {
    console.log("New Task:", isAdd, newTask);
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
  };

  const incomeTask = tasks.filter((task) => task.type === "income");
  const expenseTask = tasks.filter((task) => task.type === "expense");

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Test taskToUpdate={taskToUpdate} onSave={handleData} />
        <div className="lg:col-span-2">
          <AllBalances incomeTask={incomeTask} expenseTask={expenseTask} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Income
              tasks={incomeTask}
              deleteTask={handleDeleteClick}
              editTask={handleEditTask}
            />
            <Expense
              tasks={expenseTask}
              deleteTask={handleDeleteClick}
              editTask={handleEditTask}
            />
          </div>
        </div>
      </section>

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <p className="mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
