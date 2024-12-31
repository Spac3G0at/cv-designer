import styled from "styled-components";

const ExperienceItem = ({ id, remove }) => {
  return (
    <Root>
      <Line>
        <div />
      </Line>
      <div>
        <p>Experience name {id}</p>
        <div>
          <p>Depuis 2020</p>
        </div>
      </div>
      <Actions>
        <button onClick={remove}>X</button>
      </Actions>
    </Root>
  );
};

export default ExperienceItem;

const Actions = styled.div`
  background: white;
  position: absolute;
  top: 10px;
  right: 10px;
  color: black;

  opacity: 0; /* Hidden by default */
  visibility: hidden; /* Prevent interaction when hidden */
  transition: all 0.2s ease;
  & > button {
    color: black;
    font-size: 12px;
    background: none;
  }
`;

const Root = styled.div`
  display: flex;
  position: relative;
  p {
    margin: 0;
  }
  &:hover {
    ${Actions} {
      opacity: 1;
      visibility: visible;
      top: -5px;
      right: -10px;
    }
  }
`;

const Line = styled.div`
  border-left: 1px solid black;
  margin-right: 15px;
  & > div {
    width: 9px;
    height: 9px;
    background: black;
    border-radius: 50%;
    margin-left: -5px;
    margin-top: 6px;
  }
`;
