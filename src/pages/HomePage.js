import styled from "@emotion/styled";

import gachiIcon from "../assets/Group 1.svg";
const Container = styled.div``;
const MainTextContainer = styled.div`
  width: 100vw;
  height: 16rem;
  background-color: var(--pink-100);
`;
const MainText = styled.div`
  position: absolute;
  left: 4rem;
  top: 6rem;
  font-size: 2.3rem;
  font-weight: bold;
  text-align: left;
  color: var(--gray-400);
`;
const Icon = styled.img`
  position: absolute;
  right: 3.1rem;
  top: 5rem;
  width: 5.5rem;
`;
const SectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--gray-400);
  text-align: left;
  margin-left: 3.9rem;
  margin-top: 2.5rem;
`;
const RowSectionContainer = styled.div`
  margin-top: 1rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;
const RowSectionInnerContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const RowSection = styled.div`
  width: 26rem;
  height: 16rem;
  background-color: var(${(props) => props.color || "--gray-000"});
  border-radius: 1rem;
  margin-left: 2rem;
`;

export default function HomePage() {
  return (
    <Container>
      <MainTextContainer>
        <MainText>
          가치가유와 함께
          <br />
          기쁨을 나눠봐유!
        </MainText>
        <Icon src={gachiIcon} alt="gachiIcon" />
      </MainTextContainer>
      <SectionTitle>산책 가이드 보러가기</SectionTitle>
      <SectionTitle>인기 산책로</SectionTitle>
      <RowSectionContainer>
        <RowSectionInnerContainer>
          <RowSection color="--orange">hi</RowSection>
          <RowSection color="--green">hi</RowSection>
          <RowSection color="--purple">hi</RowSection>
          <RowSection color="--yellow">hi</RowSection>
        </RowSectionInnerContainer>
      </RowSectionContainer>
    </Container>
  );
}
