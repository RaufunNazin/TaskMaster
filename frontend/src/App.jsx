import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <div className="App font-body" id="outer-container">
      <div id="page-wrap">
        <BrowserRouter>
          <Sidebar
            id="sidebar"
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
          <Routes>
            <Route path="/">
              <Route index element={<Todo />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="todo" element={<Todo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
