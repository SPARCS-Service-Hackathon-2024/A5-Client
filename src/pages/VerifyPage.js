import Footer from "../components/common/Footer";
import styled from "styled-components";
import { ReactComponent as Vertical } from "../assets/photo_vertical.svg";
import { ReactComponent as Dark } from "../assets/photo_dark.svg";
import { ReactComponent as Reflection } from "../assets/photo_reflection.svg";
import { ReactComponent as AutoTake } from "../assets/auto_photo_par.svg";

const VerifyContainer = styled.div`
  background-color: black;

  height: 100vh;
  > div:first-child {
    display: flex;
    padding-top: 0.5rem;
    padding-left: 1rem;
  }
  > ul {
    color: white;
    margin-bottom: 8rem;
    position: fixed;
    bottom: 0;
    text-align: left;
    padding-right: 1rem;
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

export default function VerifyPage() {
  const takePhoto = () => {
    console.log("photo");
  };
  return (
    <VerifyContainer>
      <div>
        <AutoTake />
      </div>
      <IconContainer>
        <Vertical />
        <Dark />
        <Reflection />
      </IconContainer>
      <ul>
        <li>복사본이나 사진은 사용할 수 없습니다.</li>
        <li>정보 확인이 어렵거나 훼손된 자격증은 인증이 반려될 수 있습니다.</li>
      </ul>
      <Footer second="촬영하기" funct={takePhoto} />
    </VerifyContainer>
  );
}
