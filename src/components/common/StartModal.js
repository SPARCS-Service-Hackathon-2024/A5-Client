import Modal from "./modal";

const StartModal = ({ handleClose, onConfirm }) => {
  return (
    <Modal handleClose={handleClose} onConfirm={onConfirm}>
      출발지에 도착하면 자동으로 산책이 시작됩니다.
    </Modal>
  );
};

export default StartModal;
