import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { FcOk } from "react-icons/fc";
import { format, parseISO } from "date-fns";
import {
  AiOutlineClockCircle,
  AiOutlineStar,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheck2Circle, BsCheck2 } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
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
import { Button } from "./ui/button";
import { BiChevronsRight } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import api from "./api";
import { CiEdit } from "react-icons/ci";

const Todo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pending, setPending] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [task, setTask] = useState({});
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDate, setUpdateDate] = useState(null);
  const [updateCalendarOpen, setUpdateCalendarOpen] = useState(false);

  const today = new Date();
  const beforeToday = { before: today };

  const addTask = () => {
    if (title && date) {
      setTitle("");
      setDate("");
      api
        .post(
          "/todo",
          {
            title: title,
            targetDate: date,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 201) {
            toast.success("Task added");
            getTasks();
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else if (!title) toast.error("Please enter a title");
    else if (!date) toast.error("Please select a date");
  };

  const getTasks = () => {
    api
      .get("/todo/0/1000", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setPending(
            [...res.data].filter((task) => task.isCompleted === false)
          );
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

  const completeTask = (id) => {
    api
      .put(
        `/todo/${id}/markcomplete`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Task marked as completed");
          getTasks();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const getTask = (id) => {
    api
      .get(`/todo/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setTask(res.data);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const updateTask = (id) => {
    api
      .put(
        `/todo/${id}`,
        {
          title: updateTitle ? updateTitle : task.title,
          targetDate: updateDate ? updateDate : task.targetDate,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Task updated");
          setTask({});
          setUpdateTitle("");
          setUpdateDate("");
          getTasks();
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getTasks();
    if (localStorage.getItem("token") === null) {
      navigate("/login", { state: "redirected" });
    }
    if (location.state === "login") {
      toast.success(`Welcome, ${localStorage.getItem("user")}!`);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen max-w-screen">
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
      <div className="flex flex-1 relative">
        <SidePanel />
        <div className="flex flex-col w-full">
          <div className="bg-gray-50 pt-4 lg:pt-8 px-4 lg:px-12 flex gap-x-2 items-center">
            <p className="text-lg lg:text-2xl">All Tasks</p>
            <BiChevronsRight className="text-md lg:text-xl" />
          </div>
          <div className="grid grid-cols-1 gap-x-24 pt-4 lg:pt-8 px-2 lg:px-12 bg-gray-50 flex-1">
            <div>
              <div className="lg:flex lg:flex-col gap-y-2 p-4">
                <div className="shadow-md py-6 rounded-md bg-white px-4 lg:px-10 lg:flex gap-x-4 items-center">
                  <input
                    type="text"
                    value={title}
                    placeholder="Add new task"
                    className="w-full outline-none ring-0 border-none"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="flex gap-x-4 items-center justify-between mt-4 lg:mt-0">
                    <Popover
                      open={calendarOpen}
                      onOpenChange={() => setCalendarOpen(true)}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-full lg:w-[280px] text-sm justify-center text-left font-normal ${
                            !date && "text-muted-foreground"
                          }`}
                        >
                          <AiTwotoneCalendar className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          defaultMonth={today}
                          mode="single"
                          disabled={beforeToday}
                          selected={date}
                          onSelect={(newDate) => {
                            setDate(newDate);
                            setCalendarOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={() => addTask()}
                    >
                      <BsCheck2 className="text-3xl text-blue-600 hover:text-blue-500" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 p-4">
                {pending.length > 0 ? (
                  pending.map((item) => {
                    const currentDate = new Date(item.targetDate);
                    currentDate.setDate(currentDate.getDate() + 1);
                    return (
                      <div>
                        <button
                          type="button"
                          key={item.id}
                          className={`${
                            task && task.id === item.id ? "hidden" : "block"
                          } w-full shadow-md py-3 rounded-sm bg-white px-4 lg:px-10 flex justify-between items-center gap-x-3`}
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
                            <button
                              type="button"
                              onClick={() => getTask(item.id)}
                            >
                              <CiEdit className="text-md lg:text-2xl hover:text-blue-600" />
                            </button>
                            <button>
                              <AiOutlineStar className="text-md lg:text-2xl hover:text-yellow-600" />
                            </button>
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
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <button type="button">
                                  <BsCheck2Circle className="text-md lg:text-2xl hover:text-green-600" />
                                </button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will mark your task as completed
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => completeTask(item.id)}
                                  >
                                    Complete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </button>
                        <div
                          className={`${
                            task && task.id === item.id ? "block" : "hidden"
                          }`}
                        >
                          <div className="shadow-md py-3 rounded-sm bg-white px-4 lg:px-10 lg:flex gap-x-4 items-center">
                            <input
                              type="text"
                              value={updateTitle ? updateTitle : task.title}
                              className="w-full outline-none ring-0 border-none"
                              onChange={(e) => setUpdateTitle(e.target.value)}
                            />
                            <div className="flex gap-x-4 items-center justify-between mt-4 lg:mt-0">
                              <Popover
                                open={updateCalendarOpen}
                                onOpenChange={() => setUpdateCalendarOpen(true)}
                              >
                                <PopoverTrigger asChild>
                                  <Button
                                    variant={"outline"}
                                    className={`w-full lg:w-[280px] text-sm justify-center text-left font-normal ${
                                      !task.targetDate &&
                                      "text-muted-foreground"
                                    }`}
                                  >
                                    <AiTwotoneCalendar className="mr-2 h-4 w-4" />
                                    {updateDate ? (
                                      format(updateDate, "PPP")
                                    ) : task.targetDate ? (
                                      format(parseISO(task.targetDate), "PPP")
                                    ) : (
                                      <span>Pick a Date</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                  <Calendar
                                    defaultMonth={today}
                                    mode="single"
                                    disabled={beforeToday}
                                    selected={updateDate}
                                    onSelect={(newDate) => {
                                      setUpdateDate(newDate);
                                      setUpdateCalendarOpen(false);
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <button
                                type="button"
                                className="cursor-pointer"
                                onClick={() => updateTask(item.id)}
                              >
                                <BsCheck2 className="text-3xl text-blue-600 hover:text-blue-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="shadow-md py-6 rounded-sm bg-white px-10 flex gap-x-4 items-center">
                    <FcOk className="text-2xl" />
                    <div>No Pending Tasks!</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
