import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  position: absolute;
  top: 0;
  left: 0;
`;

const MyPageTitle = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--gray-500);
  box-shadow: 0 0.5rem 1rem 0.1rem var(--gray-100);
  padding: 1.8rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 14.5rem;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem 3.8rem;
  background-color: var(--pink-100);
`;

const ProfileColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
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

const ProfileBelowName = styled.div`
  font-size: 0.9rem;
  font-weight: normal;
  color: var(--gray-500);
`;

const ProfileStats = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 24.5vw;
  height: 3rem;
  margin-bottom: 0.9rem;
  margin-top: 0.7rem;
`;

const ProfileStatsTitle = styled.div`
  position: absolute;
  font-size: 1rem;
  font-weight: normal;
  transform: translateY(0.2rem);
  color: var(--gray-500);
`;

const ProfileStatsContent = styled.div`
  position: absolute;
  font-size: 1.3rem;
  color: var(--pink-600);
  font-weight: 600;
  transform: translateY(1.5rem);
`;

const EditSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 3rem);
  align-items: start;
  margin-top: 2rem;
  padding-left: 3rem;
`;

const EditButton = styled.div`
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
  color: var(--pink-500);
  background-color: var(--pink-200);
  touch-action: none;
`;

const EditSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: start;
  margin-bottom: 2rem;
`;

const EditSectionTitle = styled.div`
  font-size: 1.31rem;
  font-weight: bold;
  color: var(--gray-500);
  margin-bottom: 1rem;
`;

const EditSectionInput = styled.div`
  width: calc(100% - 6rem);
  border: none;
  border-bottom: 0.12rem solid var(--pink-200);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--pink-600);
  margin-bottom: 0.3rem;
  padding-left: 0.2rem;
  vertical-align: baseline;
  transition: border-bottom 0.12s;
  text-align: left;
  padding-bottom: 1rem;
  > span {
    color: var(--pink-300);
    margin: 0;
    height: 3vh;
  }
`;

const EditSectionNotice = styled.div`
  font-size: 0.85rem;
  font-weight: normal;
  color: var(--pink-600);
  margin-bottom: 3rem;
  margin-left: 0.2rem;
  margin-top: 0.5rem;
  text-align: left;
`;
export default function MyPage() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [certification, setCertification] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const token = localStorage.getItem("access_token");

  const GetUser = async () => {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await axios.get("/api/users");
      console.log("user data is ", response.data);
      setName(response.data.name);
      setAccountId(response.data.accountId);
      setProfileImage(response.data.profileImage);
      setCertification(response.data.certification);
    } catch (error) {
      console.log("empty or error");
    }
  };
  useEffect(() => {
    GetUser();
  }, []);
  return (
    <Container>
      <MyPageTitle>마이페이지</MyPageTitle>
      <ProfileContainer>
        <ProfileColumnContainer>
          <ProfileImage
            src={
              profileImage ? profileImage : "https://via.placeholder.com/150"
            }
          />
          <ProfileName>{name} 님</ProfileName>
          <ProfileBelowName>가치가유 상위 23%</ProfileBelowName>
        </ProfileColumnContainer>
        <ProfileColumnContainer>
          <ProfileStats>
            <ProfileStatsTitle>이번 주 산책한 거리</ProfileStatsTitle>
            <ProfileStatsContent>5.2km</ProfileStatsContent>
          </ProfileStats>
          <ProfileStats>
            <ProfileStatsTitle>이번 주 산책한 시간</ProfileStatsTitle>
            <ProfileStatsContent>4시간 30분</ProfileStatsContent>
          </ProfileStats>
        </ProfileColumnContainer>
      </ProfileContainer>
      <EditSectionContainer>
        <EditSection>
          <EditSectionTitle>이름</EditSectionTitle>
          <EditSectionInput>
            {name ? name : <span>미입력</span>}
          </EditSectionInput>
        </EditSection>
        <EditSection>
          <EditSectionTitle>1365 아이디</EditSectionTitle>
          <EditSectionInput>
            {accountId ? accountId : <span>미입력</span>}
          </EditSectionInput>
        </EditSection>
        <EditSection>
          <EditSectionTitle>관광해설사 인증여부</EditSectionTitle>
          {!certification ? (
            <EditSectionInput>
              <span>미인증</span>
            </EditSectionInput>
          ) : (
            <>
              <EditSectionInput>인증되었습니다.</EditSectionInput>
              <EditSectionNotice>인증정보 확인하기</EditSectionNotice>
            </>
          )}
        </EditSection>
        <EditButton onClick={() => navigate("/edit")}>
          프로필 수정하기
        </EditButton>
      </EditSectionContainer>
    </Container>
  );
}
