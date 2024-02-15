import Footer from "../components/common/Footer";
import styled from "styled-components";
import { ReactComponent as Download } from "../assets/download_photo.svg";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const VerifyContainer = styled.div`
  > div:first-child {
    font-size: 1.2rem;
    margin-top: 1.6rem;
  }
  > ul {
    color: white;
    margin-bottom: 8rem;
    position: fixed;
    bottom: 0;
    text-align: left;
    padding-right: 1rem;
  }
`;

const ImageContainer = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    width: 12.5rem;
    height: 20rem;
    margin-bottom: 1rem;
  }
`;

const Pinkbox = styled.div`
  border-radius: 10px;
  background-color: #fff1f2;
  padding: 1rem 2rem;
  /* width: 90%; */
  margin: 0 1rem;
  > ul {
    padding: 0 1.5rem;
    text-align: left;
    > li {
      margin: 0.4rem 0;
    }
  }
`;
const WarningTitle = styled.div`
  color: #f43f5e;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
`;
export default function CheckPhotoDone() {
  const navigate = useNavigate();
  const continueWalk = () => {
    console.log("continue walk");
    navigate("/navigation");
  };
  const onClickImgLink = useCallback((srcUrl, name) => {
    fetch(srcUrl, { method: "GET" })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        setTimeout((_) => {
          window.URL.revokeObjectURL(url);
        }, 1000);
        a.remove();
      })
      .catch((err) => {
        console.error("err", err);
      });
  }, []);
  //TODO: image is dummy, replace with api
  const image =
    "https://images.unsplash.com/photo-1609951651556-5334e2706168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80";
  return (
    <VerifyContainer>
      <div>촬영이 완료되었습니다.</div>
      <ImageContainer>
        <img src={image} />
        <Download
          onClick={() => onClickImgLink(image, "volunteer_check_photo")}
        />
      </ImageContainer>
      <WarningTitle>촬영 관련 주의사항</WarningTitle>
      <Pinkbox>
        <ul>
          <li>
            규정 외의 사진을 제출할 경우(가로로 촬영하거나 얼굴이 나오지 않은
            사진 등) 가치가유 내 확인 절차를 통해 산책 인정이 취소될 수
            있습니다.
          </li>
          <li>
            1365에서의 봉사활동 점수확인은 산책 후 등록까지 3~5일이 걸릴 수
            있습니다.
          </li>
        </ul>
      </Pinkbox>
      <Footer
        first="다시 촬영하기"
        second="계속 산책하기"
        funct={continueWalk}
      />
    </VerifyContainer>
  );
}
