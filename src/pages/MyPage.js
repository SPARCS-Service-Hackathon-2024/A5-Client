import styled from "@emotion/styled";

import screenshot from "../SCREENSHOT.png";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Pretendard;
  /* background-image: url(${screenshot});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center; */
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

const Summary = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--gray-500);
  padding: 1.7rem;
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

export default function MyPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <MyPageTitle>마이페이지</MyPageTitle>
      <ProfileContainer>
        <ProfileColumnContainer>
          <ProfileImage src="https://via.placeholder.com/150" />
          <ProfileName>홍길동 님</ProfileName>
          <ProfileBelowName>가치가유 상위 23%</ProfileBelowName>
        </ProfileColumnContainer>
        <ProfileColumnContainer>
          <ProfileStats>
            <ProfileStatsTitle>이번 주 산책한 거리</ProfileStatsTitle>
            <ProfileStatsContent>5.2km</ProfileStatsContent>
          </ProfileStats>
          <ProfileStats>
            <ProfileStatsTitle>포인트</ProfileStatsTitle>
            <ProfileStatsContent>4시간 30분</ProfileStatsContent>
          </ProfileStats>
        </ProfileColumnContainer>
      </ProfileContainer>
      <Summary>
        스팍스 님은
        <br />
        어쩌고...
      </Summary>
      <EditButton onClick={() => navigate("/edit")}>프로필 수정하기</EditButton>
    </Container>
  );
}
