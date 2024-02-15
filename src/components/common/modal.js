import Dialog from "@mui/material/Dialog";
import { useModal } from "../../hooks/useModal";
import styled from "styled-components";

const Modal = ({
  content,
  children,
  handleClose,
  onCancel,
  onConfirm,
  onSubmit,
}) => {
  return (
    <Dialog
      PaperProps={{ sx: { borderRadius: "15px" } }}
      onClose={handleClose}
      open={true}
    >
      <ModalWrapper>
        <ModalContainer>
          {content && <div className="modal-content">{content}</div>}
          {children}
        </ModalContainer>

        <ButtonWrapper>
          {(onConfirm || onSubmit) && (
            <button onClick={onConfirm || onSubmit}>
              {onConfirm ? "확인" : "인증하기"}
            </button>
          )}
          {onCancel && (
            <button onClick={onCancel} className="cancel">
              취소
            </button>
          )}
        </ButtonWrapper>
      </ModalWrapper>
    </Dialog>
  );
};

const Button = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.color.gachiPink};
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .modal-title {
    text-align: center;
    font-weight: bold;
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }
  .modal-content {
    text-align: center;
  }
`;
const ModalContainer = styled.div`
  padding: 3rem 2rem 0 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  align-items: center;
  margin-top: 1.5rem;
  & > button {
    border: none;
    flex-grow: 1;
    font-size: 0.875rem;
    line-height: 1.75;
    color: #57534e;
    height: 5vh;
    border-top: 1px solid #e7e5e4;
    background-color: white;
  }
`;

// Modal 컴포넌트 사용 예시
export const ModalShowButton = () => {
  const { openModal, closeModal } = useModal();
  return (
    <button
      onClick={() =>
        openModal(ModalTest1, {
          handleClose: closeModal,
        })
      }
    >
      모달 띄우기
    </button>
  );
};

const ModalTest1 = ({ handleClose }) => {
  return (
    <Modal
      title="댓글 삭제"
      content="정말 삭제하시겠습니까?"
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={handleClose}
    />
  );
};

export default Modal;
