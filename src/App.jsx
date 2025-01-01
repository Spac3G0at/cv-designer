// import "./App.css";
import styled from "styled-components";
import CVGenerator from "./components/CVGenerator";
import Navbar from "./components/Navbar";
import { CVProvider } from "./CVContext";
import Toolbar from "./components/Toolbar";

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <CVProvider>
        <Navbar />
        <Content>
          <Toolbar />
          <CVContainer>
            <CVGenerator />
          </CVContainer>
        </Content>
      </CVProvider>
    </div>
  );
}

export default App;

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
