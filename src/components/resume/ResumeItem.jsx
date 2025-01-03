import { Link } from "react-router";
import styled from "styled-components";

const ResumeItem = ({ resume, large }) => {
  return (
    <ResumeItemRoot>
      <img
        src={`https://placehold.co/${large ? 150 : 65}x${large ? 210 : 91}`}
        alt={resume.name}
      />
      <Infos>
        <Link to="/cv-editor">Resume 1</Link>
        <small>Updated 1 hour ago</small>
        <ButtonsGroup>
          <Link to="/cv-editor">
            <button>EDIT</button>
          </Link>
          <button>DUPLICATE</button>
          <a href={`/cv/${resume.id}`} target="_blank">
            <button>VIEW</button>
          </a>
        </ButtonsGroup>
      </Infos>
    </ResumeItemRoot>
  );
};

export default ResumeItem;

const ResumeItemRoot = styled.div`
  display: flex;
  img {
    margin-right: 12px;
    border-radius: 4px;
  }
`;

const Infos = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsGroup = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 10px;
  a {
    margin-right: 8px;
    &:first-of-type {
      button {
        border: 1px solid white;
      }
    }
    button {
      margin: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
  button {
    font-weight: bold;
    background: none;
    padding: 3px 5px;
    margin-right: 8px;
  }
`;
