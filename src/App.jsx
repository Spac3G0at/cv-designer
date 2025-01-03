// import "./App.css";
import styled from "styled-components";
import { RouterProvider } from "react-router";
import router from "./routes/AppRoutes";

function App() {
  return (
    <Root>
      <RouterProvider router={router} />
    </Root>
  );
}

export default App;

const Root = styled.div`
  min-height: 100vh;
`;
