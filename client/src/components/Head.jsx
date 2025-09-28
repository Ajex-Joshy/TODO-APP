import { useEffect, useRef, useState } from "react";
import { jsx } from "react/jsx-runtime";

const Head = ({ taskState: { tasks, setTasks }, viewCompleted }) => {
  const title = useRef();
  const description = useRef();
  const dateTime = useRef();

  function handleSubmit() {
    const task = {
      id: new Date().getTime(),
      title: title.current.value,
      description: description.current.value,
      dateTime: dateTime.current.value,
      completed: false,
      dueOver: false,
    };
    setTasks([...tasks, task]);
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-black text-center mb-6 drop-shadow-lg">
        ToDo App
      </h1>
      <form
        className="flex justify-center flex-col lg:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          className="border border-gray-300 rounded-md px-3 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="title"
          ref={title}
          required
          id="title"
        />
        <input
          className="border border-gray-300 rounded-md px-3 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="description"
          ref={description}
          required
          id="desc"
        />
        <input
          className="border border-gray-300 rounded-md px-3 py-2 m-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="datetime-local"
          ref={dateTime}
          required
          id="dateTime"
        />
        <input
          className="px-4 py-2 m-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md cursor-pointer transition duration-200"
          type="submit"
          name=""
          id=""
        />
      </form>

      <div className="flex justify-center m-3 p-3">
        <button
          className="m-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-md transition duration-200 cursor-pointer"
          onClick={() => viewCompleted(false)}
        >
          To Do
        </button>
        <button
          className="m-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow-md transition duration-200 cursor-pointer"
          onClick={() => viewCompleted(true)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Head;
