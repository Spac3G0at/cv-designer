import { useEffect, useMemo, useState } from "react";
import DragBlocks from "../draggables/DragBlocks";
import styled from "styled-components";
import ExperienceItem from "./ExperienceItem";
import { useCV } from "../../CVContext";
import alignArraysById from "../../utils/alignArraysById";

const ExperiencesBlocks = ({ data, title, groupId }) => {
  const { cv, update } = useCV();

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
    updateGroup(blocks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blocks]);

  const updateGroup = (newBlocks) => {
    // Compare data content directly to prevent unnecessary updates
    const aligned = alignArraysById(newBlocks, group);

    // If data is not aligned, do the update
    if (aligned) {
      // Check if the group data really changed by comparing their content
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

  const addItem = (e) => {
    e.stopPropagation();
    setBlocks((current) => [
      ...current,
      {
        ...current[0],
        id: `${current.length + 1}`,
        content: (
          <ExperienceItem
            data={{ ...mockExperience, id: `mockExp_${Date.now()}` }}
            id={`${current.length + 1}`}
            groupId={groupId}
          />
        ),
      },
    ]);
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

const mockExperience = {
  id: "mockExp",
  title: "Web Development",
  institution: "123 Institution",
  location: "San Francisco, CA",
  from: "2013",
  to: "2014",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc.",
};

const handleBlocks = (data, groupId) => {
  return data.map((experience) => ({
    id: experience.id,
    content: (
      <ExperienceItem id={experience.id} data={experience} groupId={groupId} />
    ),
  }));
};
