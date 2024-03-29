import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { sliderState } from "../store/map";
import { useRecoilValue } from "recoil";
import { ReactComponent as Pet } from "../assets/pet.svg";
import { ReactComponent as ShoppingBag } from "../assets/shopping_bag.svg";
import { ReactComponent as GuidePlace } from "../assets/guide_location.svg";
import { ReactComponent as Garbage } from "../assets/garbage.svg";

const CategoryContainer = styled.div`
  width: 90vw;
  padding: 0 5vw;
  height: 3rem;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  scrollbar-width: none;
  cursor: pointer;
`;

const CategoryItem = styled.div`
  width: max-content;
  white-space: nowrap;
  height: 2.6rem;
  padding: 0rem 1rem;
  border-radius: 1.3rem;
  background-color: ${(props) =>
    props.isActive ? "#FB7185" : "var(--gray-000)"};
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.isActive ? "white" : "var(--gray-500)")};
  font-size: 1.1rem;
  font-weight: 400;
  margin-right: 0.5rem;
  > svg {
    margin-right: 0.5rem;
    path {
      fill: ${(props) => (props.isActive ? "#E7E5E4" : "")} !important;
    }
  }
`;

export default function SearchCategory({ style }) {
  const setMenuState = useSetRecoilState(sliderState);
  const { menu } = useRecoilValue(sliderState);

  const categories = [
    {
      name: "심부름",
      icon: "fas fa-shopping-cart",
      color: "var(--yellow)",
    },
    {
      name: "함께 걷기",
      icon: "fas fa-dog",
      color: "var(--purple)",
    },
    {
      name: "관광해설",
      icon: "fas fa-map-marked-alt",
      color: "var(--orange)",
    },
    {
      name: "플로깅",
      icon: "fas fa-trash-alt",
      color: "var(--green)",
    },
  ];
  return (
    <span style={style}>
      <CategoryContainer>
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            onClick={() => {
              setMenuState(() =>
                menu === category.name
                  ? { menu: "주변 산책로" }
                  : { menu: category.name }
              );
            }}
            isActive={menu === category.name}
          >
            {category.name === "함께 걷기" ? (
              <Pet isActive={menu === category.name} />
            ) : category.name === "심부름" ? (
              <ShoppingBag isActive={menu === category.name} />
            ) : category.name === "관광해설" ? (
              <GuidePlace isActive={menu === category.name} />
            ) : (
              <Garbage isActive={menu === category.name} />
            )}
            {category.name}
          </CategoryItem>
        ))}
      </CategoryContainer>
    </span>
  );
}
