import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { pathState } from "../store/path";
import NavigationMessage from "../components/common/NavigationMessage";
import styled from "@emotion/styled";
import KakaoMap from "../components/KakaoMap";
import SearchBar from "../components/SearchBar";
import SearchCategory from "../components/SearchCategory";
import SearchPanel from "../components/SearchPanel";
import watchLocation from "../hooks/watchLocation";

const MapContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 지구의 반지름(km)

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  lat1 = degreesToRadians(lat1);
  lat2 = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 거리(km)
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

export default function NavigationPage() {
  const isNavigating = useState(false);
  const pathData = [
    {
      pos: { lat: 36.376626341108, lng: 127.38719915966 },
      main_desc: "대성고등학교 방면으로 횡단보도 건너기",
      sub_desc: "유성온천 야외 족욕체험장, 700m, 22분",
      tip: "",
    },
    {
      pos: { lat: 36.376626341108, lng: 127.38739915966 },
      main_desc: "대성고등학교 방면으로 횡단보도 안 건너기",
      sub_desc: "유성온천 야외 족욕체험장, 700m, 22분",
      tip: "관광객들의 호기심을 지속적 자극으로 이끌 수 있는 단편적인 질문을 수시로 던지면서 흥미를 지속하는 것이 좋습니다.",
    },
    {
      pos: { lat: 36.376426341108, lng: 127.38739915966 },
      main_desc: "대성고등학교 방면으로 횡단보도 건너기3",
      sub_desc: "유성온천 야외 족욕체험장, 700m, 22분",
      tip: "관광객들의 호기심을 지속적 자극으로 이끌 수 있는 단편적인 질문을 수시로 던지면서 흥미를 지속하는 것이 좋습니다.",
    },
    {
      pos: { lat: 36.376426341108, lng: 127.38759915966 },
      main_desc: "대성고등학교 방면으로 횡단보도 건너기4",
      sub_desc: "유성온천 야외 족욕체험장, 700m, 22분",
      tip: "관광객들의 호기심을 지속적 자극으로 이끌 수 있는 단편적인 질문을 수시로 던지면서 흥미를 지속하는 것이 좋습니다.",
    },
  ];
  const [cPosIndex, setCPosIndex] = useState(0);
  const [path, setPath] = useRecoilState(pathState);

  const { location } = watchLocation();

  const threshold = 0.01; // 10m

  useEffect(() => {
    const distance_current_path = calculateDistance(
      pathData[cPosIndex].pos.lat,
      pathData[cPosIndex].pos.lng,
      pathData[cPosIndex + 1].pos.lat,
      pathData[cPosIndex + 1].pos.lng
    );
    const distance_current_user = calculateDistance(
      location.lat,
      location.lng,
      pathData[cPosIndex + 1].pos.lat,
      pathData[cPosIndex + 1].pos.lng
    );

    if (distance_current_user < threshold) {
      setCPosIndex((prev) => prev + 1);
    }
  }, [location.lat, location.lng]);

  useEffect(() => {
    setPath([
      { lat: location.lat, lng: location.lng },
      ...pathData.slice(cPosIndex + 1).map((p) => p.pos),
    ]);
  }, [cPosIndex, location.lat, location.lng]);

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
      <NavigationMessage {...pathData[cPosIndex]} current_index={cPosIndex} />
    </MapContainer>
  );
}
