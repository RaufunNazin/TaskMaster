import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Todo from "./Todo";
function App() {

  return (
    <div>
      <BrowserRouter>
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
  );
}

export default App;
