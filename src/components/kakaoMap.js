import React, { useEffect, useRef } from "react";

export default function KakaoMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao) return;
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(36.376626341108, 127.38719915966),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(
      36.376626341108,
      127.38719915966
    );
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [mapRef]);
  return <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>;
}
