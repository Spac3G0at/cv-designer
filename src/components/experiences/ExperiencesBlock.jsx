import { useEffect, useMemo, useState } from "react";
import DragBlocks from "../draggables/DragBlocks";
import styled from "styled-components";
import ExperienceItem from "./ExperienceItem";
import { useCV } from "../../CVContext";

const ExperiencesBlocks = ({ data, title, groupId }) => {
  const { cv, updateMainGroup, addItemToMainGroup } = useCV();

  const group = useMemo(
    () => cv.main.find((el) => el.id === groupId).data,
    [cv, groupId]
  );

  // Initialize blocks state
  const [blocks, setBlocks] = useState(handleBlocks(data, groupId));

  // Update blocks when group data changes
  useEffect(() => {
    setBlocks(handleBlocks(group, groupId));
  }, [group, groupId]);

  // Update group data when blocks change
  useEffect(() => {
    updateMainGroup(blocks, groupId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  const addItem = () => {
    const item = generateMockItem();
    addItemToMainGroup(item, groupId);
  };

  return (
    <Root style={{ width: "100%", paddingTop: "30px" }}>
      <p>{title}</p>
      <DragBlocks items={blocks} onReorder={setBlocks} />
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

const handleBlocks = (data, groupId) => {
  return data.map((experience) => ({
    id: experience.id,
    content: (
      <ExperienceItem id={experience.id} data={experience} groupId={groupId} />
    ),
  }));
};

const generateMockItem = () => {
  return {
    id: `exp_${new Date().getTime()}`,
    title: "Frontend Developer",
    company: "ABC Company",
    location: "New York, NY",
    from: "2018",
    to: "Present",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.",
  };
};
