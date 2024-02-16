import styled from "@emotion/styled";

import gachiIcon from "../assets/Group 1.svg";
import { useNavigate } from "react-router-dom";
import ShoppingBagIcon from "../assets/shopping_bag.svg";
import PetIcon from "../assets/pet.svg";
import GuideIcon from "../assets/guide_location.svg";
import GarbageIcon from "../assets/garbage.svg";
import axios from "axios";
import { getAccessToken } from "../utils/token";

import { useEffect, useState } from "react";

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;
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
  word-break: keep-all;
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
  const [dataPopular, setDataPopular] = useState([]);
  const [dataLatest, setDataLatest] = useState([]);
  const token = getAccessToken();
  const GetPopular = async () => {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await axios.get("/api/feeds?kind=POPULARITY");
      console.log("pop data is ", response.data);
      setDataPopular(response.data);
    } catch (error) {
      console.log("empty or error");
    }
  };
  const GetLatest = async () => {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await axios.get("/api/feeds?kind=LATEST");
      console.log("latest data is ", response.data);
      setDataLatest(response.data);
    } catch (error) {
      console.log("empty or error");
    }
  };
  useEffect(() => {
    GetPopular();
    GetLatest();
  }, []);
  const data = [
    {
      category: "인기 산책로",
      data: [
        {
          title: "동물구조119 입양센터 오전 함께걷기",
          date: "D-15",
          img: PetIcon,
          distance: "대전동물보호센터, 950m 40분",
          color: "--yellow",
        },
        {
          title: "대전천 유역 플로깅 봉사 이벤트",
          date: "D-15",
          img: GarbageIcon,
          distance: "대전천, 650m 65분",
          color: "--green",
        },
      ],
    },
    {
      category: "인기 산책로2",
      data: [
        {
          title: "장애인생활이동지원센터 심부름 산책",
          date: "D-15",
          img: ShoppingBagIcon,
          distance: "대전장애인생활이동지원센터, 600m 20분",
          color: "--purple",
        },
        {
          title: "대전시립미술관 야외 조형물 안내 도슨트",
          date: "D-15",
          img: GuideIcon,
          distance: "대전시립미술관, 450m 30분",
          color: "--orange",
        },
      ],
    },
  ];
  const navigate = useNavigate();
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
          <GridSection onClick={() => navigate("/guide/errand")}>
            <GridSectionIcon src={ShoppingBagIcon} />
            <GridSectionText>심부름 가이드</GridSectionText>
          </GridSection>
          <GridSection onClick={() => navigate("/guide/walk-together")}>
            <GridSectionIcon src={PetIcon} />
            <GridSectionText>함께 걷기 가이드</GridSectionText>
          </GridSection>
        </GridSectionContainer2>
        <GridSectionContainer2>
          <GridSection onClick={() => navigate("/guide/tourism")}>
            <GridSectionIcon src={GuideIcon} />
            <GridSectionText>관광해설 가이드</GridSectionText>
          </GridSection>
          <GridSection onClick={() => navigate("/guide/plogging")}>
            <GridSectionIcon src={GarbageIcon} />
            <GridSectionText>플로깅 가이드</GridSectionText>
          </GridSection>
        </GridSectionContainer2>
      </GridSectionContainer1>
      {data.map((d) => (
        <span key={d.category}>
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
                      wordBreak: "keep-all",
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
        </span>
      ))}
      <p style={{ height: "4rem" }} />
    </Container>
  );
}
