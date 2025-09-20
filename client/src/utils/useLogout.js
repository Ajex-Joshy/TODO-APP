// import { useNavigate } from "react-router-dom";

const useLogout = () => {
  // const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(
        "https://todo-app-bv20.onrender.com/auth/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();
      console.log(data.msg);

      if (res.ok) {
        console.log("User logged out successfully");
        // navigate("/login");
      } else {
        console.error("Logout failed:", data.msg);
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };
  logout();

  return logout;
};

export default useLogout;
