import { useEffect, useState, useRef } from "react";
import { FaEdit, FaCheck, FaTrash, FaSave } from "react-icons/fa";
import swal from "sweetalert2";

const Task = ({
  task: { id, title, description, dateTime, completed, dueOver },
  functions: { onDelete, onComplete, onUpdate },
}) => {
  const titler = useRef(title);
  const descriptionr = useRef();
  const dateTimer = useRef();
  const [isEditing, setIsEditing] = useState(false);
  function handleDelete(id) {
    swal
      .fire({
        title: "Are You Sure?",
        text: "You wont be able to undo this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          onDelete(id);
        }
      });
  }

  function handleComplete(id) {
    swal
      .fire({
        title: "Are You Sure?",
        text: "You wont be able to undo this action!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Mark As Complete",
      })
      .then((result) => {
        if (result.isConfirmed) {
          onComplete(id);
        }
      });
  }
  function handleUpdate(id) {
    onUpdate(
      id,
      titler.current.value,
      descriptionr.current.value,
      dateTimer.current.value
    );
  }
  return (
    <div
      className={`w-10/12 ${
        dueOver && !completed ? "bg-red-200" : "bg-slate-100"
      } shadow-md rounded-md border border-slate-200 m-4 p-2 mx-auto flex justify-between`}
    >
      <div className="flex flex-col">
        {isEditing ? (
          <input
            className="border border-black rounded-md px-3 py-1 m-2 "
            type="text"
            ref={titler}
            defaultValue={title}
          />
        ) : (
          <h2 className="font-bold text-lg text-green-700">{title}</h2>
        )}
        {isEditing ? (
          <input
            className="border border-black rounded-md px-3 py-1 m-2 "
            type="text"
            ref={descriptionr}
            defaultValue={description}
          />
        ) : (
          <p>{description}</p>
        )}
        {isEditing ? (
          <input
            className="border border-black rounded-md px-3 py-1 m-2 "
            type="datetime-local"
            ref={dateTimer}
            defaultValue={dateTime}
          />
        ) : (
          <>
            <p
              className={`text-sm text-gray-600 ${
                completed ? "bg-red-200" : "bg-yellow-100"
              } px-2 py-1 rounded inline-block mt-1`}
            >
              Due:{" "}
              {new Date(dateTime).toLocaleString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {dueOver && !completed && (
              <p className="text-red-600 font-bold p-2">due over!!</p>
            )}
          </>
        )}

        {isEditing && (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white m-2 p-3 rounded-sm cursor-pointer flex justify-center"
            onClick={() => {
              handleUpdate(id);
              setIsEditing(false);
            }}
          >
            <FaSave />
          </button>
        )}
      </div>
      {!completed && (
        <div className="flex">
          <div className="relative flex items-center group">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white m-2 p-3 rounded-sm cursor-pointer flex items-center"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit />
            </button>
            <span className="absolute mb-21 w-17 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              edit task
            </span>
          </div>
          <div className="relative flex items-center group">
            <button
              title=""
              className={
                "bg-green-500 hover:bg-green-600 text-white m-2 p-3 rounded-sm cursor-pointer flex items-center"
              }
              onClick={() => {
                handleComplete(id);
              }}
            >
              <FaCheck />
            </button>
            <span className="absolute mb-25 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              marks as complete
            </span>
          </div>
          <div className="relative flex items-center group">
            <button
              className="bg-red-500 hover:bg-red-600 text-white m-2 p-3 rounded-sm cursor-pointer flex items-center"
              onClick={() => handleDelete(id)}
            >
              <FaTrash />
            </button>
            <span className="absolute w-20 mb-23 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              delete task
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
