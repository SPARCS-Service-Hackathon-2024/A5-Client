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

import { iconSpotState as recoilIconSpotState } from "../../store/map";

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
    ERRAND: "심부름",
    WALK_TOGETHER: "함께 걷기",
    TOURISM: "관광해설",
    PLOGGING: "플로깅",
  };
  const type = typeToMenuMapping[menu];
  const filteredData = data.filter((el) => typeToMenuMapping[el.type] === menu);
  const getWalkPath = async () => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const promenadesRes = await axios.get(
      `/api/promenades?type=ERRAND&coordinate=${center.lat},${center.lng}`
    );
    const d = [
      {
        id: 12,
        title: "말티즈와 산책하기",
        place: "대전광역시 동물보호센터",
        startAt: "2024-02-23T18:00:00.000000",
        distance: 142, //산책로 출발지까지의 거리 (m)
        length: 1200, //산책로 길이 (m)
        time: 30, //분 단위
        type: "WALK_TOGETHER",
        saved: true,
        location: {
          latitude: "36.4587718562076",
          longitude: "127.382830214701",
        },
      },
      {
        id: 17,
        title: "힐링 족욕체험장 해설하기",
        place: "유성온천 야외 족욕체험장",
        startAt: "2024-02-23T13:30:00.000000",
        distance: 253,
        length: 532,
        time: 13,
        type: "TOURISM",
        saved: false,
        location: {
          latitude: "36.3557374250018",
          longitude: "127.342111051912",
        },
      },
      {
        id: 19,
        title: "플로깅하기",
        place: "대전광역시 유성구 봉명동",
        startAt: "2024-02-23T13:30:00.000000",
        distance: 253,
        length: 532,
        time: 13,
        type: "PLOGGING",
        saved: false,
        location: {
          latitude: "36.1234",
          longitude: "127.1234",
        },
      },
      {
        id: 20,
        title: "심부름 하기",
        place: "대전광역시 유성구 봉명동",
        startAt: "2024-02-23T13:30:00.000000",
        distance: 253,
        length: 532,
        time: 13,
        type: "ERRAND",
        saved: false,
        location: {
          latitude: "36.1234",
          longitude: "127.1234",
        },
      },
    ];
    setData(d);
    setIconSpotState(d);
    // setData(promenadesRes);
  };
  useEffect(() => {
    getWalkPath();
  }, [menu, center]);

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
