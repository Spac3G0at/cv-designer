import styled from "styled-components";
import { useCV } from "../../CVContext";
import ConfirmModal from "../ConfirmModal";

const ExperienceItem = ({ data, groupId, last }) => {
  const {
    removeFromMainGroup,
    cv: {
      settings: { timeline },
    },
    setModal,
  } = useCV();

  const handleRemove = () => {
    setModal(
      <ConfirmModal
        text="Remove this item ?"
        confirm={() => removeFromMainGroup(data.id, groupId)}
      />
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      // month: "short",
      year: "numeric",
    });
  };

  const from = formatDate(data.from);
  const to = formatDate(data.to);

  const dateString =
    from === to ? from : `${from}${data.to ? ` - ${to}` : " - Present"}`;

  return (
    <Root>
      {timeline && (
        <Line>
          <div />
        </Line>
      )}
      <Content $last={last}>
        <strong>{data.title}</strong>
        <div>
          <Infos>{dateString}</Infos>{" "}
          <small className="company-label">{data.company}</small>{" "}
          <Infos>{data.location}</Infos>
        </div>
        <Description dangerouslySetInnerHTML={{ __html: data.description }} />
      </Content>
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
    border: none;
    i {
      transition: color 0.2s ease;
      pointer-events: none;
    }
    &:hover {
      cursor: pointer;
      i {
        color: #d00000;
      }
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
    margin-top: 8px;
  }
`;

const Infos = styled.small`
  color: #777777;
  &:last-of-type {
    color: #444444;
  }
`;

const Content = styled.div`
  padding-bottom: ${({ $last }) => ($last ? "5px" : "10px")};
`;

const Description = styled.p`
  font-size: calc(1 * 0.75rem);
  color: #444444;
`;
