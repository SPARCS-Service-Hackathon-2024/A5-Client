import styled from "@emotion/styled";

import gachiIcon from "../assets/Group 1.svg";

import ShoppingBagIcon from "../assets/shopping_bag.svg";
import PetIcon from "../assets/pet.svg";
import GuideIcon from "../assets/guide_location.svg";
import GarbageIcon from "../assets/garbage.svg";

const Container = styled.div``;
const MainTextContainer = styled.div`
  width: 100vw;
  height: 16rem;
  background-color: var(--pink-100);
`;
const MainText = styled.div`
  position: absolute;
  left: 3rem;
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
  margin-left: 3rem;
  margin-top: 2.5rem;
`;
const GridSectionContainer1 = styled.div`
  width: 86vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const GridSectionContainer2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;
const GridSection = styled.div`
  width: 16rem;
  height: 5.3rem;
  border: 0.2rem solid var(--pink-300);
  margin: 0 0.7rem;
  border-radius: 0.9rem;
  display: flex;
  flex-direction: row;
  background-color: var(--gray-000);
  filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.13));
`;
const GridSectionIcon = styled.img`
  height: 60%;
  position: absolute;
  top: 50%;
  transform: translate(15%, -50%);
`;
const GridSectionText = styled.div`
  position: absolute;
  left: 4.2rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1rem;
  padding-left: 2vw;
  padding-right: 1rem;
`;
const RowSectionContainer = styled.div`
  margin-top: 1rem;
  width: 100vw;
  padding-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  overflow: auto;
  scrollbar-width: none;
`;
const RowSectionInnerContainer = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const RowSection = styled.div`
  position: relative;
  width: 26rem;
  height: 16rem;
  background-color: var(${(props) => props.color || "--gray-000"});
  border-radius: 1rem;
  margin-left: 3rem;
  filter: drop-shadow(0.1rem 0.2rem 0.2rem rgba(0, 0, 0, 0.13));
`;

export default function HomePage() {
  const data = [
    {
      category: "인기 산책로",
      data: [
        {
          title: "장애인생활이동지원센터 심부름 산책a",
          date: "D-15",
          img: PetIcon,
          distance: "대전장애인생활이동지원센터, 600m 20분",
          color: "--yellow",
        },
        {
          title: "장애인생활이동지원센터 심부름 산책b",
          date: "D-15",
          img: PetIcon,
          distance: "대전장애인생활이동지원센터, 600m 20분",
          color: "--green",
        },
      ],
    },
    {
      category: "인기 산책로2",
      data: [
        {
          title: "장애인생활이동지원센터 심부름 산책c",
          date: "D-15",
          img: PetIcon,
          distance: "대전장애인생활이동지원센터, 600m 20분",
          color: "--purple",
        },
        {
          title: "장애인생활이동지원센터 심부름 산책d",
          date: "D-15",
          img: PetIcon,
          distance: "대전장애인생활이동지원센터, 600m 20분",
          color: "--orange",
        },
      ],
    },
    {
      category: "인기 산책로3",
      data: [
        {
          title: "장애인생활이동지원센터 심부름 산책e",
          date: "D-15",
          img: PetIcon,
          distance: "대전장애인생활이동지원센터, 600m 20분",
          color: "--purple",
        },
        {
          title: "장애인생활이동지원센터 심부름 산책f",
          date: "D-15",
          img: PetIcon,
          distance: "대전장애인생활이동지원센터, 600m 20분",
          color: "--orange",
        },
      ],
    },
  ];
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
      <GridSectionContainer1>
        <GridSectionContainer2>
          <GridSection>
            <GridSectionIcon src={ShoppingBagIcon} />
            <GridSectionText>심부름 가이드</GridSectionText>
          </GridSection>
          <GridSection>
            <GridSectionIcon src={PetIcon} />
            <GridSectionText>함께 걷기 가이드</GridSectionText>
          </GridSection>
        </GridSectionContainer2>
        <GridSectionContainer2>
          <GridSection>
            <GridSectionIcon src={GuideIcon} />
            <GridSectionText>관광해설 가이드</GridSectionText>
          </GridSection>
          <GridSection>
            <GridSectionIcon src={GarbageIcon} />
            <GridSectionText>플로깅 가이드</GridSectionText>
          </GridSection>
        </GridSectionContainer2>
      </GridSectionContainer1>
      {data.map((d) => (
        <>
          <SectionTitle>{d.category}</SectionTitle>
          <RowSectionContainer>
            <RowSectionInnerContainer>
              {d.data.map((t) => (
                <RowSection color={t.color} key={t.title}>
                  <div
                    style={{
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      marginLeft: "1.5rem",
                      marginTop: "1.5rem",
                      textAlign: "left",
                      width: "15rem",
                    }}
                  >
                    {t.title}
                  </div>
                  <div
                    style={{
                      color: "white",
                      textAlign: "left",
                      marginLeft: "1.5rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    {t.date}
                  </div>
                  <img
                    style={{
                      position: "absolute",
                      right: "2rem",
                      top: "8rem",
                      transform: "translateY(-50%)",
                      width: "8rem",
                      WebkitFilter: "brightness(0) invert(1)",
                      filter: "brightness(0) invert(1)",
                    }}
                    src={t.img}
                  />
                  <div
                    style={{
                      color: "white",
                      position: "absolute",
                      bottom: "1.2rem",
                      left: "1.5rem",
                    }}
                  >
                    {t.distance}
                  </div>
                </RowSection>
              ))}
            </RowSectionInnerContainer>
          </RowSectionContainer>
        </>
      ))}
      <p style={{ height: "4rem" }} />
    </Container>
  );
}
