import styled from "styled-components";
import { ReactComponent as Pet } from "../../assets/pet.svg";
import { ReactComponent as ShoppingBag } from "../../assets/shopping_bag.svg";
import { ReactComponent as GuidePlace } from "../../assets/guide_location.svg";
import { ReactComponent as Garbage } from "../../assets/garbage.svg";

const ListWrapper = styled.div`
  cursor: pointer;
  padding: 1.5rem 3rem;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--pink-300);
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

const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70vw;
  > div:last-child {
    color: ${({ theme }) => theme.color.gachiPink};
    font-size: 0.8rem;
    font-weight: 600;
    text-align: left;
    margin-top: 0.4rem;
    display: flex;
    gap: 0.6rem;
    > p {
      margin: 0;
    }
  }
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
`;

const Description = styled.div`
  display: flex;
  color: gray;
  font-size: 0.75rem;
`;
const HistoryItem = ({ data }) => {
  return (
    <ListWrapper>
      <ListContainer>
        {data.type === "WALK_TOGETHER" ? (
          <Pet />
        ) : data.type === "ERRAND" ? (
          <ShoppingBag />
        ) : data.type === "TOURISM" ? (
          <GuidePlace />
        ) : (
          <Garbage />
        )}
        <ListContent>
          <TitleContainer>
            <div>{data.title}</div>
          </TitleContainer>
          <Description>
            <div>{data.place}</div>, &nbsp;
            <div>{data.length}m</div>&nbsp;
            <div>{data.time}분</div>
          </Description>
          <div>
            <p>{data.startAt?.slice(0, 10).replaceAll("-", ". ")}</p>
            <p>{data.startAt?.slice(11, 16)}</p>
          </div>
        </ListContent>
      </ListContainer>
    </ListWrapper>
  );
};
export default HistoryItem;
