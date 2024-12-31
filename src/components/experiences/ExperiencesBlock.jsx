import { useState } from "react";
import DragBlocks from "../draggables/DragBlocks";
import styled from "styled-components";
import ExperienceItem from "./ExperienceItem";

const ExperiencesBlocks = () => {
  const [block1, setBlock1] = useState([
    {
      id: "1",
      height: "auto",
      content: <ExperienceItem id={"1"} remove={() => removeItem("1")} />,
    },
    {
      id: "2",
      height: "auto",
      content: <ExperienceItem id={"2"} remove={() => removeItem("2")} />,
    },
  ]);

  const addItem = (e) => {
    e.stopPropagation();
    setBlock1((current) => [
      ...current,
      {
        ...current[0],
        id: `${current.length + 1}`,
        content: (
          <ExperienceItem
            id={`${current.length + 1}`}
            remove={() => removeItem(`${current.length + 1}`)}
          />
        ),
      },
    ]);
  };

  const removeItem = (index) => {
    console.log(block1.filter((_, e) => e.id !== index));
    setBlock1((current) => current.filter((e) => e.id !== index));
  };

  const handleReorder = (newOrder) => {
    setBlock1(newOrder); // Update state with the new order
  };

  return (
    <Root style={{ width: "100%", paddingTop: "30px" }}>
      <p>Expériences</p>
      <DragBlocks items={block1} onReorder={handleReorder} />
      <Actions>
        <button onClick={addItem}>+ Ajouter</button>
      </Actions>
    </Root>
  );
};

export default ExperiencesBlocks;

const Actions = styled.div`
  background: #1a1a1a;
  position: absolute;
  top: 15px;
  left: 10px;
  height: 26px;
  display: flex;
  align-items: center;

  font-size: 12px;
  line-height: 16px;
  opacity: 0; /* Hidden by default */
  visibility: hidden; /* Prevent interaction when hidden */
  transition: all 0.2s ease;
  & > button {
    background: none;
    color: #bfbfbf;
    border: none;
    padding: 0;
    margin-left: 5px;
    margin-right: 5px;
    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
      color: white;
    }
  }
`;

const Root = styled.div`
  width: 100%;
  padding-top: 30px;
  position: relative;
  &:hover {
    ${Actions} {
      opacity: 1;
      visibility: visible;
      top: 10px;
      left: -10px;
    }
  }
`;
