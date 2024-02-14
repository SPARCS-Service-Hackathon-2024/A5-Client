import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";
import aroundWalkPath from "../../dummyData/aroundWalkPath.json";

const ListSlider = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(aroundWalkPath.promenades);
  }, []);
  return (
    <div>
      {data.map((el) => (
        <SliderListItem data={el} key={el.id} />
      ))}
    </div>
  );
};
export default ListSlider;
