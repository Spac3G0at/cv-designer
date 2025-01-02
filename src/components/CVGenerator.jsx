import styled from "styled-components";
import Template1 from "./templates/Template1";

const CVGenerator = () => {
  return (
    <Root>
      <PDFContainer id="cv">
        <Template1 />
      </PDFContainer>
    </Root>
  );
};

export default CVGenerator;

const Root = styled.div`
  padding: 20px;
`;

const PDFContainer = styled.div`
  user-select: none;
  width: 21cm;
  height: 29.7cm;
  background-color: white;
  margin: 0 auto;
  color: black;
  box-sizing: border-box;
  font-family: "Lato", sans-serif;
  overflow: hidden;
  /* box-shadow: 0 0 10px rgba(245, 245, 245, 0.1); */
`;
