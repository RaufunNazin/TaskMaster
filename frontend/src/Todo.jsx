import Navbar from "./components/Navbar";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { FcOk } from "react-icons/fc";
import {
  AiOutlineClockCircle,
  AiOutlineStar,
  AiTwotoneCalendar,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgDetailsMore } from "react-icons/cg";
import { BsCheck2Circle } from "react-icons/bs";
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

const Todo = () => {
  const [dragItemId, setDragItemId] = useState(null);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarOpen1, setCalendarOpen1] = useState(false);

  const addTask = () => {
    const newTask = {
      title: title,
      description: description,
      date: date.toString().slice(3, 15),
    };
    if (title) {
      setPending((prevItems) => [...prevItems, newTask]);
      setTitle("");
      setDescription("");
    } else toast.error("Please enter a title");
  };

  const deleteTask = (index) => {
    // Create a copy of the pending array
    const updatedPending = [...pending];
    // Remove the item at the specified index
    updatedPending.splice(index, 1);
    // Update the state with the modified array
    setPending(updatedPending);
  };

  // Function to mark a task as completed
  const completeTask = (index) => {
    const updatedPending = [...pending];
    const completedItem = pending[index]; // Get the task to mark as completed
    updatedPending.splice(index, 1); // Remove from pending
    setPending(updatedPending);
    setCompleted([...completed, completedItem]); // Add to completed
  };

  const deleteCompletedTask = (index) => {
    // Create a copy of the pending array
    const updatedCompleted = [...completed];
    // Remove the item at the specified index
    updatedCompleted.splice(index, 1);
    // Update the state with the modified array
    setCompleted(updatedCompleted);
  };

  const onDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", "div"); // Required for drag-and-drop to work
    setDragItemId(id);
  };
  const onDragOver = (e) => {
    e.preventDefault();
  };
  const onDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");
    if (draggedItem === "div") {
      const updatedPending = [...pending];
      const completedItem = pending[dragItemId]; // Get the dragged item
      updatedPending.splice(dragItemId, 1); // Remove from pending
      setPending(updatedPending);
      setCompleted([...completed, completedItem]); // Add to completed
    }
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
        theme="colored"
      />
      <Navbar />

      <div className="pt-8 bg-gray-50 flex-1 lg:hidden">
        <Tabs defaultValue="pending" className="w-full px-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add">Add Task</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <div className="rounded-t-xl text-center bg-gradient-to-b from-sky-600 to-sky-400 text-black py-3 font-medium">
              Add Task
            </div>
            <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-4">
              <div className="grid grid-cols-6 gap-x-4 items-center">
                <Input
                  id="title"
                  type="text"
                  value={title}
                  className="col-span-5"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Popover
                  open={calendarOpen1}
                  onOpenChange={() => setCalendarOpen1(true)}
                >
                  <PopoverTrigger asChild>
                    <button className="flex h-full justify-center items-center bg-white rounded-lg border border-slate-400">
                      <AiTwotoneCalendar className="text-2xl" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setCalendarOpen1(false);
                      }}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea
                id="description"
                type="text"
                value={description}
                className="col-span-3"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                onClick={addTask}
                className="w-2/3 mx-auto border-2 text-xl text-white bg-sky-500 hover:bg-sky-400 transition-all duration-300 py-2 rounded-md"
              >
                Add New Task
              </button>
            </div>
          </TabsContent>
          <TabsContent value="pending">
            <div>
              <div className="rounded-t-xl text-center bg-gradient-to-b from-yellow-500 to-yellow-300 text-black py-3 font-medium">
                Pending Tasks
              </div>
              <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-2">
                {pending.length > 0 ? (
                  pending.map((item, i) => {
                    return (
                      <button
                        type="button"
                        key={i}
                        draggable="true"
                        onDragStart={(e) => onDragStart(e, i)}
                        className="shadow-md py-4 rounded-md bg-white px-4 border-l-4 border-yellow-400 flex justify-between items-center"
                      >
                        <div>
                          <div className="text-2xl text-left">{item.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-x-1">
                            <AiOutlineClockCircle />
                            {item.date && item.date}
                          </div>
                        </div>
                        <div className="flex gap-x-2 text-gray-500">
                          <button>
                            <CgDetailsMore className="text-2xl hover:text-blue-600" />
                          </button>
                          <button>
                            <AiOutlineStar className="text-2xl hover:text-yellow-600" />
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
                                  onClick={() => deleteTask(i)}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <button type="button">
                                <BsCheck2Circle className="text-2xl hover:text-green-600" />
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
                                  onClick={() => completeTask(i)}
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
                  <div
                    placeholder="Title"
                    className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-yellow-400 flex gap-x-4 items-center"
                  >
                    <FcOk className="text-2xl animate-pulse" />
                    <div>All Caught Up!</div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="completed">
            <div>
              <div className="rounded-t-xl text-center bg-gradient-to-b from-green-600 to-green-400 outline-1 py-3 font-medium">
                Completed Tasks
              </div>
              <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-2">
                {completed.length > 0 ? (
                  completed.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="shadow-md py-4 rounded-md bg-white px-4 border-l-4 border-green-600 flex justify-between items-center"
                      >
                        <div>
                          <div className="text-2xl text-left">{item.title}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-x-1">
                            <AiOutlineClockCircle />
                            {item.date && item.date}
                          </div>
                        </div>
                        <div className="flex gap-x-2 text-gray-500">
                          <button>
                            <CgDetailsMore className="text-2xl hover:text-blue-600" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteCompletedTask(i)}
                          >
                            <RiDeleteBin6Line className="text-2xl hover:text-red-800" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-green-600 flex gap-x-4 items-center">
                    <AiOutlineClockCircle className="text-2xl text-yellow-500 animate-pulse" />
                    <div>Yet to Complete a Task!</div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex flex-1">
        <SidePanel />
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-24 pt-8 px-12 bg-gray-50 flex-1 hidden">
          <div>
            <div className="rounded-t-xl text-center bg-gradient-to-b from-sky-600 to-sky-400 text-black py-3 font-medium">
              Add Task
            </div>
            <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-4">
              <div className="grid grid-cols-6 gap-x-4 items-center">
                <Input
                  id="title"
                  type="text"
                  value={title}
                  className="col-span-5"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Popover
                  open={calendarOpen}
                  onOpenChange={() => setCalendarOpen(true)}
                >
                  <PopoverTrigger asChild>
                    <button className="flex h-full justify-center items-center bg-white rounded-lg border border-slate-400">
                      <AiTwotoneCalendar className="text-2xl" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setCalendarOpen(false);
                      }}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Textarea
                id="description"
                type="text"
                value={description}
                className="col-span-3"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <button
                onClick={addTask}
                className="w-1/3 mx-auto border-2 text-xl text-white bg-sky-500 hover:bg-sky-400 transition-all duration-300 py-2 rounded-md"
              >
                Add New Task
              </button>
            </div>
          </div>
          <div>
            <div className="rounded-t-xl text-center bg-gradient-to-b from-yellow-500 to-yellow-300 text-black py-3 font-medium">
              Pending Tasks
            </div>
            <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-4">
              {pending.length > 0 ? (
                pending.map((item, i) => {
                  return (
                    <button
                      type="button"
                      key={i}
                      draggable="true"
                      onDragStart={(e) => onDragStart(e, i)}
                      className="shadow-md py-4 rounded-md bg-white px-4 border-l-4 border-yellow-400 flex justify-between items-center"
                    >
                      <div>
                        <div className="text-2xl text-left">{item.title}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-x-1">
                          <AiOutlineClockCircle />
                          {item.date && item.date}
                        </div>
                      </div>
                      <div className="flex gap-x-2 text-gray-500">
                        <button>
                          <CgDetailsMore className="text-2xl hover:text-blue-600" />
                        </button>
                        <button>
                          <AiOutlineStar className="text-2xl hover:text-yellow-600" />
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
                              <AlertDialogAction onClick={() => deleteTask(i)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button type="button">
                              <BsCheck2Circle className="text-2xl hover:text-green-600" />
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
                                onClick={() => completeTask(i)}
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
                <div className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-yellow-400 flex gap-x-4 items-center">
                  <FcOk className="text-2xl animate-pulse" />
                  <div>No Pending Tasks!</div>
                </div>
              )}
            </div>
          </div>
          <div onDragOver={onDragOver} onDrop={onDrop}>
            <div className="rounded-t-xl text-center bg-gradient-to-b from-green-600 to-green-400 outline-1 py-3 font-medium">
              Completed Tasks
            </div>
            <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-4">
              {completed.length > 0 ? (
                completed.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="shadow-md py-4 rounded-md bg-white px-4 border-l-4 border-green-600 flex justify-between items-center"
                    >
                      <div>
                        <div className="text-2xl text-left">{item.title}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-x-1">
                          <AiOutlineClockCircle />
                          {item.date && item.date}
                        </div>
                      </div>
                      <div className="flex gap-x-2 text-gray-500">
                        <button>
                          <CgDetailsMore className="text-2xl hover:text-blue-600" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCompletedTask(i)}
                        >
                          <RiDeleteBin6Line className="text-2xl hover:text-red-800" />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-green-600 flex gap-x-4 items-center">
                  <AiOutlineClockCircle className="text-2xl text-yellow-500 animate-pulse" />
                  <div>Yet to Complete a Task!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
