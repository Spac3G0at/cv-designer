import styled from "styled-components";
import { useCV } from "../../CVContext";

const ExperienceItem = ({ data, groupId }) => {
  const { removeFromMainGroup } = useCV();

  const handleRemove = () => {
    console.log("REMOVE");
    removeFromMainGroup(data.id, groupId);
  };

  return (
    <Root>
      <Line>
        <div />
      </Line>
      <div>
        <strong>{data.title}</strong>
        <div>
          <small style={{ color: "#777" }}>
            {data.from}
            {data.to ? ` - ${data.to}` : ""}
          </small>
        </div>
      </div>
      <Actions>
        <button onClick={handleRemove}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </Actions>
    </Root>
  );
};

export default ExperienceItem;

const Actions = styled.div`
  background: white;
  position: absolute;
  top: 10px;
  right: 10px;
  color: black;

  opacity: 0; /* Hidden by default */
  visibility: hidden; /* Prevent interaction when hidden */
  transition: all 0.2s ease;
  button {
    color: black;
    font-size: 12px;
    background: none;
    outline: none;
    border: none;
    i {
      pointer-events: none;
    }
    &:hover {
      cursor: pointer;
      color: #1e1e1e;
    }
  }
`;

const Root = styled.div`
  display: flex;
  position: relative;
  p {
    margin: 0;
  }
  &:hover {
    ${Actions} {
      opacity: 1;
      visibility: visible;
      top: -5px;
      right: -10px;
    }
  }
`;

const Line = styled.div`
  border-left: 1px solid black;
  margin-right: 15px;
  & > div {
    width: 9px;
    height: 9px;
    background: black;
    border-radius: 50%;
    margin-left: -5px;
    margin-top: 6px;
  }
`;
