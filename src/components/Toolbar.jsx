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
      <Content>
        <span>Toolbar</span>
        <ItemGroup>
          <span>Title color</span>
          <ColorPicker
            onChange={changeTitleColor}
            baseColor={settings.title_color}
          />
        </ItemGroup>
      </Content>
    </Root>
  );
};

export default Toolbar;

const Root = styled.div`
  padding: 10px;
  background-color: #333;
  display: flex;
  flex-direction: column;
`;

const ItemGroup = styled.div`
  display: flex;
`;

const Content = styled.div`
  position: sticky;
  top: 0;
`;
