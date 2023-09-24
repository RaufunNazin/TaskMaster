import "./App.css";
import React from "react";
import Navbar from "./components/Navbar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import api from "./api";
import { useEffect } from "react";
import auth from "./auth";

const Home = () => {
    const [first, setFirst]  = useState(1);
    const [second, setSecond]= useState(0);
    const [result, setResult] = useState(0);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      auth
        .get("/users/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((res) => {
          console.log(res);
        });
    }, []);
  
    const getResultAdd = () => {
      setLoading(true);
      const dataToPost = new FormData();
      dataToPost.set("num1", first);
      dataToPost.set("num2", second);
      api.post("/add", dataToPost).then((res) => {
        setLoading(false);
        setResult(res.data.result);
      });
    };
    const getResultSub = () => {
      setLoading(true);
      const dataToPost = new FormData();
      dataToPost.set("num1", first);
      dataToPost.set("num2", second);
      api.post("/subtract", dataToPost).then((res) => {
        setLoading(false);
        setResult(res.data.result);
      });
    };
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-4 lg:mt-12 p-2">
        <Tabs defaultValue="add" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add">Add</TabsTrigger>
            <TabsTrigger value="subtract">
              Subtract
            </TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add numbers</CardTitle>
                <CardDescription>Enter your numbers below</CardDescription>
              </CardHeader>
              <CardContent className="gap-x-2 flex items-center">
                <div className="">
                  <Input
                    onChange={(e) => setFirst(parseInt(e.target.value))}
                    id="addfirst"
                    placeholder="first number"
                    defaultValue={first}
                  />
                </div>
                <div>+</div>
                <div className="">
                  <Input
                    onChange={(e) => setSecond(parseInt(e.target.value))}
                    id="addsecond"
                    placeholder="second number"
                    defaultValue={second}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    getResultAdd();
                  }}
                >
                  Calculate
                </Button>
                {result ? (
                  <div className="text-left text-xl">
                    Result: {loading ? "Calculating..." : result}
                  </div>
                ) : (
                  <div
                    className="text-left text-xl"
                  >
                    Result: 0
                  </div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="subtract">
            <Card>
              <CardHeader>
                <CardTitle>Subtract numbers</CardTitle>
                <CardDescription>Enter your numbers below</CardDescription>
              </CardHeader>
              <CardContent className="gap-x-2 flex items-center">
                <div className="">
                  <Input
                    onChange={(e) => setFirst(parseInt(e.target.value))}
                    id="subfirst"
                    placeholder="first number"
                    defaultValue={first}
                  />
                </div>
                <div>-</div>
                <div className="">
                  <Input
                    onChange={(e) => setSecond(parseInt(e.target.value))}
                    id="subsecond"
                    placeholder="second number"
                    defaultValue={second}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <Button
                  onClick={() => {
                    getResultSub();
                  }}
                >
                  Calculate
                </Button>
                {result ? (
                  <div data-testid="result" className="text-left text-xl">
                    Result: {loading ? "Calculating..." : result}
                  </div>
                ) : (
                  <div className="text-left text-xl">Result: 0</div>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
