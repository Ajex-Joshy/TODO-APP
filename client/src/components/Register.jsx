import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchAPI = async () => {
      try {
        const res = await fetch(
          "https://todo-app-bv20.onrender.com/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password }),
          }
        );
        const data = await res.json();
        if (!res.ok) {
          setError(data.msg);
          return;
        }
        navigate("/login");
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAPI();
  };
  return (
    <div className="h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center">
      <div className="w-10/12 md:w-6/12 lg:w-4/12 bg-white mx-auto p-10 rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
        <h1 className="font-extrabold text-4xl text-center mb-8 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-center text-red-500 font-semibold mt-5">{error}</p>
        <form
          method="POST"
          className="flex flex-col items-center space-y-5"
          onSubmit={handleSubmit}
        >
          <input
            className="py-3 px-4 border w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            type="text"
            placeholder="First Name"
            name=""
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="py-3 px-4 border w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            type="text"
            placeholder="Last Name"
            name=""
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            className="py-3 px-4 border w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            type="email"
            placeholder="Email ID"
            name=""
            id="emailId"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="py-3 px-4 border w-full rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="cursor-pointer px-6 py-3 rounded-lg w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
            type="submit"
            value="Register"
          />
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          <Link to="/" className="text-purple-600 hover:underline">
            Already have an account?
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
