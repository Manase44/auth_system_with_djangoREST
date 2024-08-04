import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/user.store";
import { useEffect } from "react";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast("Login to view dashboard", {
        theme: "failure",
        position: "top-right",
      });
      return navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/user/accounts/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);
      if (response.status == 401) {
        navigate("/login", { replace: true });
        setUser(null);
        toast("Login to view dashboard", {
          theme: "failure",
          position: "top-right",
        });
      }

      if (!response.ok) {
        throw new Error(`Server error ! : Status ${response.status}`);
      } else {
        const data = await response.json();
        toast(data.message, { theme: "success", position: "top-right" });
        setUser(null);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.log("An error occured while logging out");
    }
  };

  return (
    <header>
      <h1>
        Welcome {user?.first_name} {user?.last_name}!
      </h1>
      <span onClick={handleLogout}>Logout</span>
    </header>
  );
};

export default Dashboard;
