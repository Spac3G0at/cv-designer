import styled from "styled-components";
import Toolbar from "../components/Toolbar";
import CVGenerator from "../components/CVGenerator";
import Navbar from "../components/Navbar";
import ThemeProvider from "../css/ThemeProvider";
import { CVProvider } from "../CVContext";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";

import mock from "../assets/mock";
import Loader from "./Loader";
if (localStorage.getItem("cv") === null) {
  localStorage.setItem("cv", JSON.stringify(mock));
}

const cvData = JSON.parse(localStorage.getItem("cv") ?? JSON.stringify(mock));

const CVEditor = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const init = async () => {
    setLoading(true);
    let res = await new Promise((res) => setTimeout(() => res(cvData), 1000));

    console.log("res", res);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (loading) return <Loader />;

  return (
    <CVProvider editable={true} data={data}>
      <ThemeProvider>
        <Root>
          <Navbar />
          <Content>
            <Toolbar />
            <CVContainer>
              <CVGenerator />
            </CVContainer>
          </Content>
        </Root>
        <Modal />
      </ThemeProvider>
    </CVProvider>
  );
};

export default CVEditor;

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