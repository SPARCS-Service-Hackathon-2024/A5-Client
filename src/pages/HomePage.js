import styled from "@emotion/styled";

const Container = styled.div`
  padding: 2rem;
  padding-top: 5rem;
`;
const MainText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  text-align: left;
  width: 100%;
  color: var(--gray-400);
  margin-bottom: 2rem;
`;
const RowSectionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: normal;
  color: var(--gray-400);
  text-align: left;
`;
const RowSectionContainer = styled.div`
  margin-top: 1rem;
  width: 100vw;
  margin-left: -2rem;
  margin-right: -2rem;
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
  width: 20rem;
  height: 12rem;
  background-color: var(${(props) => props.color || "--gray-000"});
  border-radius: 1rem;
  margin-left: 2rem;
`;

export default function HomePage() {
  return (
    <Container>
      <MainText>
        가치가유와 함께
        <br />
        기쁨을 나눠봐유!
      </MainText>
      <RowSectionTitle>인기 산책로</RowSectionTitle>
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
