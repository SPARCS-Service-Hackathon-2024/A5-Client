import Footer from "../components/common/Footer";
import styled from "styled-components";
import { ReactComponent as Vertical } from "../assets/photo_vertical.svg";
import { ReactComponent as PhotoGuide } from "../assets/face_or_activity.svg";
import { ReactComponent as AutoTake } from "../assets/auto_photo_par.svg";
import { useNavigate } from "react-router-dom";

const VerifyContainer = styled.div`
  background-color: black;

  height: 100vh;
  > div:first-child {
    display: flex;
    padding-top: 0.5rem;
    padding-left: 1rem;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  > svg {
    margin: 1rem 0;
    opacity: 0.8;
  }
`;

export default function CheckPhotoPage() {
  const navigate = useNavigate();
  const takePhoto = () => {
    console.log("photo");
    navigate("/check-photo-done");
  };
  return (
    <VerifyContainer>
      <div>
        <AutoTake />
      </div>
      <IconContainer>
        <Vertical />
        <PhotoGuide />
      </IconContainer>
      <Footer second="촬영하기" funct={takePhoto} />
    </VerifyContainer>
  );
}
