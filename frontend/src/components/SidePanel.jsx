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
import { Link } from "react-router-dom";

const SidePanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categories, setCategories] = useState([
    {
      title: "All Tasks",
      icon: <BsClipboardCheck className="text-gray-800" />,
    },
    {
      title: "Important",
      icon: <AiFillStar className="text-yellow-500" />,
    },
    {
      title: "Personal",
      icon: <BsFillPersonFill className="text-blue-500" />,
    },
    {
      title: "Work",
      icon: <MdWork className="text-amber-950" />,
    },
  ]);

  const createCategory = () => {
    // You can provide your own icon for the new category.
    const newCategory = {
      title: categoryTitle,
      icon: <GiPin className="text-red-700" />,
    };

    // Add the new category to the state.
    setCategories([...categories, newCategory]);
  };

  return (
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
              <MenuItem key={i} icon={category.icon}>
                <span className="font-medium text-gray-700">
                  {category.title}
                </span>
              </MenuItem>
            );
          })}
        <MenuItem icon={<BsCheck2Circle className="text-green-600" />}>
          <Link to="/completed" className="font-medium text-gray-700">
            Completed Tasks
          </Link>
        </MenuItem>
        <hr className="my-6" />
        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(true)}>
          <DialogTrigger asChild>
            <MenuItem icon={<MdOutlineAdd className="text-blue-600 text-xl" />}>
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
  );
};

export default SidePanel;
