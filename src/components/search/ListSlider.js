import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";
import aroundWalkPath from "../../dummyData/aroundWalkPath.json";
import { useRecoilValue, useRecoilState } from "recoil";
import { sliderState } from "../../store/map";

import { iconSpotState as recoilIconSpotState } from "../../store/map";

const ListSlider = ({ style }) => {
  const [data, setData] = useState([]);
  const [toggleWalkPath, setToggleWalkPath] = useState(null);
  const { menu } = useRecoilValue(sliderState);
  const [iconSpotState, setIconSpotState] = useRecoilState(recoilIconSpotState);

  useEffect(() => {
    setData(aroundWalkPath.promenades);
    setIconSpotState(aroundWalkPath.promenades);
  }, []);

  const typeToMenuMapping = {
    ERRAND: "심부름",
    WALK_TOGETHER: "함께 걷기",
    TOURISM: "관광해설",
    PLOGGING: "플로깅",
  };

  return (
    <div style={{ style }}>
      {menu === "주변 산책로"
        ? data.map((el) => (
            <SliderListItem
              data={el}
              key={el.id}
              toggleWalkPath={toggleWalkPath}
              setToggleWalkPath={setToggleWalkPath}
            />
          ))
        : data
            .filter((el) => typeToMenuMapping[el.type] === menu)
            .map((el) => (
              <SliderListItem
                data={el}
                key={el.id}
                toggleWalkPath={toggleWalkPath}
                setToggleWalkPath={setToggleWalkPath}
              />
            ))}
    </div>
  );
};
export default ListSlider;
