import { Link, useLoaderData } from "react-router";
import { CVProvider } from "../CVContext";
import ThemeProvider from "../css/ThemeProvider";
import CVGenerator from "../components/CVGenerator";
import styled from "styled-components";
import DownloadButton from "../components/DownloadButton";

const ResumeViewPage = () => {
  const data = useLoaderData();
  return (
    <>
      <Link to="/">
        <ButtonHome>Home</ButtonHome>
      </Link>
      <ButtonFloat>
        <DownloadButton />
      </ButtonFloat>
      <CVProvider editable={false} data={data}>
        <ThemeProvider>
          <Root>
            <Content>
              <CVContainer>
                <CVGenerator />
              </CVContainer>
            </Content>
          </Root>
        </ThemeProvider>
      </CVProvider>
    </>
  );
};

export default ResumeViewPage;

const Root = styled.div`
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`;

const CVContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  flex: 1 1 0%;
  justify-content: flex-end;
  padding-top: 1rem;
  padding-left: 0.25rem;
`;

const ButtonFloat = styled.div`
  position: fixed;
  right: 30px;
  top: 30px;
`;

const ButtonHome = styled.button`
  position: absolute;
  top: 0;
  left: 0;
`;
