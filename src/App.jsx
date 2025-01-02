// import "./App.css";
import styled from "styled-components";
import CVGenerator from "./components/CVGenerator";
import Navbar from "./components/Navbar";
import { CVProvider } from "./CVContext";
import Toolbar from "./components/Toolbar";
import Modal from "./components/Modal";

function App() {
  return (
    <Root>
      <CVProvider>
        <Navbar />
        <Content>
          <Toolbar />
          <CVContainer>
            <CVGenerator />
          </CVContainer>
        </Content>
        <Modal />
      </CVProvider>
    </Root>
  );
}

export default App;

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
