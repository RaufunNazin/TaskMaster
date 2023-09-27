import Navbar from "./components/Navbar";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import SidePanel from "./components/SidePanel";
import { useState } from "react";

const Completed = () => {
  const [completed, setCompleted] = useState([
    { title: "1", date: "2" },
    { title: "1", date: "2" },
    { title: "1", date: "2" },
  ]);

  const deleteCompletedTask = (index) => {
    // Create a copy of the pending array
    const updatedCompleted = [...completed];
    // Remove the item at the specified index
    updatedCompleted.splice(index, 1);
    // Update the state with the modified array
    setCompleted(updatedCompleted);
  };
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Navbar />
      <div className="flex flex-1">
        <SidePanel />
        <div className="lg:grid lg:grid-cols-1 lg:gap-x-24 pt-8 px-12 bg-gray-50 flex-1 hidden">
          <div className="flex flex-col gap-y-2 p-4">
            {completed?.length > 0 ? (
              completed?.map((item, i) => {
                return (
                  <button
                    type="button"
                    key={i}
                    draggable="true"
                    className="shadow-md py-3 rounded-sm bg-white px-10 flex justify-between items-center"
                  >
                    <div>
                      <div className="text-xl text-left">{item.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-x-1">
                        <AiOutlineClockCircle />
                        {item.date && item.date}
                      </div>
                    </div>
                    <div className="flex gap-x-4 text-gray-500">
                      <button>
                        <CgDetailsMore className="text-2xl hover:text-blue-600" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button type="button">
                            <RiDeleteBin6Line className="text-2xl hover:text-red-800" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your task
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteCompletedTask(i)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="shadow-md py-6 rounded-sm bg-white px-10 flex gap-x-4 items-center">
                <BiTimeFive className="text-2xl text-yellow-600" />
                <div>Yet to complete a task!</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Completed;
