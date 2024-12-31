import { createContext, useState, useContext, useMemo } from "react";
import mock from "./assets/mock.json";

// Create the context
const CVContext = createContext();

if (localStorage.getItem("cv") === null) {
  localStorage.setItem("cv", JSON.stringify(mock));
}

const data = JSON.parse(localStorage.getItem("cv") ?? JSON.stringify(mock));

// Create a provider component
export const CVProvider = ({ children }) => {
  const [stack, setStack] = useState([data]);
  const [future, setFuture] = useState([]);

  const cv = useMemo(() => stack[stack.length - 1], [stack]);

  const update = (newData) => {
    // Compare current CV data with the new data
    if (JSON.stringify(cv) === JSON.stringify(newData)) {
      console.log("No changes detected. Skipping update.");
      return;
    }

    console.log("Updating CV:", newData);
    localStorage.setItem("cv", JSON.stringify(newData));
    setStack([...stack, newData]);
    setFuture([]); // Clear future states after a new update
  };

  const undo = () => {
    if (stack.length > 1) {
      console.log("UNDO");
      setFuture([stack[stack.length - 1], ...future]);
      setStack(stack.slice(0, stack.length - 1));
    }
  };

  const redo = () => {
    if (future.length > 0) {
      setStack([...stack, future[0]]);
      setFuture(future.slice(1));
    }
  };

  return (
    <CVContext.Provider value={{ cv, update, undo, redo }}>
      {children}
    </CVContext.Provider>
  );
};

// Create a custom hook for using the CVContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCV = () => {
  return useContext(CVContext);
};
