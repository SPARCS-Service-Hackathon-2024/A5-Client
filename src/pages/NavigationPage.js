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
import { navigateState } from "../store/navigation";
import { useNavigate } from "react-router-dom";
import AchievementModal from "../components/AchievementModal";

import { calculateDistance } from "../utils/mapcalc";

const MapContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;
export default function NavigationPage() {
  const navigate = useNavigate();
  const [navigateFlag, setNavigateFlag] = useRecoilState(navigateState);
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
  const destination_desc = "유성온천 야외 족욕체험장, 0m, 0분";
  const [cPosIndex, setCPosIndex] = useState(0);
  const [path, setPath] = useRecoilState(pathState);
  const [doneDelay, setDoneDelay] = useState(null);
  const [achievement, setAchievement] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const { location } = watchLocation();

  const threshold = 0.01; // 10m

  useEffect(() => {
    if (doneDelay) return;
    const distance_current_user = calculateDistance(
      location.lat,
      location.lng,
      pathData[cPosIndex + 1].pos.lat,
      pathData[cPosIndex + 1].pos.lng
    );

    if (distance_current_user < threshold) {
      if (cPosIndex === pathData.length - 2) {
        setDoneDelay(5);
        setTimeout(() => {
          navigate("/check-photo");
        }, 5000);
        const interval = setInterval(() => {
          setDoneDelay((prev) => prev - 1);
          return () => clearInterval(interval);
        }, 1000);
      }
      setCPosIndex((prev) => prev + 1);
    }
  }, [location.lat, location.lng]);

  useEffect(() => {
    if (achievement) return;
    if (navigateFlag) return;
    setPath([
      { lat: location.lat, lng: location.lng },
      ...pathData.slice(cPosIndex + 1).map((p) => p.pos),
    ]);
  }, [cPosIndex, location.lat, location.lng]);

  let msgData = null;
  if (cPosIndex == pathData.length - 1) {
    msgData = {
      pos: { lat: location.lat, lng: location.lng },
      main_desc: "인증사진 촬영하기",
      sub_desc: `${doneDelay}초 후 인증사진 촬영화면으로 이동합니다.`,
      tip: "",
    };
  } else if (cPosIndex < pathData.length - 1) {
    msgData = pathData[cPosIndex];
  }
  if (achievement) {
    msgData = {
      pos: { lat: location.lat, lng: location.lng },
      main_desc: "도착!",
      sub_desc: destination_desc,
      tip: "",
    };
  }
  useEffect(() => {
    if (navigateFlag) {
      setAchievement(true);
      setNavigateFlag(false);
      setPath([]);
      setCPosIndex(-1);
    }
  }, [navigateFlag]);

  const close = () => {
    setShowModal(false);
  };

  return (
    <MapContainer>
      <KakaoMap />
      <SearchBar />
      <SearchCategory
        style={{
          position: "absolute",
          top: "6.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      />
      <NavigationMessage {...msgData} current_index={cPosIndex} />
      {achievement && showModal && <AchievementModal close={close} />}
    </MapContainer>
  );
}
