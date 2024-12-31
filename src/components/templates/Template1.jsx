import styled from "styled-components";
import DragBlocks from "../draggables/DragBlocks";
import { useState } from "react";
import ExperiencesBlocks from "../experiences/ExperiencesBlock";

const Template1 = () => {
  const [blocks, setBlocks] = useState([
    {
      id: "1",
      height: "auto",
      content: <ExperiencesBlocks />,
    },
    { id: "2", height: 140, content: <div>Formations</div> },
    { id: "3", height: 90, content: <div>Compétences</div> },
    { id: "4", height: 90, content: <div>Informatique</div> },
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
