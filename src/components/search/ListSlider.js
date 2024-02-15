import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";
import aroundWalkPath from "../../dummyData/aroundWalkPath.json";
import { useRecoilValue } from "recoil";
import { sliderState } from "../../store/map";
import { ReactComponent as NoWay } from "../../assets/no_way.svg";
import styled from "styled-components";

const NoWayContainer = styled.div`
  padding: 1rem 0;
  > div:last-child {
    margin-top: 1rem;
  }
`;

const ListSlider = ({ style }) => {
  const [data, setData] = useState([]);
  const [toggleWalkPath, setToggleWalkPath] = useState(null);
  const { menu } = useRecoilValue(sliderState);

  useEffect(() => {
    setData(aroundWalkPath.promenades);
  }, []);

  const typeToMenuMapping = {
    ERRAND: "심부름",
    WALK_TOGETHER: "함께 걷기",
    TOURISM: "관광해설",
    PLOGGING: "플로깅",
  };
  const filteredData = data.filter((el) => typeToMenuMapping[el.type] === menu);

  return (
    <div style={{ style }}>
      {menu === "주변 산책로" ? (
        data.map((el) => (
          <SliderListItem
            data={el}
            key={el.id}
            toggleWalkPath={toggleWalkPath}
            setToggleWalkPath={setToggleWalkPath}
          />
        ))
      ) : filteredData.length === 0 ? (
        <NoWayContainer>
          <NoWay />
          <div>
            주변 산책로가 없습니다.
            <br />
            현재 위치를 옮기거나 GPS 수신을 확인해주세요.
          </div>
        </NoWayContainer>
      ) : (
        filteredData.map((el) => (
          <SliderListItem
            data={el}
            key={el.id}
            toggleWalkPath={toggleWalkPath}
            setToggleWalkPath={setToggleWalkPath}
          />
        ))
      )}
    </div>
  );
};
export default ListSlider;
