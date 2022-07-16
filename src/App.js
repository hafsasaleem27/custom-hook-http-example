import React, { useEffect, useState } from "react";
import useTasks from "./hooks/use-tasks";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";

function App() {
  const [tasks, setTasks] = useState([]);

  const [isLoading, error, handleTasks] = useTasks();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }
    };

    handleTasks({
      url: "https://react-http-fe5e1-default-rtdb.firebaseio.com/tasks.json"
    }, transformTasks);
  }, [handleTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={handleTasks}
      />
    </React.Fragment>
  );
}

export default App;
