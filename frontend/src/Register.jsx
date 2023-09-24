import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import auth from "./auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const register = () => {
    const dataToPost = new FormData();
    dataToPost.set("name", name);
    dataToPost.set("email", email);
    dataToPost.set("password", password);
    if (cpassword !== password) {
      toast.error("Passwords do not match");
    } else {
      auth
        .post("/users/create", {
          name: name,
          email: email,
          password: password
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col min-w-screen justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full lg:w-2/6 mx-auto lg:border lg:rounded-lg lg:shadow-lg bg-white">
        <div className="lg:m-24">
          <div className="text-center text-2xl mb-4 lg:mb-8 font-medium">
            Create your account
          </div>
          <div className="flex flex-col gap-y-4 px-5 lg:pr-0">
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="name" className="text-left">
                Name
              </Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                id="name"
                type="text"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="email" className="text-left">
                Email
              </Label>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                type="email"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="password" className="text-left">
                Password
              </Label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label htmlFor="cpassword" className="text-left">
                Confirm Password
              </Label>
              <Input
                onChange={(e) => setCPassword(e.target.value)}
                id="cpassword"
                type="password"
                className="col-span-3"
              />
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => register()}
                className="col-start-2 px-16"
                type="button"
              >
                Signup
              </Button>
            </div>
            <div className="flex justify-between">
              <div className="text-gray-500">Already have an account?</div>
              <button
                onClick={() => (window.location.pathname = "/login")}
                className="hover:underline"
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