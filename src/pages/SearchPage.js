import styled from "@emotion/styled";
import KakaoMap from "../components/KakaoMap";
import SearchBar from "../components/SearchBar";
import SearchCategory from "../components/SearchCategory";
import SearchPanel from "../components/SearchPanel";

import { useRef } from "react";

const MapContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

export default function SearchPage() {
  return (
    <MapContainer>
      <KakaoMap />
      <SearchBar
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      />
      <SearchCategory
        style={{
          position: "absolute",
          top: "6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      />
      <SearchPanel />
    </MapContainer>
  );
}
