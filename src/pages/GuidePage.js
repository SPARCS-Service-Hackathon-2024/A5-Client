import { ReactComponent as Plogging } from "../assets/guide/whole_plogging.svg";
import { ReactComponent as Tourism } from "../assets/guide/whole_tourism.svg";
import { ReactComponent as WalkTogether } from "../assets/guide/whole_walk_together.svg";
import { ReactComponent as Errand } from "../assets/guide/whole_errand.svg";
import GuideHeader from "../components/GuideHeader";
import Footer from "../components/common/Footer";
import styled from "styled-components";

const GuideContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background: linear-gradient(to bottom, transparent 50%, var(--bg-color) 50%);
  --bg-color: ${(props) => props.bgColor};
  @media screen and (max-width: 325px) {
    > svg {
      width: 320px;
      height: 1350px;
    }
  }
`;

const GuidePage = ({ item }) => {
  return (
    <GuideContainer
      bgColor={
        item === "함께 걷기"
          ? "#E396EF"
          : item === "플로깅"
            ? "#59E18B"
            : item === "관광해설"
              ? "#FFAD5E"
              : "#FFD66C"
      }
    >
      <GuideHeader title={item} />
      {item === "함께 걷기" ? (
        <WalkTogether />
      ) : item === "플로깅" ? (
        <Plogging />
      ) : item === "관광해설" ? (
        <Tourism />
      ) : (
        <Errand />
      )}

      {/* TODO: funct 추가 */}
      <Footer first="확인" second={`${item} 찾기`} />
    </GuideContainer>
  );
};

export default GuidePage;
