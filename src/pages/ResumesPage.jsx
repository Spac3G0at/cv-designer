import { useEffect, useState } from "react";
import PageLoader from "./PageLoader";
import ResumeItem from "../components/resume/ResumeItem";
import Card from "../components/Card";

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
      {resumes.map((resume) => (
        <Card key={resume.id}>
          <ResumeItem resume={resume} large />
        </Card>
      ))}
    </div>
  );
};

export default ResumesPage;
