import React, { useEffect, useRef, useState, useImperativeHandle } from "react";
import watchLocation from "../hooks/watchLocation";
import styled from "@emotion/styled";

const CurrentLocationButton = styled.div`
  position: absolute;
  top: 10rem;
  right: 2rem;
  z-index: 50;
  width: 3rem;
  height: 3rem;
  background-color: var(--gray-000);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 0.5rem 0.1rem var(--gray-100);
  touch-action: none;
`;

const CurrentLocationButtonIcon = styled.i`
  font-size: 1.8rem;
  color: ${(props) =>
    props.highlighted ? "var(--pink-600)" : "var(--gray-600)"};
  transition: color 0.2s;
`;

export default function KakaoMap() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const { location, error } = watchLocation();
  const [lockedToLocation, setLockedToLocation] = useState(false);
  const currentLocationOverlayRef = useRef(null);

  const display_path = [
    { lat: 36.376626341108, lng: 127.38719915966 },
    { lat: 36.376726298399, lng: 127.38710083028 },
    { lat: 36.376700125842, lng: 127.38689307368 },
  ];

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao) return;
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(36.376626341108, 127.38719915966),
      level: 3,
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap);
    var currentLocationOverlay = new window.kakao.maps.CustomOverlay({
      map: map,
      clickable: true,
      content: `<div style='
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: var(--pink-600);
        border: 0.25rem solid var(--gray-000);
        filter: drop-shadow(0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.25));'>
      </div>`,
      position: new window.kakao.maps.LatLng(36.376626341108, 127.38719915966),
      xAnchor: 0.5,
      yAnchor: 1,
      zIndex: 3,
    });
    currentLocationOverlay.setMap(newMap);
    currentLocationOverlayRef.current = currentLocationOverlay;

    var path3 = new window.kakao.maps.Polyline({
      path: display_path.map(
        (pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng)
      ),
      strokeWeight: 13,
      strokeColor: "var(--gray-400)",
      strokeOpacity: 0.2,
      strokeStyle: "solid",
    });
    path3.setMap(newMap);

    var path1 = new window.kakao.maps.Polyline({
      path: display_path.map(
        (pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng)
      ),
      strokeWeight: 10,
      strokeColor: "var(--gray-000)",
      strokeOpacity: 1.0,
      strokeStyle: "solid",
    });
    path1.setMap(newMap);

    var path2 = new window.kakao.maps.Polyline({
      path: display_path.map(
        (pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng)
      ),
      strokeWeight: 5,
      strokeColor: "var(--pink-600)",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    path2.setMap(newMap);
  }, [mapRef]);

  useEffect(() => {
    if (!map) return;
    if (!location.lat || !location.lng) return;
    if (lockedToLocation) {
      map.panTo(new window.kakao.maps.LatLng(location.lat, location.lng));
    }
    currentLocationOverlayRef.current.setPosition(
      new window.kakao.maps.LatLng(location.lat, location.lng)
    );
  }, [map, location.lat, location.lng, lockedToLocation]);

  const lock = () => {
    setLockedToLocation(true);
  };

  const unlock = () => {
    setLockedToLocation(false);
  };

  return (
    <>
      <CurrentLocationButton onClick={lock}>
        <CurrentLocationButtonIcon
          className={"fas fa-crosshairs"}
          highlighted={lockedToLocation}
        />
      </CurrentLocationButton>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        onTouchStart={unlock}
      ></div>
    </>
  );
}
