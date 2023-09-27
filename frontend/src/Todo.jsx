import Navbar from "./components/Navbar";
import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { FcOk } from "react-icons/fc";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiTwotoneCalendar } from "react-icons/ai";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Todo = () => {
  const [dragItemId, setDragItemId] = useState(null);
  const [pending, setPending] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [calendar, setCalendar] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarOpen1, setCalendarOpen1] = useState(false);

  const addTask = () => {
    const newTask = {
      title: title,
      description: description,
      date: date,
    };
    if (title) {
      // setPending((prevItems) => [...prevItems, newTask]);
      console.log(date);
      setTitle("");
      setDescription("");
      setDate(new Date());
    } else toast.error("Please enter a title");
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
              <Input
                id="title"
                type="text"
                value={title}
                className="col-span-3"
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
              <Textarea
                id="description"
                type="text"
                value={description}
                className="col-span-3"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="w-1/3 mx-auto border-2 text-sm text-white bg-sky-500 hover:bg-sky-400 transition-all duration-300 py-2 rounded-md">
                Add New Task
              </button>
            </div>
          </TabsContent>
          <TabsContent value="pending">
            <div>
              <div className="rounded-t-xl text-center bg-gradient-to-b from-yellow-500 to-yellow-300 text-black py-3 font-medium">
                Pending Tasks
              </div>
              <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-4">
                {pending.length > 0 ? (
                  pending.map((item, i) => {
                    return (
                      <div
                        key={i}
                        placeholder="Title"
                        className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-yellow-400"
                      >
                        {item.title}
                      </div>
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
              <div className="flex flex-col gap-y-6 bg-gradient-to-b from-gray-100 to-gray-200 rounded-b-xl p-4">
                {completed.length > 0 ? (
                  completed.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-green-600"
                      >
                        {item.title}
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
                  <div
                    key={i}
                    draggable="true"
                    onDragStart={(e) => onDragStart(e, i)}
                    style={{
                      backgroundColor: "white", // Example background color
                      cursor: "grab", // Set the cursor style to indicate it's draggable
                    }}
                    className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-yellow-400"
                  >
                    {item.title} {/* Render the title property */}
                  </div>
                );
              })
            ) : (
              <div className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-yellow-400 flex gap-x-4 items-center">
                <FcOk className="text-2xl animate-pulse" />
                <div>All Caught Up!</div>
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
                    className="shadow-md py-6 rounded-md bg-white px-4 border-l-4 border-green-600"
                  >
                    {item.title}
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
  );
};

export default Todo;
