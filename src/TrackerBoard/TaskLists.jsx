import CheckmarkIcon from "../SvgIcon/CheckmarkIcon ";
import TrashIcon from "../SvgIcon/TrashIcon";

// eslint-disable-next-line react/prop-types
export default function TaskLists({ tasks = [], deleteTask, editTask }) {
  return tasks.length > 0 ? (
    tasks.map((task) => (
      <div
        key={task.id} // Ensure each task has a unique key
        className="flex justify-between items-center py-2 relative group cursor-pointer"
      >
        <div>
          <h3 className="text-base font-medium leading-7 text-gray-600">
            {task.category}
          </h3>
          <p className="text-xs text-gray-600">{task.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
            BDT {task.amount}
          </p>

          {/* 3 Dots */}
          <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
            <button
              className="hover:text-teal-600"
              role="button"
              title="Edit Button"
              onClick={() => editTask(task)}
            >
              <CheckmarkIcon />
            </button>

            <button
              className="hover:text-red-600"
              role="button"
              title="Delete"
              onClick={() => deleteTask(task.id)} // Delete task on click
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No transaction </p> // Fallback message when no tasks exist
  );
}
