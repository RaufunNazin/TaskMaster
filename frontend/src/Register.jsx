import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";
import { CiStickyNote } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const register = () => {
    if (cpassword !== password) {
      toast.error("Passwords do not match");
    } else {
      api
        .post("/auth/signup", {
          email: email,
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", res.data.username);
            navigate("/", { state: "login" });
          }
        })
        .catch((err) => toast.error(err.response.data.message));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col min-w-screen justify-center">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full md:w-2/3 lg:w-3/5 xl:w-1/3 mx-auto lg:border lg:rounded-lg lg:shadow-lg lg:bg-white">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="fixed top-5 left-5 flex gap-x-2 items-center text-center font-mono text-3xl mb-4 lg:mb-8 font-medium"
        >
          <p>TaskMaster</p>
          <CiStickyNote />
        </button>
        <div className="lg:m-16">
          <div className="text-center text-2xl mb-8 lg:mb-12 font-medium">
            Create your account
          </div>
          <div className="flex flex-col gap-y-6 px-8 lg:px-12">
            <div className="">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
            <div className="">
              <Input
                onChange={(e) => setUsername(e.target.value)}
                id="username"
                type="text"
                placeholder="Username"
              />
            </div>
            <div className="">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="">
              <Input
                onChange={(e) => setCPassword(e.target.value)}
                id="cpassword"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => register()}
                className="px-16"
                type="button"
              >
                Signup
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Already have an account?</div>
              <button
                onClick={() => (window.location.pathname = "/login")}
                className="hover:underline text-blue-600 font-medium"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
