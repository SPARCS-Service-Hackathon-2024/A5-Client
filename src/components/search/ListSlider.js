import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
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
  const [iconSpotState, setIconSpotState] = useRecoilState(recoilIconSpotState);
  const token = getAccessToken();
  let { center } = useRecoilValue(mapState);
  if (!center.lat || !center.lng) {
    center = { lat: center.Ma, lng: center.La };
  }
  const typeToMenuMapping = {
    심부름: "ERRAND",
    "함께 걷기": "WALK_TOGETHER",
    관광해설: "TOURISM",
    플로깅: "PLOGGING",
    "주변 산책로": "",
  };
  const type = typeToMenuMapping[menu];
  const getWalkPath = async () => {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const promenadesRes = await axios.get(
        `/api/promenades?type=${type}&coordinate=${center.lat},${center.lng}`
      );

      setData(promenadesRes.data.promenades);
      console.log("data is ", data);
    } catch (e) {
      console.log(e);
    }
  };

  const ToggleRecommend = async (id) => {
    try {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      const response = await axios.post("/api/saves", { promenadeId: id });
      console.log("user data is ", response);
    } catch (error) {
      console.log("empty or error");
    }
  };
  useEffect(() => {
    getWalkPath();
  }, [menu, center]);

  return (
    <div style={{ style }}>
      {!(data.length === 0) ? (
        <>
          {data.map((el) => (
            <SliderListItem
              data={el}
              setData={setData}
              key={el.id}
              toggleWalkPath={toggleWalkPath}
              setToggleWalkPath={setToggleWalkPath}
              toggleRecommend={() => ToggleRecommend(el.id)}
            />
          ))}
        </>
      ) : (
        <NoWayContainer>
          <NoWay />
          <div>
            주변 산책로가 없습니다.
            <br />
            현재 위치를 옮기거나 GPS 수신을 확인해주세요.
          </div>
        </NoWayContainer>
      )}
    </div>
  );
};
export default ListSlider;
