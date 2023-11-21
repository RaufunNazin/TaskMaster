/* eslint-disable no-unused-vars */
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AiFillStar } from "react-icons/ai";
import { BsFillPersonFill, BsClipboardCheck } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { GiPin } from "react-icons/gi";
import { MdWork, MdOutlineAdd } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../api";
import { Trash } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userCategory, setUserCategory] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const categoryChange = localStorage.getItem("categoryChange");
  const categoryChangeBoolean = categoryChange === "true";

  const getCategory = () => {
    api
      .get("/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUserCategory([...res.data]))
      .catch((err) => console.log(err));
  };

  const createCategory = () => {
    if (categoryTitle) {
      api
        .post(
          "/category",
          {
            title: categoryTitle,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          toast.success("Category created");
          const toggledValue = !categoryChangeBoolean;
          localStorage.setItem("categoryChange", toggledValue.toString());
          getCategory();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else toast.error("Please enter a title for the category.");
  };

  const deleteCategory = (id) => {
    api
      .delete(`/category/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        const toggledValue = !categoryChangeBoolean;
        localStorage.setItem("categoryChange", toggledValue.toString());
        getCategory();
        navigate("/", { state: "categoryDeleted" });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <div
      className={`${
        location.pathname === "/register" ||
        location.pathname === "/login" ||
        location.pathname === "*"
          ? "hideButton"
          : ""
      }`}
    >
      <Menu right isOpen={isOpen} onOpen={handleIsOpen} onClose={handleIsOpen}>
        <div
          onClick={() => {
            if (location.pathname !== "/") navigate("/");
            closeSideBar();
          }}
          className={`w-full flex items-center gap-x-2`}
        >
          <BsClipboardCheck className="inline mr-2 text-gray-800 text-xl pb-0.5" />
          <div className="menu-item inline font-medium text-gray-700">
            All Tasks
          </div>
        </div>
        {userCategory.map((category) => {
          return (
            <div
              key={category.id}
              className={`w-full flex justify-between items-center gap-x-2`}
            >
              <div
                className="inline"
                onClick={() => {
                  if (location.pathname !== `/todo/${category.title}`)
                    navigate(`/todo/${category.title}`, {
                      state: category.id,
                    });
                  closeSideBar();
                }}
              >
                {category.title === "Important" ? (
                  <AiFillStar className="inline mr-2 text-yellow-500 text-xl pb-0.5" />
                ) : category.title === "Work" ? (
                  <MdWork className="inline mr-2 text-amber-950 text-xl pb-0.5" />
                ) : category.title === "Personal" ? (
                  <BsFillPersonFill className="inline mr-2 text-blue-500 text-xl pb-0.5" />
                ) : (
                  <GiPin className="inline mr-2 text-red-700 text-xl pb-0.5" />
                )}
                <div className="menu-item inline font-medium text-gray-700">
                  {category.title}
                </div>
              </div>
              {category.title !== "Important" &&
                category.title !== "Work" &&
                category.title !== "Personal" && (
                  <div className="inline ml-5" onClick={closeSideBar}>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button type="button">
                          <Trash className="w-3 h-3 text-red-800" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your category
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteCategory(category.id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
            </div>
          );
        })}
        <div
          onClick={() => {
            if (location.pathname !== "/completed") navigate("/completed");
            closeSideBar();
          }}
          className={`w-full flex items-center gap-x-2`}
        >
          <BsCheck2Circle className="inline mr-2 text-green-600 text-xl pb-0.5" />
          <div className="menu-item inline font-medium text-gray-700">
            Completed Tasks
          </div>
        </div>
        <hr className="my-6" />
        <Dialog
          open={openDialog}
          onOpenChange={() => {
            setOpen(false);
            setOpenDialog((prev) => !prev);
          }}
        >
          <DialogTrigger asChild>
            <div className="flex items-center gap-x-2">
              <MdOutlineAdd className="inline text-blue-600 text-xl pb-0.5" />
              <div className="menu-item inline font-normal text-blue-600">
                New Category
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>
                To better organize your tasks, create categories according to
                your preferences.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Input
                id="title"
                placeholder="Category title"
                onChange={(e) => setCategoryTitle(e.target.value)}
                className="mt-5"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => {
                  setOpenDialog(false);
                  createCategory();
                }}
                className="w-full"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Menu>
    </div>
  );
};

export default Sidebar;
