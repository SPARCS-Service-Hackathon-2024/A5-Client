import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import gachiGayu from "../assets/Group 1.svg";
import gachiText from "../assets/gachi_text.svg";

const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;
const redirect_uri = "http://localhost:3000/auth";

const Container = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  justify-content: center;
  align-items: center;
  background-color: ${({ loaded }) =>
    loaded ? "var(--gray-000)" : "var(--pink-600)"};
  transition: background-color 0.9s;
`;

const Logo = styled.div`
  position: absolute;
  top: ${({ loaded }) => (loaded ? "40%" : "50%")};
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12rem;
  height: 12rem;
  transition:
    top 0.9s,
    background-color 0.9s;
  background-color: ${({ loaded }) =>
    !loaded ? "var(--gray-000)" : "var(--pink-600)"};
  -webkit-mask: url("${gachiGayu}") no-repeat center / contain;
  mask: url(${gachiGayu}) no-repeat center / contain;
`;

const LogoText = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12rem;
  height: 12rem;
  opacity: 0;
  background-color: var(--pink-600);
  -webkit-mask: url("${gachiText}") no-repeat center / contain;
  mask: url(${gachiText}) no-repeat center / contain;
  ${(props) => props.loaded && "animation: fadeIn 0.9s 0.45s forwards;"}
  @keyframes fadeIn {
    from {
      opacity: 0;
      top: 55%;
    }
    to {
      opacity: 1;
      top: 50%;
    }
  }
`;

const KakaoLoginButton = styled.div`
  position: absolute;
  left: 50%;
  top: 63%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 2.5rem;
  padding: 1rem;
  background-color: #f7e317;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-900);
  user-select: none;
  opacity: 0;
  ${(props) => props.loaded && "animation: fadeInBtn 0.9s 0.6s forwards;"}
  @keyframes fadeInBtn {
    from {
      opacity: 0;
      top: 63%;
    }
    to {
      opacity: 1;
      top: 60%;
    }
  }
`;

export default function SplashScreen() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      // navigate("/search");
      setLoaded(true);
    }, 2000);
  }, []);
  return (
    <Container loaded={loaded}>
      <Logo src={gachiGayu} loaded={loaded} />
      <LogoText src={gachiText} loaded={loaded} />
      <KakaoLoginButton
        onClick={() => {
          // window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_KEY}&redirect_uri=${redirect_uri}&response_type=code`;
          navigate("/search");
        }}
        loaded={loaded}
      >
        카카오 로그인
      </KakaoLoginButton>
    </Container>
  );
}
