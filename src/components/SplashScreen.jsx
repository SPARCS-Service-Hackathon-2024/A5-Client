
import styled from "@emotion/styled";
import logo from "../assets/logo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/home');
    }, 2000);
  }, []);
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
    -webkit-mask: url('${logo}') no-repeat center / contain;
    mask: url(${logo}) no-repeat center / contain;
  `;
  return (
    <Container>
      <Logo
        src={logo}
      />
    </Container>
  );
}