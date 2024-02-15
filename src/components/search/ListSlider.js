import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { sliderState, mapState } from "../../store/map";
import { ReactComponent as NoWay } from "../../assets/no_way.svg";
import styled from "styled-components";
import axios from "axios";
import { getAccessToken } from "../../utils/token";

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
  const token = getAccessToken();
  const { center } = useRecoilValue(mapState);
  const typeToMenuMapping = {
    ERRAND: "심부름",
    WALK_TOGETHER: "함께 걷기",
    TOURISM: "관광해설",
    PLOGGING: "플로깅",
  };
  const type = typeToMenuMapping[menu];
  const getWalkPath = async () => {
    axios.defaults.headers.common.Authorization = token;

    const promenadesRes = await axios.get(
      `/api/promenades?type=ERRAND&coordinate=${center.lat},${center.lng}`
    );
    console.log(promenadesRes);
    // setData(promenadesRes);
  };
  useEffect(() => {
    getWalkPath();
  }, [menu, center]);

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
