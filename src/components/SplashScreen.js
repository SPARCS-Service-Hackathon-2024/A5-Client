import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import gachiGayu from "../assets/Group 1.svg";
import gachiText from "../assets/gachi_text.svg";
import { setToken } from "../utils/token";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// const KAKAO_KEY = process.env.REACT_APP_KAKAO_KEY;
// const redirect_uri = "http://localhost:3000/oauth2/authorization";

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
  top: 58%;
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
      top: 58%;
    }
    to {
      opacity: 1;
      top: 53%;
    }
  }
`;

const KakaoLoginButton = styled.div`
  position: absolute;
  left: 50%;
  top: 66%;
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
      top: 66%;
    }
    to {
      opacity: 1;
      top: 63%;
    }
  }
`;

export default function SplashScreen() {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const login = () => {
    window.location.href =
      "http://gachigayu-lb-2027077742.ap-northeast-2.elb.amazonaws.com/oauth2/authorization/kakao";
    console.log(11);
    const params = useParams();
    const accessToken = params.access_token;
    const refreshToken = params.refresh_token;
    console.log("token is ", accessToken);
    setToken({
      accessToken,
      refreshToken,
    });
  };
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
          login();
        }}
        loaded={loaded}
      >
        카카오 로그인
      </KakaoLoginButton>
    </Container>
  );
}
