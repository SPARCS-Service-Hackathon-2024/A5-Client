import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gachiGayu from "../assets/gachi_gayu.svg";

const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  justify-content: center;
  align-items: center;
  background-color: var(--pink-600);
`;

const Logo = styled.div`
  width: 240px;
  height: 240px;
  background-color: var(--gray-000);
  -webkit-mask: url("${gachiGayu}") no-repeat center / contain;
  mask: url(${gachiGayu}) no-repeat center / contain;
`;

export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/search");
    }, 2000);
  }, []);
  return (
    <Container>
      <Logo src={gachiGayu} />
    </Container>
  );
}
