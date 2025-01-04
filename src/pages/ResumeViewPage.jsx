import { Link } from "react-router";
import styled from "styled-components";
import DownloadButton from "../components/DownloadButton";
import CVEditor from "./CVEditor";

const ResumeViewPage = () => {
  return (
    <>
      <Link to="/">
        <ButtonHome>Home</ButtonHome>
      </Link>
      <ButtonFloat>
        <DownloadButton />
      </ButtonFloat>
      <Content style={{ marginTop: "50px" }}>
        <CVEditor editable={false} />
      </Content>
    </>
  );
};

export default ResumeViewPage;

const ButtonFloat = styled.div`
  position: fixed;
  right: 30px;
  top: 30px;
  z-index: 5;
`;

const Content = styled.div`
  margin-top: 50px;
`;

const ButtonHome = styled.button`
  position: absolute;
  top: 0;
  left: 0;
`;
