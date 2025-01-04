import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";
import ResumeItem from "../components/resume/ResumeItem";
import Card from "../components/Card";
import styled from "styled-components";

const mock = [
  {
    name: "Resume 1",
    id: 1,
    thumb: "https://placehold.co/65x91",
  },
  {
    name: "Resume 2",
    id: 2,
    thumb: "https://placehold.co/65x91",
  },
];

const ResumesPage = () => {
  const [loading, setLoading] = useState(true);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    (() => {
      setTimeout(() => {
        setResumes(mock);
        setLoading(false);
      }, 800);
    })();
  }, []);

  return (
    <div>
      {loading && <PageLoader />}
      <Content>
        {resumes.map((resume, index) => (
          <Card key={resume.id + index}>
            <ResumeItem resume={resume} large />
          </Card>
        ))}
      </Content>
    </div>
  );
};

export default ResumesPage;

const Content = styled.div`
  display: grid;
  grid-gap: 1rem;
`;
