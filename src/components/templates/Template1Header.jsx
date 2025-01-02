import styled from "styled-components";
import { useCV } from "../../CVContext";
import Text from "../Text";

const Template1Header = () => {
  const { cv, updatePartial } = useCV();

  return (
    <div>
      <Text
        element="h1"
        className="name"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          lineHeight: "28px",
        }}
        onChange={(value) => updatePartial({ fullname: value })}
      >
        {cv.fullname}
      </Text>

      <CVName className="resume-title">Frontend web developer</CVName>
    </div>
  );
};

export default Template1Header;

const CVName = styled.div`
  font-weight: bold;
  line-height: 17px;
  font-size: 19px;
`;
