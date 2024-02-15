import styled from "@emotion/styled";
import ProfileConfirmModal from "../components/common/ProfileConfirmModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../hooks/useModal";
import axios from "axios";
import { useRef } from "react";

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: var(--gray-000);
`;

const MyPageTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--gray-500);
  background-color: var(--gray-000);
  padding: 1.8rem;
  border-bottom: 0.2rem solid var(--gray-100);
  position: relative;
`;

const BackButton = styled.i`
  position: absolute;
  top: 1.8rem;
  left: 1.8rem;
  font-size: 1.8rem;
  color: var(--gray-200);
  touch-action: none;
  background-color: var(--gray-000);
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 11rem;
  align-items: center;
  justify-content: space-around;
  padding: 0.9rem 3.5rem;
  background-color: var(--pink-100);
  opacity: 0.9;
`;

const ProfileColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  #chooseFile {
    display: none;
  }
`;

const ProfileImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  margin-bottom: 0.8rem;
`;

const ProfileName = styled.div`
  font-size: 1.35rem;
  font-weight: bold;
  margin-bottom: -0.1rem;
  color: var(--gray-500);
`;

const EditSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
  padding: 3rem 2.8rem;
`;

const EditSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
`;

const EditSectionTitle = styled.div`
  font-size: 1.31rem;
  font-weight: bold;
  color: var(--gray-500);
  margin-bottom: 1rem;
`;

const EditSectionInput = styled.input`
  width: calc(100% - 6rem);
  height: 3.5rem;
  border: none;
  border-bottom: ${(props) =>
    props.value
      ? "0.12rem solid var(--gray-300)"
      : "0.12rem solid var(--gray-100);"};
  padding: 0rem;
  font-size: 1.2rem;
  color: var(--gray-500);
  margin-bottom: 0.3rem;
  transition: border-bottom 0.12s;
`;

const EditSectionNotice = styled.div`
  font-size: 0.79rem;
  font-weight: normal;
  color: var(--pink-500);
  margin-bottom: 3rem;
  text-align: left;
  > p {
    margin-bottom: 0.4rem;
  }
`;

const EditSelectionNoticeLink = styled.a`
  text-decoration: underline;
  color: var(--pink-600);
`;

const DoneButton = styled.div`
  position: absolute;
  left: 50%;
  bottom: 8rem;
  transform: translateX(-50%);
  width: 86%;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--gray-000);
  background-color: var(--pink-500);
  touch-action: none;
  transition:
    background-color 0.2s,
    color 0.2s;
  &.disabled {
    background-color: var(--gray-100);
    color: var(--gray-200);
  }
`;

const DoneWithoutButton = styled.div`
  position: absolute;
  left: 50%;
  bottom: 3rem;
  transform: translateX(-50%);
  width: 86%;
  height: 4rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--pink-500);
  background-color: var(--pink-200);
  touch-action: none;
`;

export default function EditMyPage() {
  const [name, setName] = useState("");
  const { openModal, closeModal } = useModal();

  const [id, setId] = useState("");
  const disabled = !name || !id;
  const token = localStorage.getItem("access_token");

  const navigate = useNavigate();
  const noScore = () => {
    openModal(ProfileConfirmModal, {
      handleClose: closeModal,
      onConfirm: () => {
        navigate("/profile");
        closeModal();
      },
    });
  };
  const getPersonalInfo = async () => {
    try {
      axios.defaults.headers.common.Authorization = token;
      const personalResponse = await axios.get(`/api/users`);
      if (personalResponse.data.success) {
        if (personalResponse.data.profileImage) {
          // data.image
          console.log("file is ", personalResponse.data.profileImage);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const imgRef = useRef();
  let imgURL;

  const loadImg = (e) => {
    const imgFile = e.target.files[0];
    let imgURL = URL.createObjectURL(imgFile);
    console.log(imgURL);
    imgRef.current.setAttribute("src", imgURL);
  };

  const imageSave = () => {
    localStorage.setItem("profile", JSON.stringify(imgURL)); // localStorage에 이미지URL을 profile키에 저장하고,
    const profile = localStorage.getItem("profile"); // 다시 localStorage에서 img데이터 꺼내와서 변수에 저장해준다.
    const isVaild = JSON.parse(profile);

    if (!isVaild) {
      // undefined일때
      console.log("no image");
      return;
    }

    imgRef.current.setAttribute("src", isVaild);
    window.alert("프로필 이미지가 저장되었습니다!.");
  };
  const edit = () => {
    if (disabled) return;
    localStorage.setItem("name", name);
    localStorage.setItem("id", id);
    imageSave();
    navigate(-1);
  };

  useEffect(() => {
    getPersonalInfo();
    setName(localStorage.getItem("name"));
    setId(localStorage.getItem("id"));
  }, []);

  return (
    <Container>
      <MyPageTitle>
        <BackButton
          className="fas fa-chevron-left"
          onClick={() => navigate(-1)}
        />
        프로필 수정
      </MyPageTitle>
      <ProfileContainer>
        <ProfileColumnContainer>
          {/* <ImageUploader defaultFile={defaultFile} /> */}
          <input
            type="file"
            id="chooseFile"
            accept="image/*"
            name="chooseImg"
            onChange={loadImg}
          />

          <label htmlFor="chooseFile">
            <ProfileImage src="https://via.placeholder.com/150" ref={imgRef} />
          </label>
          <ProfileName>{name} 님</ProfileName>
        </ProfileColumnContainer>
      </ProfileContainer>
      <EditSectionContainer>
        <EditSection>
          <EditSectionTitle>이름</EditSectionTitle>
          <EditSectionInput
            placeholder="홍길동"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <EditSectionNotice>
            봉사활동 &quot;실명이름&quot; 인정에 필요합니다.
            <br />
            오기입 시 봉사활동 점수 인정이 되지 않습니다.
          </EditSectionNotice>
        </EditSection>
        <EditSection>
          <EditSectionTitle>1365 아이디</EditSectionTitle>
          <EditSectionInput
            placeholder="1365 아이디를 입력해주세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <EditSectionNotice>
            <p>
              봉사활동 점수 인정에 필요한 정보입니다.
              <br />
              오기입 시 봉사활동 점수 인정이 되지 않습니다.
              <br />
            </p>
            <EditSelectionNoticeLink
              href="https://www.1365.go.kr/vols/P9940/mber/volsMber.do"
              target="_blank"
            >
              1365 자원봉사포털 회원가입 하기
            </EditSelectionNoticeLink>
          </EditSectionNotice>
        </EditSection>
      </EditSectionContainer>

      <DoneButton className={disabled ? "disabled" : ""} onClick={edit}>
        입력 완료
      </DoneButton>
      <DoneWithoutButton onClick={() => noScore()}>
        점수 인정 없이 산책하기
      </DoneWithoutButton>
    </Container>
  );
}
