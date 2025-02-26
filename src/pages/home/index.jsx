import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // 🔥 Redux'dan logout
    navigate("/login"); // 🔄 Login sahifasiga yo‘naltirish
  };

  return (
    <div>
      <h1>Home</h1>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
