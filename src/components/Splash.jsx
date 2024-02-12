
import styled from "@emotion/styled";
import logo from "../assets/logo.png";

export default function Splash() {
  // A blank screen with a logo in the middle
  const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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