import Navbar from "./components/Navbar";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
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
import { useEffect, useState } from "react";
import { BiChevronsRight } from "react-icons/bi";
import api from "./api";
import { useParams, useLocation } from "react-router-dom";

const FilteredTodo = () => {
  let { todoType } = useParams();
  const location = useLocation();
  
  const [tasks, setTasks] = useState();
  
  const getTasks = () => {
    api
      .get(`/category/${location.state}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setTasks([...res.data.todos]);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const deleteTask = (id) => {
    api
      .delete(`/todo/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 204) {
          toast.success("Task deleted");
          getTasks();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getTasks();
  }, [todoType]);

  return (
    <div className="flex flex-col h-screen">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
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
        <div className="flex flex-col w-full">
          <div className="bg-gray-50 pt-4 lg:pt-8 px-4 lg:px-12 flex gap-x-2 items-center">
            <p className="text-lg lg:text-2xl">{todoType} Tasks</p>
            <BiChevronsRight className="text-md lg:text-xl" />
          </div>
          <div className="lg:grid lg:grid-cols-1 lg:gap-x-24 pt-4 lg:pt-8 px-2 lg:px-12 bg-gray-50 flex-1">
            <div className="flex flex-col gap-y-2 p-4">
              {tasks?.length > 0 ? (
                tasks?.map((item) => {
                  const currentDate = new Date(item.targetDate);
                  currentDate.setDate(currentDate.getDate() + 1);
                  return (
                    <div
                      key={item.id}
                      className="shadow-md py-3 rounded-sm bg-white px-4 lg:px-10 flex justify-between items-center gap-x-3"
                    >
                      <div>
                        <p className="text-lg lg:text-xl text-left whitespace-normal break-all overflow-hidden">
                          {item.title}
                        </p>
                        <div className="text-sm text-gray-500 flex items-center gap-x-1">
                          <AiOutlineClockCircle />
                          {currentDate.toISOString().slice(0, 10)}
                        </div>
                      </div>
                      <div className="flex gap-x-2 lg:gap-x-4 text-gray-500">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button type="button">
                              <RiDeleteBin6Line className="text-md lg:text-2xl hover:text-red-800" />
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
                                onClick={() => deleteTask(item.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
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
    </div>
  );
};

export default FilteredTodo;
