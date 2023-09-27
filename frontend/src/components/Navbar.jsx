import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "../ui/menubar";
import React from "react";

function MenubarDemo() {
  return (
    <div className="flex justify-between items-center border-b bg-gray-100 border-b-black py-2 px-4 lg:p-4 lg:px-24">
      <button
        className="font-black text-2xl text-black"
        onClick={() => (window.location.pathname = "/")}
      >
        TaskMaster
      </button>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger
            onClick={() => (window.location.pathname = "/")}
            className="cursor-pointer"
          >
            Srizon
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer">Login</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => (window.location.pathname = "/login")}>
              Using Email-Password
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Using social media</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Google</MenubarItem>
                <MenubarItem>Facebook</MenubarItem>
                <MenubarItem>Github</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default MenubarDemo;
