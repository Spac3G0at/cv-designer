import styled from "styled-components";
import { useState } from "react";
import ToolbarMenu from "./toolbar_menus/ToolbarMenu";

const Toolbar = () => {
  const tools = [
    {
      type: "layout",
      icon: "fa-solid fa-paintbrush",
      label: "Layout",
    },
  ];

  const [open, setOpen] = useState(false);
  const [menuType, setMenuType] = useState("layout");

  const toggleMenu = () => {
    setOpen((c) => !c);
  };

  const openWithType = (type) => {
    setMenuType(type);
    toggleMenu();
  };

  return (
    <>
      <Root>
        <Content>
          <Tools>
            {tools.map((tool) => (
              <ToolButton
                key={tool.label}
                active={String(menuType === tool.type)}
                onClick={() => openWithType(tool.type)}
              >
                <i className={tool.icon}></i>
                <span>{tool.label}</span>
              </ToolButton>
            ))}
          </Tools>
          <Background />
          <ToolbarMenu
            toggleOpen={toggleMenu}
            menuType={menuType}
            open={open}
          />
        </Content>
      </Root>
    </>
  );
};

export default Toolbar;

const Root = styled.div`
  background-color: #333;
  display: flex;
  flex-direction: column;
  width: 90px;
`;

const Content = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  top: 0;
  height: fit-content;
  /* padding: 10px; */
`;

const Tools = styled.div`
  z-index: 12;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Background = styled.div`
  position: absolute;
  z-index: 11;
  background: #333;
  width: 100%;
  height: 100vh;
`;

const ToolButton = styled.button`
  background: none;
  font-weight: normal;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin-top: 10px;
  padding: 5px;
  span {
    margin-top: 5px;
  }
  i {
    font-size: 20px;
  }
  border: none;

  /* Active state styling */
  color: ${({ active }) =>
    active === "true" ? "#ed2553" : "white"}; /* Set active bg color */
`;
