/* eslint-disable no-unused-vars */
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { AiFillStar } from "react-icons/ai";
import { BsFillPersonFill, BsClipboardCheck } from "react-icons/bs";
import { BsCheck2Circle } from "react-icons/bs";
import { GiPin } from "react-icons/gi";
import { MdWork, MdOutlineAdd } from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "All Tasks",
      icon: (
        <BsClipboardCheck className="inline mr-2 text-gray-800 text-xl pb-0.5" />
      ),
      path: "/",
    },
    {
      id: 2,
      title: "Important",
      icon: (
        <AiFillStar className="inline mr-2 text-yellow-500 text-xl pb-0.5" />
      ),
      path: "/important",
    },
    {
      id: 3,
      title: "Personal",
      icon: (
        <BsFillPersonFill className="inline mr-2 text-blue-500 text-xl pb-0.5" />
      ),
      path: "/personal",
    },
    {
      id: 4,
      title: "Work",
      icon: <MdWork className="inline mr-2 text-amber-950 text-xl pb-0.5" />,
      path: "/work",
    },
  ]);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const createCategory = () => {
    // You can provide your own icon for the new category.
    const newCategory = {
      title: categoryTitle,
      icon: <GiPin className="text-red-700" />,
    };

    // Add the new category to the state.
    setCategories([...categories, newCategory]);
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
        {categories.map((category) => {
          return (
            <div key={category.id} onClick={closeSideBar}>
              {category.icon}
              <Link
                to={category.path}
                className="menu-item font-medium text-gray-700"
              >
                {category.title}
              </Link>
            </div>
          );
        })}
        <div onClick={closeSideBar}>
          <BsCheck2Circle className="inline mr-2 text-green-600 text-xl pb-0.5" />
          <Link to="/completed" className="menu-item font-medium text-gray-700">
            Completed Tasks
          </Link>
        </div>
        <hr className="my-6" />
        {/* <Dialog
          open={openDialog}
          onOpenChange={() => {
            setOpen(false);
            setOpenDialog(true);
          }}
        >
          <DialogTrigger asChild>
            <div>
              <MdOutlineAdd className="inline mr-2 text-blue-600 text-xl pb-0.5" />
              <Link
                to="/completed"
                className="menu-item font-medium text-blue-600"
              >
                New Category
              </Link>
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
        </Dialog> */}
      </Menu>
    </div>
  );
};

export default Sidebar;
