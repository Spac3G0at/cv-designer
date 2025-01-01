import styled from "styled-components";
import { useCV } from "../CVContext";
import ColorPicker from "./ColorPicker";

const Toolbar = () => {
  const { updateSettings } = useCV();

  const changeColor = (color) => {
    updateSettings({ title_color: color });
  };

  return (
    <Root>
      <span>Toolbar</span>
      <button onClick={() => changeColor("#ed2553")}>Color title</button>
      <ColorPicker />
    </Root>
  );
};

export default Toolbar;

const Root = styled.div`
  padding: 10px;
  background-color: #333;
  position: fixed;
  height: 100vh;
  top: 0;
  display: flex;
  flex-direction: column;
`;
