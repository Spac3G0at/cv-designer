import styled from "styled-components";
import { useCV } from "../CVContext";
import ColorPicker from "./ColorPicker";

const Toolbar = () => {
  const { updateSettings, settings } = useCV();

  const changeTitleColor = (color) => {
    updateSettings({ title_color: color });
  };

  return (
    <Root>
      <span>Toolbar</span>
      <ItemGroup>
        <span>Title color</span>
        <ColorPicker
          onChange={changeTitleColor}
          baseColor={settings.title_color}
        />
      </ItemGroup>
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

const ItemGroup = styled.div`
  display: flex;
`;
