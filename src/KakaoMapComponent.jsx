
import React, { useEffect, useRef } from 'react';

export default function KakaoMapComponent() {
  const mapRef = useRef(null);

  useEffect(()=>{
    if (!mapRef.current) return;
    if (!window.kakao) return;
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new window.kakao.maps.Map(container, options);

    const markerPosition  = new window.kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });
    marker.setMap(map);

  }, [mapRef]);
  return (
    <div ref={mapRef} style={{width: '320px', height: '320px'}}></div>
  );
}
