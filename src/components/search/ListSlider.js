import { useState } from "react";
import SliderListItem from "./SliderListItem";
import { useEffect } from "react";

const ListSlider = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const aroundWalkPath = require("../../dummyData/aroundWalkPath.json");
    console.log("path data is ", aroundWalkPath);

    setData(aroundWalkPath.items);
    console.log("data is ", data); // This might still log the old value due to closure. Use useEffect for consistent logging.
  }, []);
  console.log("data is ", data);
  return (
    <div>
      {data.map((el) => (
        <SliderListItem data={el} key={el.id} />
      ))}
    </div>
  );
};
export default ListSlider;
