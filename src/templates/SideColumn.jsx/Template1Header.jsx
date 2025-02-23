import styled from "styled-components";
import { useCV } from "../../CVContext";
import Text from "../../components/Text";

const Template1Header = () => {
  const { cv, updatePartial } = useCV();

  return (
    <div>
      <Text
        element="h1"
        className="name"
        onChange={(value) => updatePartial({ fullname: value })}
      >
        {cv.fullname}
      </Text>

      <CVName className="resume-title">{cv.title}</CVName>

      <Description dangerouslySetInnerHTML={{ __html: cv.description }} />
    </div>
  );
};

export default Template1Header;

const CVName = styled.div`
  font-weight: bold;
  line-height: 17px;
  font-size: 19px;
`;

const Description = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
`;
