import Head from "./components/Head";
import Task from "./components/Task";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch("https://todo-app-bv20.onrender.com/verify", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) {
          navigate("/");
        } else {
          setLoading(false);
        }
      } catch (err) {
        navigate("/");
      }
    };
    verifyUser();
  }, [navigate]);
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

  if (loading) {
    return <h1>Verifying user...</h1>;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-full min-h-screen flex justify-center">
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
  );
}

export default App;
