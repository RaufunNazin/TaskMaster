/* eslint-disable no-unused-vars */
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
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

const Sidebar = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showcategories, setShowcategories] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [Categories, setCategories] = useState([
    { title: "Important", value: "important" },
    { title: "Personal", value: "personal" },
    { title: "Work", value: "work" },
  ]);

  const createCategory = () => {
    const newCategory = {
      title: categoryTitle,
      value: categoryTitle.toLowerCase(),
    };
    setCategories([...Categories, newCategory]);
  };

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
        <Link to="/" onClick={closeSideBar} className="menu-item">
          Home
        </Link>
        <button
          onClick={() => setShowcategories((prev) => !prev)}
          className="flex"
        >
          <div>
            Categories <span className="rotate-90">{">"}</span>
          </div>
        </button>
        {showcategories && (
          <div className="ml-10">
            {Categories.map((category, i) => {
              return (
                <div>
                  <Link
                    key={i}
                    to="/"
                    onClick={closeSideBar}
                    className="menu-item"
                  >
                    {category.title}
                  </Link>
                </div>
              );
            })}
            <Dialog open={openDialog} onOpenChange={() => setOpenDialog(true)}>
              <DialogTrigger asChild onClick={closeSideBar}>
                <Button variant="outline">Add Category</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                    To better organize your tasks, create categories according
                    to your preferences.
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
          </div>
        )}
        <Link to="/" onClick={closeSideBar} className="menu-item">
          Profile
        </Link>
        <Link to="/" onClick={closeSideBar} className="menu-item">
          Settings
        </Link>
      </Menu>
    </div>
  );
};

export default Sidebar;
