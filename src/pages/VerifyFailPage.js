import { ReactComponent as VerifyFail } from "../assets/verify_fail.svg";
import styled from "styled-components";
import Footer from "../components/common/Footer";

const NavContainer = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pinkbox = styled.div`
  border-radius: 10px;
  background-color: #fff1f2;
  padding: 1rem 2rem;
  /* width: 90%; */
  > ul {
    padding: 0;
    text-align: left;
    > li {
      margin: 0.4rem 0;
    }
  }
`;

const Desc = styled.div`
  margin-top: 0rem;
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 600;
`;
const FailMsg = styled.div`
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 1.1rem;
`;

export default function VerifyFailPage() {
  return (
    <>
      <NavContainer>
        <VerifyFail />
        <Desc>
          관광해설사 자격증 인증에
          <br />
          실패하였습니다.
        </Desc>
        <Pinkbox>
          <ul>
            <li>
              자격증 원본을 세로로 사각형 안에 맞추어 어두운 배경에서
              촬영해주세요.
            </li>
            <li>복사본이나 사진은 사용할 수 없습니다.</li>
            <li>
              정보 확인이 어렵거나 훼손된 자격증은 인증이 반려될 수 있습니다.
            </li>
          </ul>
        </Pinkbox>
        <FailMsg>
          계속해서 인증에 실패할 경우,
          <br />
          고객센터를 통해 문의 바랍니다.
        </FailMsg>
      </NavContainer>
      <Footer first="재인증하기" cancel="취소" />
    </>
  );
}
