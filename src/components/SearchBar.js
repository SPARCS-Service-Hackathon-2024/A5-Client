import styled from "styled-components";
import { useEffect, useState } from "react";
import gachiGayu from "../assets/pink_gachi_gayu.svg";
import useSearch from "../hooks/useSearch";
import useDebounce from "../hooks/useDebounce";
import watchLocation from "../hooks/watchLocation";
import { calculateDistance } from "../utils/mapcalc";
import { useRecoilState } from "recoil";
import { highlightState } from "../store/map";

import shareIcon from "../assets/share.svg";

const Anchor = styled.div`
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 3.4rem;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchBox = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  border-radius: 0.8rem;
  background-color: var(--gray-000);
  filter: drop-shadow(1px 2px 2px rgba(0, 0, 0, 0.25));
  margin-right: 0.9rem;
`;

const AppIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${gachiGayu});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  margin: 0.8rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 1.25rem;
`;

const SearchButton = styled.div`
  width: 3.9rem;
  height: 3.6rem;
  border-radius: 0.8rem;
  background-color: var(--pink-600);
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-000);
  font-size: 1.5rem;
  cursor: pointer;
`;

const SearchPageContainer = styled.div`
  position: absolute;
  top: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--gray-000);
  font-size: 1.5rem;
`;

const SearchItemContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 3rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 0.1rem solid var(--gray-100);
`;

const PlaceName = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--gray-500);
  display: flex;
  flex-direction: row;
`;

const CategoryName = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--gray-300);
  vertical-align: bottom;
  line-height: 2.2rem;
  margin-left: 0.5rem;
`;

const AddressName = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--gray-300);
`;

const DistanceContainer = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: var(--gray-300);
`;

function Distance({ distance }) {
  // distance: km
  if (distance < 1) {
    // meter
    return (
      <DistanceContainer>{Math.round(distance * 1000)}m</DistanceContainer>
    );
  } else if (distance < 10) {
    // 0.1km
    return <DistanceContainer>{distance.toFixed(1)}km</DistanceContainer>;
  } else {
    return <DistanceContainer>{Math.round(distance)}km</DistanceContainer>;
  }
}

function SearchItem({ result, location, close }) {
  const { x, y } = result;
  const distance = calculateDistance(y, x, location.lat, location.lng);
  const [highlight, setHighlight] = useRecoilState(highlightState);

  return (
    <SearchItemContainer
      onTouchStart={() => {
        close();
        setHighlight(result);
      }}
    >
      <PlaceName>
        {result.place_name}
        <CategoryName>{result.category_group_name}</CategoryName>
      </PlaceName>
      <AddressName>{result.address_name}</AddressName>
      <Distance distance={distance} />
    </SearchItemContainer>
  );
}

function SearchPage({ results, close }) {
  const [pos, setPos] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setPos({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      console.error,
      { enableHighAccuracy: true }
    );
  }, []);
  return (
    <SearchPageContainer>
      <div style={{ height: "10rem" }}></div>
      {results.map((result) => (
        <SearchItem
          key={result.id}
          result={result}
          location={pos}
          close={close}
        />
      ))}
      <div style={{ height: "6rem" }}></div>
    </SearchPageContainer>
  );
}

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const query = useDebounce(search, 500);
  const { result, loading } = useSearch(query);
  const [expanded, setExpanded] = useState(false);

  const expand = () => {
    setExpanded(true);
    window.history.pushState(null, null, "");
  };
  useEffect(() => {
    window.onpopstate = function (event) {
      setExpanded(false);
    };
  }, []);

  return (
    <Anchor>
      {expanded && (
        <SearchPage results={result} close={() => setExpanded(false)} />
      )}
      <SearchContainer>
        <SearchBox>
          <AppIcon />
          <SearchInput
            placeholder="장소, 주소 검색"
            onTouchStart={expand}
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </SearchBox>
        <SearchButton>
          <img src={shareIcon} alt="share" />
        </SearchButton>
      </SearchContainer>
      <div
        style={{
          width: "90vw",
        }}
      >
        {loading && "로딩중..."}
      </div>
    </Anchor>
  );
}
