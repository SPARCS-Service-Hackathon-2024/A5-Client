import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";
import aroundWalkPath from "../../dummyData/aroundWalkPath.json";

const ListSlider = ({ style }) => {
  const [data, setData] = useState([]);
  const [toggleWalkPath, setToggleWalkPath] = useState(null);

  useEffect(() => {
    setData(aroundWalkPath.promenades);
  }, []);
  return (
    <div style={{ style }}>
      {data.map((el) => (
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
