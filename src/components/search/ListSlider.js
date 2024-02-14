import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";

const ListSlider = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const aroundWalkPath = require("../../dummyData/aroundWalkPath.json");
    setData(aroundWalkPath.items);
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
