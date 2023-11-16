import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import React from "react";
import { CiStickyNote } from "react-icons/ci";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { state: "logout" });
  };
  return (
    <div className="flex justify-between items-center border-b bg-gray-900 border-b-black py-2 px-4 lg:p-4 lg:px-24">
      <button
        className="font-black flex gap-x-2 items-center font-mono text-2xl text-white"
        onClick={() => (window.location.pathname = "/")}
      >
        <p>TaskMaster</p>
        <CiStickyNote />
      </button>
      <div className="mr-12 lg:mr-2">
        {localStorage.getItem("token") ? (
          <Button
            type="button"
            onClick={() => handleLogout()}
            className="lg:bg-white text-white lg:text-black hover:bg-slate-200"
          >
            Logout
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => navigate("/login")}
            className="lg:bg-white text-white lg:text-black hover:bg-slate-200"
          >
            Login
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
