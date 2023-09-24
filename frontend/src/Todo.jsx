import Navbar from "./components/Navbar";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Todo = () => {
  const [pending, setPending] = useState([1, 2, 3, 4]);
  const [completed, setCompleted] = useState([
    "first",
    "second",
    "third",
    "fourth",
  ]);
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 gap-x-24 mt-8 px-12">
        <div>
          <div className="rounded-md text-center border-l-4 border border-blue-500 text-black py-3 font-medium">
            Add ToDo
          </div>
          <div className="flex flex-col gap-y-6 border border-blue-500 rounded-md mt-4 p-4">
            <Input
              id="phone"
              type="text"
              className="col-span-3"
              placeholder="Title"
            />
            <Input
              id="phone"
              type="text"
              className="col-span-3"
              placeholder="description"
            />
            <button className="bg-blue-500 text-white py-3 rounded-md">
              Add ToDo
            </button>
          </div>
        </div>
        <div>
          <div className="rounded-md text-center border-l-4 border border-yellow-500 text-black py-3 font-medium">
            Pending
          </div>
          <div className="flex flex-col gap-y-6 border border-yellow-500 rounded-md mt-4 p-4">
            {pending.map((item) => {
              return (
                <div className="shadow-md py-6 rounded-md px-4 border-l-4 border-gray-600">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="rounded-md text-center border-l-4 border border-green-500 text-black py-3 font-medium">
            Completed
          </div>
          <div className="flex flex-col gap-y-6 border border-green-500 rounded-md mt-4 p-4">
            {completed.map((item) => {
              return (
                <div className="shadow-md py-6 rounded-md px-4 border-l-4 border-gray-600">
                  {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
