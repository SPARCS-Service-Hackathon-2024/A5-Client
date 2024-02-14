import styled from "@emotion/styled";
import { useSetRecoilState } from "recoil";
import { sliderState } from "../store/map";
import { useRecoilValue } from "recoil";

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
  height: 2rem;
  padding: 0rem 0.8rem;
  border-radius: 1rem;
  background-color: var(--gray-000);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-500);
  font-size: 0.8rem;
  margin-right: 0.5rem;
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
          <CategoryItem key={index}>
            <i
              className={category.icon}
              style={{ marginRight: "0.5rem", color: category.color }}
              onClick={() =>
                setMenuState(() =>
                  menu === category.name
                    ? { menu: "주변 산책로" }
                    : { menu: category.name }
                )
              }
            ></i>
            {category.name}
          </CategoryItem>
        ))}
      </CategoryContainer>
    </span>
  );
}
