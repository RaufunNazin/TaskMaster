import React, { useEffect, useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { AiFillStar } from "react-icons/ai";
import { BsFillPersonFill, BsClipboardCheck } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { GiPin } from "react-icons/gi";
import { MdWork, MdOutlineAdd } from "react-icons/md";
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
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import { Trash } from "lucide-react";

const SidePanel = ({ onCategoryChange, path }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [userCategory, setUserCategory] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState("");
  const [categories, setCategories] = useState([
    {
      title: "All Tasks",
      icon: <BsClipboardCheck className="text-gray-800" />,
      path: "/",
    },
    {
      title: "Important",
      icon: <AiFillStar className="text-yellow-500" />,
      path: "/important",
    },
    {
      title: "Personal",
      icon: <BsFillPersonFill className="text-blue-500" />,
      path: "/personal",
    },
    {
      title: "Work",
      icon: <MdWork className="text-amber-950" />,
      path: "/work",
    },
  ]);

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
        .then((res) => {
          toast.success("Category created");
          onCategoryChange((prev) => !prev);
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
      .then((res) => {
        toast.success("Category deleted");
        onCategoryChange((prev) => !prev);
        getCategory();
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="hidden lg:block">
      <Sidebar collapsed={collapsed}>
        <Menu>
          <MenuItem>
            <div
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            >
              <div
                className={`flex transition-all duration-300 justify-${
                  collapsed ? "center" : "end"
                } flex-1`}
              >
                <CgDetailsMore
                  className={`transition-all duration-300 rotate-180 ${
                    collapsed ? "rotate-0" : ""
                  }`}
                />
              </div>
            </div>
          </MenuItem>
          {!collapsed && (
            <div className="text-sm text-gray-400 ml-6 font-bold my-2">
              Categories
            </div>
          )}
          <div
            className={`w-full ${path === "/" ? "bg-blue-100" : ""}`}
            onClick={() => {
              if (path !== "/") navigate("/");
            }}
          >
            <MenuItem icon={<BsClipboardCheck className="text-gray-800" />}>
              <div className="font-medium text-gray-700">All Tasks</div>
            </MenuItem>
          </div>
          {userCategory.length > 0 &&
            userCategory.map((category) => {
              return (
                <div
                  key={category.id}
                  className={`w-full ${
                    path === category.title ? "bg-blue-100" : ""
                  }`}
                  onMouseEnter={() => setHoveredCategory(category.title)}
                  onMouseLeave={() => setHoveredCategory("")}
                  onClick={() => {
                    if (path !== `/todo/${category.title}`)
                      navigate(`/todo/${category.title}`);
                  }}
                >
                  <MenuItem
                    icon={
                      category.title === "Important" ? (
                        <AiFillStar className="text-yellow-500" />
                      ) : category.title === "Work" ? (
                        <MdWork className="text-amber-950" />
                      ) : category.title === "Personal" ? (
                        <BsFillPersonFill className="text-blue-500" />
                      ) : (
                        <GiPin className="text-red-700" />
                      )
                    }
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-700">
                        {category.title}
                      </div>
                      {hoveredCategory === category.title && (
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button type="button">
                              <Trash className="w-3 h-3 hover:text-red-800" />
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your category
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
                      )}
                    </div>
                  </MenuItem>
                </div>
              );
            })}
          <div
            className={`w-full ${path === "Completed" ? "bg-blue-100" : ""}`}
            onClick={() => {
              if (path !== "/todo/Completed") navigate("/todo/Completed");
            }}
          >
            <MenuItem icon={<BsCheck2Circle className="text-green-600" />}>
              <div className="font-medium text-gray-700">Completed Tasks</div>
            </MenuItem>
          </div>

          <hr className="my-6" />
          <Dialog
            open={openDialog}
            onOpenChange={() => setOpenDialog((prev) => !prev)}
          >
            <DialogTrigger asChild>
              <MenuItem
                icon={<MdOutlineAdd className="text-blue-600 text-xl" />}
              >
                <span className="font-normal text-blue-600 cursor-pointer">
                  New Category
                </span>
              </MenuItem>
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
                  className="mt-5"
                  onChange={(e) => setCategoryTitle(e.target.value)}
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
      </Sidebar>
    </div>
  );
};

export default SidePanel;
