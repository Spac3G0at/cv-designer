import { useCV } from "../../CVContext";
import Text from "../Text";

const Template1Header = () => {
  const { cv, settings, updatePartial } = useCV();

  return (
    <div>
      <Text
        element="h1"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          lineHeight: "28px",
          color: settings.name_color,
        }}
        onChange={(value) => updatePartial({ fullname: value })}
      >
        {cv.fullname}
      </Text>
    </div>
  );
};

export default Template1Header;
