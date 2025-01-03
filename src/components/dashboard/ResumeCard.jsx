import styled from "styled-components";
import Card from "../Card";
import { Link } from "react-router";

const ResumeCard = () => {
  const resumes = [
    {
      name: "Resume 1",
      id: 1,
      thumb: "https://placehold.co/65x91",
    },
  ];

  return (
    <Card>
      <Header>
        <h3>My resumes</h3>
        <div>
          <Link to="/cv-editor">
            <button>NEW RESUME</button>
          </Link>
        </div>
      </Header>

      <div>
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </Card>
  );
};

export default ResumeCard;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  button {
    background: #ed2553;
    font-size: 14px;
  }
  h3 {
    margin: 0;
  }
`;

const ResumeItem = ({ resume }) => {
  return (
    <ResumeItemRoot>
      <img src={resume.thumb} alt={resume.name} />
      <Infos>
        <Link to="/cv-editor">Resume 1</Link>
        <small>Updated 2 days ago</small>
        <ButtonsGroup>
          <Link to="/cv-editor">
            <button>EDIT</button>
          </Link>
          <button>DUPLICATE</button>
          <a href={`/p/${resume.id}`} target="_blank">
            <button>VIEW</button>
          </a>
        </ButtonsGroup>
      </Infos>
    </ResumeItemRoot>
  );
};

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
