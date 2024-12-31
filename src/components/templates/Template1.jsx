import styled from "styled-components";
import DragBlocks from "../draggables/DragBlocks";
import { useState } from "react";
import ExperiencesBlocks from "../experiences/ExperiencesBlock";
import { useCV } from "../../CVContext";
import EditableInput from "../EditableInput";

const Template1 = () => {
  const { cv, update } = useCV();

  const [blocks, setBlocks] = useState([
    {
      id: "1",
      height: "auto",
      content: <ExperiencesBlocks />,
    },
    {
      id: "2",
      height: 140,
      content: <div style={{ paddingTop: "30px" }}>Formations</div>,
    },
    {
      id: "3",
      height: 90,
      content: <div style={{ paddingTop: "30px" }}>Compétences</div>,
    },
    {
      id: "4",
      height: 90,
      content: <div style={{ paddingTop: "30px" }}>Informatique</div>,
    },
  ]);

  const handleSave = (key, newValue) => {
    console.log(newValue);
    const updatedCV = { ...cv, [key]: newValue };
    update(updatedCV); // Update the CV using context
  };

  return (
    <Root>
      <SideBar>
        <SideContainer>
          <p>john.doe@anymail.com</p>
        </SideContainer>
      </SideBar>
      <Main>
        <EditableInput
          value={cv.fullname}
          onSave={(newValue) => handleSave("fullname", newValue)}
        />
        <Username>John Doe</Username>
        <CVName>This is your CV content. Style it as you like!</CVName>
        <div style={{ width: "100%" }}>
          {" "}
          <DragBlocks main items={blocks} onReorder={setBlocks} />
        </div>
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
  border-right: 1px solid #333333;
  color: #e4e4e4;
  max-width: 300px;
  min-width: 218px;
`;

const SideContainer = styled.div`
  padding: 55px 36px;
`;

const Main = styled.div`
  padding: 55px 36px;
  width: 100%;
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
