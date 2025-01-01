import styled from "styled-components";
import { useCV } from "../../CVContext";
import ColorPicker from "../ColorPicker";

const LayoutMenu = () => {
  const { settings, updateSettings } = useCV();

  const updateProperty = (property, value) => {
    updateSettings({ [property]: value });
  };

  return (
    <div>
      <h4>Colors / Margins / Font</h4>
      <ItemGroup>
        <span>Name color</span>
        <ColorPicker
          onChange={(color) => updateProperty("name_color", color)}
          baseColor={settings.name_color}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Title color</span>
        <ColorPicker
          onChange={(color) => updateProperty("title_color", color)}
          baseColor={settings.title_color}
        />
      </ItemGroup>
    </div>
  );
};

export default LayoutMenu;

const ItemGroup = styled.div`
  display: flex;
  align-items: top;
  font-size: 14px;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  span {
    padding-right: 10px;
    width: 50%;
  }
`;
