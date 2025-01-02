import ReactDOM from "react-dom";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Content = styled.div`
  background: white;
  color: black;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1001;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: black;
  cursor: pointer;
  padding: 0;
  &:hover {
    color: #ff6060;
  }
`;

const ModalPortal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <Overlay>
      <Content>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </Content>
    </Overlay>,
    document.body
  );
};

export default ModalPortal;
