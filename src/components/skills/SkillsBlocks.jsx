import { useEffect, useMemo, useState } from "react";
import DragBlocks from "../draggables/DragBlocks";
import styled from "styled-components";

import { useCV } from "../../CVContext";

import Text from "../Text";
import ConfirmModal from "../ConfirmModal";

const SkillsBlocks = ({ data, title, groupId }) => {
  const {
    cv,
    updateMainGroup,
    addItemToMainGroup,
    setModal,
    removeMainGroup,
    closeModal,
    updateMainGroupTitle,
  } = useCV();

  const group = useMemo(
    () => cv.main.find((el) => el.id === groupId)?.data,
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

  const openModal = () => {
    // setModal(<ExperienceModal onAdd={handleAddItem} cancel={closeModal} />);
  };

  const handleAddItem = (item) => {
    addItemToMainGroup(item, groupId);
    closeModal();
  };

  const handleTitleChange = (value) => {
    updateMainGroupTitle(value, groupId);
  };

  const handleRemove = () => {
    setModal(
      <ConfirmModal
        confirm={() => removeMainGroup(groupId)}
        text="Remove this block ?"
      />
    );
  };

  if (!group) return null;

  return (
    <Root>
      <Text onChange={handleTitleChange} className="title-text" element={Title}>
        {title}
      </Text>
      <DragBlocks items={blocks} onReorder={setBlocks} />
      <Actions>
        <button onClick={handleRemove}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <button onClick={openModal}>
          <i className="fa-solid fa-plus"></i> Ajouter
        </button>
      </Actions>
    </Root>
  );
};

export default SkillsBlocks;

const Title = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

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
    &:hover {
      cursor: pointer;
      color: white;
    }
  }
`;

const Root = styled.div`
  width: 100%;
  padding-top: 10px;
  position: relative;
  &:hover {
    ${Actions} {
      opacity: 1;
      visibility: visible;
      top: 4px;
      left: -10px;
    }
  }
`;

const handleBlocks = (data, groupId) => {
  return data?.map((skills, index) => ({
    id: skills.id,
    content: <Item key={skills.id} skills={skills} />,
  }));
};

const Item = ({ skills }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <strong>{skills.label}</strong>
      <ul style={{ margin: 0, fontSize: "13px", paddingLeft: "16px" }}>
        {skills.skills.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </div>
  );
};
