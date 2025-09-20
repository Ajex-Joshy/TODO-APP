import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://todo-app-bv20.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.msg);
        return;
      }
      const data = await res.json();
      navigate("/app");
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  }
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="w-10/12 md:w-6/12 lg:w-4/12 bg-white mx-auto p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="font-extrabold text-4xl text-center mb-8 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-center text-red-500 font-semibold mt-5">{error}</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-5"
        >
          <input
            className="py-3 px-4 border w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="py-3 px-4 border w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="cursor-pointer px-6 py-3 rounded-lg w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            type="submit"
            value="Login"
          />
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link to="/register" className="text-purple-600 hover:underline">
            Dont have an account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
