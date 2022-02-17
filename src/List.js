import React from "react";
import { useState } from "react";
import Categories from "./Category";
import Modal from "./Modal";

const List = () => {
  const allCategories = ["all", "active", "completed"];
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [task, setTask] = useState(""); // single task
  const [checkTask, setCheckTask] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    
  };

  // multiple inputs

  const filterItems = (category) => {
    if (category === "all") {
    }
  };

  const addActiveTask = () => {
    if (task) {
      setActiveTasks((oldArray) => [...oldArray, task]);
      setTask("");
    } else {
      setShowModal(!showModal);
    }
  };
  const addCompletedTask = () => {
    setCompletedTasks((oldArray) => [...oldArray, task]);
    setCheckTask(!checkTask);
  };
  return (
    <article>
      {showModal && <Modal />}
      <Categories categories={allCategories} />
      <hr />
      <div className="input">
        <input
          type="text"
          placeholder="add details"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button className="btn" onClick={addActiveTask}>
          Add
        </button>
      </div>

      {activeTasks.map((item, index) => {
        return (
          <div className="checkbox" key={new Date().getTime().toString()}>
            <input
              key={index}
              type="checkbox"
              defaultChecked={checkTask}
              onChange={() => setCheckTask(!checkTask)}
              // onClick={addCompletedTask}
            />
            <label className={checkTask && "completed"} htmlFor="vehicle1">
              {item}
            </label>
          </div>
        );
      })}
    </article>
  );
};

export default List;
