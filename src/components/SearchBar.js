import styled from "styled-components";
import { useState } from "react";
import gachiGayu from "../assets/gachi_gayu.svg";

const SearchContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 3rem;
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
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-right: 0.9rem;
`;

const AppIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-image: url(${gachiGayu});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  margin: 0.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  font-size: 1rem;
`;

const SearchButton = styled.div`
  width: 3.1rem;
  height: 2.8rem;
  border-radius: 0.5rem;
  background-color: var(--pink-600);
  border: none;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gray-000);
  font-size: 1.5rem;
`;

export default function SearchBar({ style }) {
  const [search, setSearch] = useState("");

  return (
    <span style={style}>
      <SearchContainer>
        <SearchBox>
          <AppIcon />
          <input
            style={{
              width: "100%",
              height: "100%",
              border: "none",
              outline: "none",
              backgroundColor: "rgba(0, 0, 0, 0)",
              fontSize: "1rem",
            }}
            placeholder="산책로, 장소, 주소 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchBox>
        <SearchButton>
          <i className="fas fa-share" />
        </SearchButton>
      </SearchContainer>
    </span>
  );
}
