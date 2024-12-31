import { createContext, useState, useContext, useMemo } from "react";
import mock from "./assets/mock.json";
import alignArraysById from "./utils/alignArraysById";

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
      setFuture([stack[stack.length - 1], ...future]);
      setStack(stack.slice(0, stack.length - 1));
      localStorage.setItem(
        "cv",
        JSON.stringify(stack.slice(0, stack.length - 1))
      );
    }
  };

  const redo = () => {
    if (future.length > 0) {
      setStack([...stack, future[0]]);
      localStorage.setItem("cv", JSON.stringify(future[0]));
      setFuture(future.slice(1));
    }
  };

  const removeFromMainGroup = (id, groupId) => {
    const updatedCV = {
      ...cv,
      main: cv.main.map((el) =>
        el.id === groupId
          ? { ...el, data: el.data.filter((exp) => exp.id !== id) }
          : el
      ),
    };
    update(updatedCV);
  };

  const addItemToMainGroup = (item, groupId) => {
    const updatedCV = {
      ...cv,
      main: cv.main.map((el) =>
        el.id === groupId ? { ...el, data: [...el.data, item] } : el
      ),
    };
    update(updatedCV);
  };

  const updateMainGroup = (blocks, groupId) => {
    const group = cv.main.find((el) => el.id === groupId).data;

    // Align the blocks with the current group data
    const aligned = alignArraysById(blocks, group);

    // If data is not aligned, do the update
    if (aligned) {
      const currentGroupData = group.map((exp) => exp.id);
      const newGroupData = aligned.map((exp) => exp.id);

      // If there is no change in the group data, do not update
      if (JSON.stringify(currentGroupData) === JSON.stringify(newGroupData))
        return;

      const updatedCV = {
        ...cv,
        main: cv.main.map(
          (el) =>
            el.id === groupId
              ? { ...el, data: aligned } // Update the group with aligned data
              : el // Leave other groups unchanged
        ),
      };
      update(updatedCV);
    }
  };

  return (
    <CVContext.Provider
      value={{
        cv,
        update,
        undo,
        redo,
        removeFromMainGroup,
        addItemToMainGroup,
        updateMainGroup,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

// Create a custom hook for using the CVContext
// eslint-disable-next-line react-refresh/only-export-components
export const useCV = () => {
  return useContext(CVContext);
};
