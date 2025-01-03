import styled from "styled-components";
import { useCV } from "../CVContext";
import DownloadButton from "./DownloadButton";
import mockCV from "../assets/mock";

const Navbar = () => {
  const { undo, redo, canRedo, canUndo } = useCV();

  return (
    <Root>
      <nav>
        <div>Resume creator</div>
        <RedoUndoBtnGroup>
          <button disabled={!canUndo} onClick={undo}>
            <i className="fa-solid fa-arrow-rotate-left"></i>
          </button>
          <button disabled={!canRedo} onClick={redo}>
            <i className="fa-solid fa-rotate-right"></i>
          </button>
        </RedoUndoBtnGroup>
        <ResetButton />
        <DownloadButton />
      </nav>
    </Root>
  );
};

export default Navbar;

const Root = styled.div`
  z-index: 11;
  position: relative;
  background-color: #333;
  color: white;
  /* padding: 10px; */
  width: 100%;
  & > nav {
    padding: 10px;
    display: flex;
    align-items: center;
  }
`;

const RedoUndoBtnGroup = styled.div`
  margin-left: auto;
  margin-right: auto;
  & > button {
    margin: 0 5px;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    background-color: #555;
    color: white;
    cursor: pointer;
    &:disabled {
      color: grey;
      background-color: #1d1d1d;
      cursor: not-allowed;
    }
  }
`;

const ResetButton = () => {
  const { update } = useCV();

  const reset = () => {
    update(mockCV);
  };

  return (
    <button style={{ marginRight: "10px" }} onClick={reset}>
      RESET
    </button>
  );
};
