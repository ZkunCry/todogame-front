import React, { useState } from "react";
import Header from "components/Header";
import MainContent from "components/Maincontent";
import Button from "components/Button";

import "styleComponents/MainPage.css";
import "styleComponents/Main.css";
import account from "images/account.svg";
import search from "images/search.svg";
import { useSelector } from "react-redux";
import { getTodos } from "store/slice/todos";
import { selectCurrentUser } from "store/slice/auth";
import NewTask from "components/todo/NewTask";
import TodoList from "components/todo/TodoList";

const Main = () => {
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const tasks = [
    { title: "test", description: "test" },
    { title: "test2", description: "test2" },
  ];

  console.log("render");
  return (
    <div className="main-page">
      <div className={"main-page__inner container"}>
        <Header burger={true}>
          <div className="header-inner__profile">
            <Button buttonClassName={"profile__search"}>
              <img alt="#" src={search} />
            </Button>
            <Button buttonClassName={"profile__account"}>
              <img alt="#" src={account} />
            </Button>
          </div>
        </Header>
        <MainContent contentClassName={"main-page"} addTask={true}>
          <h1 className="content-header content-header_gradient">
            {"Hello," + user}
          </h1>
          <div className="categories">
            <div className="section-name">Categories</div>
            <div className="categories__inner">
              <Button buttonClassName={"category__button"}>
                <div className="category-button__header">{"lol"}</div>
                <div className="category-button__inner">{"kek"}</div>
              </Button>
            </div>
          </div>
          <TodoList />
          {/* <div className="tasks">
            <div className="section-name">Tasks</div>
            {tasks.map((value) => {
              return (
                <Task key={value.title} title={value.title}>
                  {value.description}
                </Task>
              );
            })}
          </div> */}
          <NewTask setOpen={setOpen} open={open} />
          <Button onClick={handleOpen} buttonClassName={"content-create-task"}>
            <span></span>
            <span></span>
          </Button>
        </MainContent>
      </div>
    </div>
  );
};
export default Main;
