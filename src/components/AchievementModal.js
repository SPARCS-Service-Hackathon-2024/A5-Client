import { useState } from "react";
import gachiIcon from "../assets/Group 1.svg";
import styled from "@emotion/styled";
import caloryImage from "../assets/calory_person.svg";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000050;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 18rem;
  height: 28rem;
  background-color: white;
  border-radius: 1.2rem;
  box-shadow: 0px 0px 10px 0px #00000050;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.2rem;
  z-index: 100;
  overflow: hidden;
`;

const ModalContent1 = styled.div`
  text-align: center;
  width: 18rem;
  height: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: ${(props) => -50 + props.offset * 100}%;
  transform: translate(-50%, -50%);
  background-color: white;
  transition: left 0.5s;
`;

const ModalContent2 = styled.div`
  text-align: center;
  width: 18rem;
  height: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: ${(props) => 50 + props.offset * 100}%;
  transform: translate(-50%, -50%);
  background-color: white;
  transition: left 0.5s;
`;

const Icon = styled.img`
  width: 9rem;
  margin-bottom: 3rem;
`;

const Icon2 = styled.img`
  width: 22rem;
  margin-bottom: 1rem;
`;

const OKBtn = styled.div`
  width: 20rem;
  height: 2.5rem;
  position: absolute;
  bottom: -1.5rem;
  border-top: 1px solid #00000020;
  padding-top: 0.5rem;
`;

export default function AchievementModal({ close }) {
  const [offset, setOffset] = useState(1);
  return (
    <ModalBackground>
      <ModalContainer onClick={() => setOffset(1 - offset)}>
        <ModalContent1 offset={offset}>
          <Icon src={gachiIcon} alt="gachiIcon" />
          <div>가치가유와 함께</div>
          <div>700m를 22분 걸었어요.</div>
        </ModalContent1>
        <ModalContent2 offset={offset}>
          <Icon2 src={caloryImage} alt="gachiIcon" />
          <div>문화관광해설사</div>
          <div>봉사시간 15분을 얻고,</div>
          <div>231 kcal를 소모했어요.</div>
          <div style={{ marginTop: "5rem" }} />
          <OKBtn onClick={close}>확인</OKBtn>
        </ModalContent2>
      </ModalContainer>
    </ModalBackground>
  );
}
