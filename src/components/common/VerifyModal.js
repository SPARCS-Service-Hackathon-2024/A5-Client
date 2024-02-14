import Modal from "./modal";

const VerifyModal = ({ handleClose, onSubmit }) => {
  return (
    <Modal handleClose={handleClose} onCancel={handleClose} onSubmit={onSubmit}>
      관광해설 산책을 시작하기 위해서는 최초 1회 관광해설사 자격증 인증이
      필요합니다.
    </Modal>
  );
};

export default VerifyModal;
