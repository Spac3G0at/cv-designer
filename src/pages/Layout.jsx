import { Link, Outlet } from "react-router";
import styled from "styled-components";

const Layout = () => {
  return (
    <Root>
      <Side />
      <Main>
        <Outlet />
      </Main>
    </Root>
  );
};

export default Layout;

const Root = styled.div`
  display: flex;
`;

const padding = 24;
const Main = styled.main`
  position: relative;
  height: calc(100vh - ${padding * 2}px);
  padding: ${padding}px 32px;
  width: 100%;
  overflow: auto;
`;

const Side = () => {
  return (
    <SideRoot>
      <p>Resume creator</p>
      <Nav>
        <Link to="/dashboard">Home</Link>
        <Link to="/cv-editor">Editor</Link>
      </Nav>
      <Footer>
        <LogoutButton>Logout</LogoutButton>
      </Footer>
    </SideRoot>
  );
};

const SideRoot = styled.div`
  height: calc(100vh - 20px);
  width: 210px;
  background: #333333;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Nav = styled.nav`
  display: list;
  padding-top: 20px;
  > a {
    display: list-item;
    margin-bottom: 10px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
`;

const Footer = styled.nav`
  margin-top: auto;
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  padding: 0;
`;
