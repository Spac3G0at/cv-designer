import styled from "styled-components";
import DragBlocks from "../draggables/DragBlocks";
import { useEffect, useMemo, useState } from "react";
import ExperiencesBlocks from "../experiences/ExperiencesBlock";
import { useCV } from "../../CVContext";
import EditableInput from "../EditableInput";

const Template1 = () => {
  const { cv, update } = useCV();

  const main = useMemo(() => cv.main, [cv.main]);

  const [blocks, setBlocks] = useState(handleBlocksMain(main));

  useEffect(() => {
    setBlocks(handleBlocksMain(main));
  }, [main]);

  useEffect(() => {
    updateMain(blocks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  const updateMain = (data) => {
    const aligned = alignArraysById(data, main);
    if (aligned) {
      update({ ...cv, main: aligned });
    }
  };

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

const getMainComponent = (type, data) => {
  switch (type) {
    case "experiences":
      return <ExperiencesBlocks data={data} />;
    case "education":
      return <ExperiencesBlocks data={data} />;
    case "skills":
      return (
        <div>
          {data.map((skill) => (
            <p key={skill.label}>{skill.label}</p>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const handleBlocksMain = (main) => {
  const arr = main.map((item) => {
    return {
      id: item.id,
      content: getMainComponent(item.type, item.data),
    };
  });

  return arr;
};

const alignArraysById = (array1, array2) => {
  // Create a map for quick lookup of items in array2 by their id
  const mapArray2 = new Map(array2.map((item) => [item.id, item]));

  // Generate the aligned array2 based on array1's order
  const alignedArray2 = array1.map((item) => mapArray2.get(item.id));

  // Check if the original array2 is already aligned
  const isAlreadyAligned = alignedArray2.every(
    (item, index) => item.id === array2[index].id
  );

  return isAlreadyAligned ? null : alignedArray2;
};
