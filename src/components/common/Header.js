import styled from "styled-components";
import { MdArrowBackIosNew } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  border-bottom: 1px solid #a8a29e;
  padding: 1.4rem;
  font-weight: 500;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #a8a29e;
  .title {
    color: black;
    font-size: 1.2rem;
  }
`;

export default function Header({ title }) {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <MdArrowBackIosNew onClick={() => navigate(-1)} />
      <div className="title">{title}</div>
      <IoMdClose onClick={() => navigate("/home")} />
    </HeaderContainer>
  );
}
