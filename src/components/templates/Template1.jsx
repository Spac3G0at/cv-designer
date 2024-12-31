import styled from "styled-components";
import DragBlocks from "../draggables/DragBlocks";
import { useState } from "react";

const Template1 = () => {
  const [blocks, setBlocks] = useState([
    {
      id: "1",
      height: "auto",
      content: <ExperiencesBlocks />,
    },
    { id: "2", height: 140, content: <div>2</div> },
    { id: "3", height: 90, content: <div>3</div> },
    { id: "4", height: 130, content: <div>4</div> },
    { id: "5", height: 100, content: <div>5</div> },
  ]);

  return (
    <Root>
      <SideBar>
        <SideContainer>
          <p>john.doe@anymail.com</p>
        </SideContainer>
      </SideBar>
      <Main>
        <Username>John Doe</Username>
        <CVName>This is your CV content. Style it as you like!</CVName>
        <DragBlocks main items={blocks} onReorder={setBlocks} />
      </Main>
    </Root>
  );
};

export default Template1;

const Root = styled.div`
  font-size: 12px;
  display: flex;
  height: 100%;
`;

const SideBar = styled.div`
  width: 218px;
  background-color: #333333;
  color: #e4e4e4;
  max-width: 300px;
  min-width: 218px;
`;

const SideContainer = styled.div`
  padding: 55px 36px;
`;

const Main = styled.div`
  padding: 55px 36px;
`;

const Username = styled.h1`
  line-height: 16px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 0;
`;

const CVName = styled.div`
  color: #2babe2;
  font-weight: bold;
  line-height: 17px;
  font-size: 19px;
`;

const ExperiencesBlocks = () => {
  const [block1, setBlock1] = useState([
    { id: "1", height: "auto", content: <div>1</div> },
    { id: "2", height: "auto", content: <div>2</div> },
  ]);

  const addItem = (e) => {
    e.stopPropagation();
    setBlock1((current) => [
      ...current,
      {
        ...current[0],
        id: `${current.length + 1}`,
        content: <div>{`${current.length + 1}`}</div>,
      },
    ]);
  };

  const handleReorder = (newOrder) => {
    setBlock1(newOrder); // Update state with the new order
  };

  return (
    <div style={{ width: "100%", paddingTop: "30px" }}>
      <p>Expériences</p>
      <DragBlocks items={block1} onReorder={handleReorder} />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
};
