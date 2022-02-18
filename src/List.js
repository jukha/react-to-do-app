import React from "react";
import { useState } from "react";
import Categories from "./Category";
import { MdOutlineDeleteOutline } from "react-icons/md";

const List = () => {
  const allCategories = ["all", "active", "completed"];
  const [selectedCat, setSelectedCat] = useState(0); // initially All category is selected
  const [input, setInput] = useState("");

  // all tasks
  const [allTasks, setAllTasks] = useState([]); //single task looks like {id, task, isCompleted}

  //active tasks
  const activeTasks = allTasks.filter((task) => !task.isCompleted);

  //completed tasks
  let completedTasks = allTasks.filter((task) => task.isCompleted);

  //which task to display
  let tasksToDisplay = null;
  if (selectedCat === 0) tasksToDisplay = allTasks;
  else if (selectedCat === 1) tasksToDisplay = activeTasks;
  else if (selectedCat === 2) tasksToDisplay = completedTasks;

  const addNewTask = () => {
    if (input) {
      const newTask = { id: Date.now(), task: input, isCompleted: false };
      setAllTasks((oldArray) => [...oldArray, newTask]);
      setInput("");
    }
  };

  //onclick on delete all move all tasks to alltasks
  const moveCompletedToAll = () => {
    completedTasks.map((task) => updateTask(task.id));
    completedTasks = [];
  };

  const updateTask = (taskId) => {
    const task = allTasks.find((task) => task.id === taskId); //find that particular task that needs to be updated
    task.isCompleted = !task.isCompleted;

    const otherTasks = allTasks.filter((task) => task.id !== taskId);
    const updated = [...otherTasks, task].sort((a, b) => a.id - b.id);
    setAllTasks(updated);
  };

  return (
    <article>
      <Categories categories={allCategories} onChange={setSelectedCat} />
      <hr />
      {selectedCat !== 2 ? (
        <div className="input">
          <input
            type="text"
            placeholder="add details"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn" onClick={addNewTask}>
            Add
          </button>
        </div>
      ) : (
        ""
      )}

      {tasksToDisplay.map((task, index) => {
        return (
          <article>
            <div className="checkbox flex-container" key={task.id}>
              <div>
                <input
                  id="checkbox"
                  type="checkbox"
                  key={index}
                  defaultChecked={task.isCompleted}
                  onChange={() => updateTask(task.id)}
                />
                <label
                  className={task.isCompleted ? "completed" : ""}
                  htmlFor="checkbox"
                >
                  {task.task}
                </label>
              </div>
              {selectedCat === 2 ? (
                <div>
                  <MdOutlineDeleteOutline
                    className="icon"
                    onClick={() => updateTask(task.id)}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </article>
        );
      })}
      {selectedCat === 2 && completedTasks.length !== 0 ? (
        <div className="delete">
          <div className="delete-btn" onClick={moveCompletedToAll}>
            <MdOutlineDeleteOutline />
            <span>delete all</span>
          </div>
        </div>
      ) : (
        ""
      )}
    </article>
  );
};

export default List;
