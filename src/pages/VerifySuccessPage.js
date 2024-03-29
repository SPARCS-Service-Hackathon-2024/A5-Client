import { ReactComponent as Ok } from "../assets/ok.svg";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pinkbox = styled.div`
  border-radius: 10px;
  background-color: #fff1f2;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 50vw;
`;
const InfoItem = styled.div`
  font-weight: 600;
  margin: 0.5rem 0;
`;

const Desc = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

export default function VerifySuccessPage() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("access_token");
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      console.log("token", token);
      const personalResponse = await axios.get(`/api/users`);
      console.log("+", personalResponse);
      setData(personalResponse.data);
    })();
  }, []);
  return (
    <>
      <NavContainer>
        <Ok />
        <Desc>
          관광해설사 자격증 인증에
          <br />
          성공하였습니다.
        </Desc>
        <Pinkbox>
          {/* dummy */}
          <InfoItem>성명: {data ? data.name : "-"}</InfoItem>
          <InfoItem>생년월일: 2000.01.26</InfoItem>
          <InfoItem>발급일자: 2021.11.06</InfoItem>
          <InfoItem>자격증 번호: 11-06-273641</InfoItem>
        </Pinkbox>
      </NavContainer>
      <Footer first="재인증하기" second="다음" funct={() => navigate(-2)} />
    </>
  );
}
