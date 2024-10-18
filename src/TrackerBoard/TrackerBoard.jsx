import { useState } from "react";
import Expense from "./Expenses/Expense";
import Income from "./Income";
import AllBalances from "./AllBalances";
import ExpenseTracker from "./ExpenseTracker";
import Test from "./Test";

export default function TrackerBoard() {
  const initialState = {
    id: crypto.randomUUID(),
    type: "",
    category: "",
    amount: "",
    date: "",
  };

  const [tasks, setTasks] = useState([initialState]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setFilteredTasks(filteredTasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (updatedTask) => {
    setTaskToUpdate(updatedTask);
  };

  const handleData = (formValue) => {
    if (taskToUpdate) {
      setTasks(
        tasks.map((task) =>
          task.id === taskToUpdate.id ? { ...task, ...formValue } : task
        )
      );
      setFilteredTasks(
        filteredTasks.map((task) =>
          task.id === taskToUpdate.id ? { ...task, ...formValue } : task
        )
      );
      setTaskToUpdate(null);
    } else {
      const newTask = { ...formValue, id: crypto.randomUUID() };
      setTasks([...tasks, newTask]);
      setFilteredTasks([...filteredTasks, newTask]);
    }
  };

  // const handleSortItem = (order) => {
  //   const sortItems = [...filteredTasks];
  //   if (order === "low-to-high") sortItems.sort((a, b) => a.amount - b.amount);
  //   else if (order === "high-to-low")
  //     sortItems.sort((a, b) => b.amount - a.amount);
  //   setFilteredTasks(sortItems);
  // };

  const incomeTask = filteredTasks.filter((task) => task.type === "income");
  const expenseTask = filteredTasks.filter((task) => task.type === "expense");

  return (
    <main className="relative mx-auto mt-10 w-full max-w-7xl">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* <ExpenseTracker taskToUpdate={taskToUpdate} onSave={handleData} /> */}
        <ExpenseTracker taskToUpdate={taskToUpdate} onSave={handleData} />
        <div className="lg:col-span-2">
          <AllBalances incomeTask={incomeTask} expenseTask={expenseTask} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
            <Income
              tasks={incomeTask}
              deleteTask={deleteTask}
              editTask={handleEditTask}
              // onSortItem={handleSortItem}
              // checkValue={handleCheckValue}
            />
            <Expense
              tasks={expenseTask}
              deleteTask={deleteTask}
              editTask={handleEditTask}
              // onSortItem={handleSortItem}
              // checkValue={handleCheckValue}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
