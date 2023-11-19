import React, { useState } from "react";
import { CgDetailsMore } from "react-icons/cg";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api";
import { CloudCog } from "lucide-react";

const SidePanel = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [userCategory, setUserCategory] = useState([]);
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
    // Add the new category to the state.
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
          getCategory();
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else toast.error("Please enter a title for the category.");
  };

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
          {categories.length > 0 &&
            categories.map((category, i) => {
              return (
                <div className="w-full" onClick={() => navigate(category.path)}>
                  <MenuItem key={i} icon={category.icon}>
                    <div className="font-medium text-gray-700">
                      {category.title}
                    </div>
                  </MenuItem>
                </div>
              );
            })}
          {userCategory.length > 0 &&
            userCategory.map((category, i) => {
              return (
                <div className="w-full">
                  <MenuItem
                    key={category.id}
                    icon={<GiPin className="text-red-700" />}
                  >
                    <div className="font-medium text-gray-700">
                      {category.title}
                    </div>
                  </MenuItem>
                </div>
              );
            })}
          <div className="w-full" onClick={() => navigate("/completed")}>
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
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Friends and Families"
                    className="col-span-3"
                    onChange={(e) => setCategoryTitle(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => {
                    setOpenDialog(false);
                    createCategory();
                  }}
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
