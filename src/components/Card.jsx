import styled from "styled-components";

const Card = ({ children }) => {
  return <Root>{children}</Root>;
};

export default Card;

const Root = styled.div`
  background: #333333;
  padding: 24px;
  max-width: 620px;
  width: 100%;
  border-radius: 8px;
`;
