import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Flag } from "../../assets/flag.svg";
import { ReactComponent as Pet } from "../../assets/pet.svg";
import { ReactComponent as ShoppingBag } from "../../assets/shopping_bag.svg";
import { ReactComponent as GuidePlace } from "../../assets/guide_location.svg";
import { ReactComponent as Garbage } from "../../assets/garbage.svg";

const ListWrapper = styled.div`
  cursor: pointer;
  padding: 1rem;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  /* > hr {
    border: 0;
    width: 90%;
    background-color: gray;
    color: lightgray;
  } */
`;

const ListContainer = styled.div`
  display: flex;
  justify-content: space-between;
  > svg:first-child {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 5%;
  }
`;

// {
//   "id": 1,
//   "title": "귀여운 강아지와 산책하기",
//   "date": "2024-02-23T18:25:43.511Z",
//   "state": "upcoming",
//   "location": "대전광역시 동물보호센터",
//   "distance": "142m 앞",
//   "length": "538m",
//   "time": "16분",
//   "type": "pet"
// },

const StartButton = styled.div`
  color: white;
  background-color: ${({ theme }) => theme.color.gachiPink};
`;
const SaveButton = styled.div`
  color: ${({ theme }) => theme.color.gachiPink};
  background-color: white;
`;

const ToggleContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-end;
  > div {
    padding: 0.3rem 0.8rem;
    margin-right: 0.5rem;
    border-radius: 2rem;
    border: 1px solid ${({ theme }) => theme.color.gachiPink};
  }
`;

const LengthDiv = styled.div`
  color: ${({ theme }) => theme.color.gachiPink};
  display: flex;
  align-items: flex-start;
  margin-left: 8%;
  > div:last-child {
    padding-left: 0.2rem;
  }
`;

const ListContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50vw;
  > div:first-child {
    font-size: 1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
  > div:last-child {
    color: ${({ theme }) => theme.color.gachiPink};
    font-size: 0.8rem;
    font-weight: 600;
    margin-left: 1rem;
  }
`;

const Description = styled.div`
  display: flex;
  color: gray;
  font-size: 0.75rem;
`;

const SliderListItem = ({ data }) => {
  const [toggleWalkPath, setToggleWalkPath] = useState(null);
  const changeToggle = (id) => {
    if (toggleWalkPath === id) {
      setToggleWalkPath(null);
    } else {
      setToggleWalkPath(id);
    }
  };
  return (
    <ListWrapper onClick={() => changeToggle(data.id)}>
      <ListContainer>
        {data.type === "walkTogether" ? (
          <Pet />
        ) : data.type === "errand" ? (
          <ShoppingBag />
        ) : data.type === "guide" ? (
          <GuidePlace />
        ) : (
          <Garbage />
        )}
        <ListContent>
          <TitleContainer>
            <div>{data.title}</div>
            <div>{data.date.slice(11, 16)}</div>
          </TitleContainer>
          <Description>
            <div>{data.location}</div>, &nbsp;
            <div>{data.length}</div>&nbsp;
            <div>{data.time}</div>
          </Description>
        </ListContent>
        <LengthDiv>
          <Flag />
          <div>{data.distance}</div>
        </LengthDiv>
      </ListContainer>
      {data.id === toggleWalkPath && (
        <ToggleContainer>
          <SaveButton>저장</SaveButton>
          <StartButton>시작</StartButton>
        </ToggleContainer>
      )}
      {/* <hr></hr> */}
    </ListWrapper>
  );
};
export default SliderListItem;
