import Footer from "../components/common/Footer";
import styled from "styled-components";
import { ReactComponent as GrayBox } from "../assets/guide/tour_guide_1_gray.svg";
import { ReactComponent as VerticalBox } from "../assets/guide/tour_guide_1_vertical.svg";
import { ReactComponent as Reflection } from "../assets/guide/tour_guide_1_reflection.svg";

const VerifyContainer = styled.div`
  background-color: black;

  height: 100vh;
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
  position: fixed;
  margin-top: 10rem;
  right: 0;
`;

export default function VerifyPage() {
  const takePhoto = () => {
    console.log("photo");
  };
  return (
    <VerifyContainer>
      <IconContainer>
        <GrayBox />
        <VerticalBox />
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
