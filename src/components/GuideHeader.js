import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  display: block;
  width: 100vw;
  background-color: white;
  border-bottom: 1px solid #e7e5e4;
  padding: 1.4rem 0;
  font-weight: 500;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a8a29e;
  margin: 0;
  .arrow {
    position: absolute;
    top: 1rem;
    left: 1rem;
  }

  .title {
    color: black;
    font-size: 1.2rem;
  }
`;

export default function GuideHeader({ title }) {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <MdArrowBackIosNew className="arrow" onClick={() => navigate(-1)} />
      <div className="title">{title} 가이드</div>
    </HeaderContainer>
  );
}
