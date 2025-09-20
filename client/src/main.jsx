import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorElement from "./components/ErrorElement.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorElement />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>
);
