import Modal from "./modal";

const ProfileConfirmModal = ({ handleClose, onConfirm }) => {
  return (
    <Modal
      handleClose={handleClose}
      onCancel={handleClose}
      onConfirm={onConfirm}
    >
      정보를 입력하지 않으면 1365를 통한 봉사활동 점수인정이 되지 않습니다.
      <br />
      <br />내 정보는 마이페이지에서 수정이 가능합니다.
    </Modal>
  );
};

export default ProfileConfirmModal;
