import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { FcOk } from "react-icons/fc";
import { format } from "date-fns";
import {
  AiOutlineClockCircle,
  AiOutlineStar,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { RiDeleteBin6Line, RiInformationLine } from "react-icons/ri";
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

const Todo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pending, setPending] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const addTask = () => {
    if (title && date) {
      setTitle("");
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
      .get("/todo/0/10", {
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

  useEffect(() => {
    getTasks();
    if (localStorage.getItem("token") === null) {
      navigate("/login", { state: "redirected" });
    }
    if (location.state === "login") {
      toast.success("Logged in successfully");
    }
  }, []);

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
                          mode="single"
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
              {/* <Dialog
                open={openDialog}
                onOpenChange={() => {
                  setOpenDialog(true);
                }}
              >
                <DialogTrigger asChild>
                  <div className="lg:hidden text-gray-800 text-5xl fixed bottom-5 right-5">
                    <MdAddCircleOutline />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        placeholder="Friends and Families"
                        className="col-span-3"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Due Date
                      </Label>
                      <Popover
                        open={calendarOpenMobile}
                        onOpenChange={() => {
                          setCalendarOpenMobile(true);
                          setOpenDialog(true);
                        }}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={`w-full col-span-3 text-sm justify-center text-left font-normal ${
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
                          <div className="flex m-1">
                            <div className="flex-1"></div>
                            <PopoverClose>
                              <MdAddCircleOutline
                                size={24}
                                className="text-primary/60 hover:text-destructive"
                              />
                            </PopoverClose>
                          </div>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              console.log(newDate);
                              setDate(newDate);
                              setOpenDialog(true);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={() => {
                        setOpenDialog(false);
                        addTask();
                      }}
                    >
                      Create
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog> */}
              <div className="flex flex-col gap-y-2 p-4">
                {pending.length > 0 ? (
                  pending.map((item) => {
                    return (
                      <button
                        type="button"
                        key={item.id}
                        draggable="true"
                        className="shadow-md py-3 rounded-sm bg-white px-4 lg:px-10 flex justify-between items-center gap-x-3"
                      >
                        <div>
                          <p className="text-sm lg:text-xl text-left whitespace-normal break-all overflow-hidden">
                            {item.title}
                          </p>
                          <div className="text-sm text-gray-500 flex items-center gap-x-1">
                            <AiOutlineClockCircle />
                            {item.targetDate && item.targetDate.slice(0, 10)}
                          </div>
                        </div>
                        <div className="flex gap-x-2 lg:gap-x-4 text-gray-500">
                          <button>
                            <RiInformationLine className="text-md lg:text-2xl hover:text-blue-600" />
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
                                  Task Completed?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will mark
                                  your task as completed
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => completeTask(item.id)}
                                >
                                  Done
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
