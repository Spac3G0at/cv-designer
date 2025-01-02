import styled from "styled-components";
import ColorPicker from "../ColorPicker";
import useSettings from "../hooks/useSettings";

const LayoutMenu = () => {
  const { settings, update } = useSettings();

  return (
    <div>
      <h4>Colors / Margins / Font</h4>
      <ItemGroup>
        <span>Name color</span>
        <ColorPicker
          onChange={(color) => update("name_color", color)}
          baseColor={settings.name_color}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Resume title color</span>
        <ColorPicker
          onChange={(color) => update("resume_title_color", color)}
          baseColor={settings.resume_title_color}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Title color</span>
        <ColorPicker
          onChange={(color) => update("title_color", color)}
          baseColor={settings.title_color}
        />
      </ItemGroup>

      <ItemGroup>
        <span>Display timeline</span>

        <label>
          <input
            type="radio"
            id="huey"
            name="drone"
            checked={settings.timeline}
            readOnly
            onClick={() => update("timeline", true)}
          />
          Yes
        </label>

        <label>
          <input
            type="radio"
            id="dewey"
            name="drone"
            checked={!settings.timeline}
            readOnly
            onClick={() => update("timeline", false)}
          />
          No
        </label>
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
  label {
    input[type="radio"] {
      cursor: pointer;
    }
    cursor: pointer;
    margin-right: 10px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;
