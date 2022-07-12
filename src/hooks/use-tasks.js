import React, { useState } from "react";

const useTasks = async (url, method) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);

  setIsLoading(true);
  setError(null);
  if (method === "GET") {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      const loadedTasks = [];

      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
    } catch (err) {
        setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }
};

export default useTasks;
