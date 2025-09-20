import Head from "./components/Head";
import Task from "./components/Task";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLogout from "./utils/useLogout.js";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // todo change to true and uncomment below useEffect and change ajex to ""
  const [userName, setUserName] = useState("Ajex");

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     try {
  //       const res = await fetch("https://todo-app-bv20.onrender.com/verify", {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //       if (!res.ok) {
  //         let data = await res.json();
  //         console.log(data);
  //         navigate("/");
  //       } else {
  //         let data = await res.json();
  //         setUserName(data.user.firstName);
  //         setLoading(false);
  //       }
  //     } catch (err) {
  //       navigate("/");
  //     }
  //   };
  //   verifyUser();
  // }, [navigate]);
  const intervalId = useRef();

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTasks((prev) => {
        const updated = prev.map((t) =>
          new Date(t.dateTime) < new Date() ? { ...t, dueOver: true } : t
        );
        const incompleted = updated.filter((t) => !t.completed);
        const completed =
          updated
            .filter((t) => t.completed)
            .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
            .slice(0, 5) || [];
        return [...incompleted, ...completed];
      });
    }, 4000);

    return () => clearInterval(intervalId.current);
  }, []);

  function onDelete(id) {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    toast.success("Task deleted successfully");
  }

  function onComplete(id) {
    console.log("id");
    const updatedTasks = tasks.filter((t) => {
      if (t.id == id) {
        let task = t;
        task["completed"] = true;
        return task;
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
    toast.success("Task Marked As Complete");
  }
  function viewCompleted(res) {
    setShowCompleted(res);
  }

  function onUpdate(id, title, description, dateTime) {
    const updatedTasks = tasks.filter((t) => {
      if (t.id == id) {
        let task = t;
        task["title"] = title;
        task["description"] = description;
        task["dateTime"] = dateTime;
        return task;
      } else {
        return t;
      }
    });
    setTasks(updatedTasks);
    toast.success("Task Updated Successfully");
  }
  function handleLogout() {
    const logout = useLogout();
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white mb-6"></div>
        <h1 className="text-white text-2xl font-bold animate-pulse">
          Verifying user... please wait
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-full min-h-screen flex flex-col ">
      <div className="flex justify-end">
        <h1 className="text-2xl text-white m-4">Hello, {userName} 👋</h1>
        <div>
          <button
            className="m-4 px-5 py-2 bg-white text-red-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-7/12 bg-white rounded-xl shadow-2xl p-8 mt-20">
          <Head taskState={{ tasks, setTasks }} viewCompleted={viewCompleted} />
          <div>
            {tasks
              .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime))
              .map((t) => {
                if (t.completed === showCompleted)
                  return (
                    <Task
                      key={t.id}
                      task={t}
                      functions={{
                        onComplete,
                        onDelete,
                        viewCompleted,
                        onUpdate,
                      }}
                    />
                  );
              })}
          </div>
        </div>
        <div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
