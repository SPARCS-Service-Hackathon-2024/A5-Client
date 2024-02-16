import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as Flag } from "../../assets/flag.svg";
import { ReactComponent as Pet } from "../../assets/pet.svg";
import { ReactComponent as ShoppingBag } from "../../assets/shopping_bag.svg";
import { ReactComponent as GuidePlace } from "../../assets/guide_location.svg";
import { ReactComponent as Garbage } from "../../assets/garbage.svg";
import VerifyModal from "../common/VerifyModal";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import StartModal from "../common/StartModal";
import { useRecoilState } from "recoil";
import { highlightState } from "../../store/map";
import axios from "axios";

const ListWrapper = styled.div`
  cursor: pointer;
  padding: 1rem;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
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

const StartButton = styled.div`
  color: white;
  background-color: ${({ theme }) => theme.color.gachiPink};
`;
const SaveButton = styled.div`
  color: ${({ theme }) => theme.color.gachiPink};
  background-color: white;
`;
const SavedButton = styled.div`
  color: ${({ theme }) => theme.color.gachiPink};
  background-color: #fff1f2;
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
const SliderListItem = ({
  data,
  setData,
  toggleWalkPath,
  setToggleWalkPath,
  toggleRecommend,
}) => {
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const [highlight, setHighlight] = useRecoilState(highlightState);

  const changeToggle = (id) => {
    console.log(data.location.latitude, data.location.longitude);
    setHighlight({
      y: Number(data.location.longitude),
      x: Number(data.location.latitude),
    });
    if (toggleWalkPath === id) {
      setToggleWalkPath(null);
    } else {
      setToggleWalkPath(id);
    }
  };
  const recommendPath = (id) => {
    toggleRecommend(id);
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, saved: true } : item))
    );
    console.log(id, " saved");
  };
  const unRecommendPath = (id) => {
    toggleRecommend(id);
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, saved: false } : item
      )
    );
    console.log(id, " unsaved");
  };
  const VerifyOrStart = async () => {
    console.log("VerifyOrStart", data);
    const response = await axios.get("/api/users");
    console.log("user", response.data);
    if (data.type == "TOURISM" && !response.data.certificated) {
      openModal(VerifyModal, {
        handleClose: closeModal,
        onSubmit: () => {
          navigate("/verification");
          closeModal();
        },
      });
    } else {
      //if not
      openModal(StartModal, {
        handleClose: closeModal,
        onConfirm: () => {
          navigate("/navigation");
          closeModal();
        },
      });
    }
  };
  return (
    <ListWrapper>
      <ListContainer onClick={() => changeToggle(data.id)}>
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
            <div>{data.startAt?.slice(11, 16)}</div>
          </TitleContainer>
          <Description>
            <div>{data.place}</div>, &nbsp;
            <div>{data.length}m</div>&nbsp;
            <div>{data.time}분</div>
          </Description>
        </ListContent>
        <LengthDiv>
          <Flag />
          <div>{data.distance}m 앞</div>
        </LengthDiv>
      </ListContainer>
      {data.id === toggleWalkPath && (
        <ToggleContainer>
          {data.saved ? (
            <SavedButton onClick={() => unRecommendPath(data.id)}>
              추천완료
            </SavedButton>
          ) : (
            <SaveButton onClick={() => recommendPath(data.id)}>추천</SaveButton>
          )}
          <StartButton onClick={() => VerifyOrStart()}>시작</StartButton>
        </ToggleContainer>
      )}
    </ListWrapper>
  );
};
export default SliderListItem;
