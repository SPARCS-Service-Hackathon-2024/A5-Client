import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0;
  background-color: white;
  padding: 1.4rem;
  font-weight: 500;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  > div {
    min-width: 42vw;
    height: 7vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border-radius: 16px;
    font-weight: 600;
    border-bottom: 2px solid lightgray;
  }
`;

const VividButton = styled.div`
  color: white;
  background-color: #fb7185;
`;
const CancelButton = styled.div`
  color: #57534e;
  background-color: #e7e5e4;
`;
const LightButton = styled.div`
  color: #fb7185;
  background-color: #ffe4e6;
`;

export default function Footer({ first, second, cancel, funct = () => {} }) {
  const navigate = useNavigate();
  return (
    <FooterContainer>
      {first && <LightButton onClick={() => navigate(-1)}>{first}</LightButton>}
      {second && <VividButton onClick={funct}>{second}</VividButton>}
      {cancel && (
        <CancelButton onClick={() => navigate("/home")}>{cancel}</CancelButton>
      )}
    </FooterContainer>
  );
}
