import React, { useEffect, useRef } from "react";
import watchLocation from "../hooks/watchLocation";
import styled from "@emotion/styled";

import { useRecoilState } from "recoil";
import { mapState as mapStateRecoil } from "../store/map";
import { pathState } from "../store/path";

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
  const { location, error } = watchLocation();
  const currentLocationOverlayRef = useRef(null);
  const mapContainerRef = useRef(null);

  const [mapState, setMapState] = useRecoilState(mapStateRecoil);

  const { loading, locked } = mapState;

  const [path, _] = useRecoilState(pathState);

  useEffect(() => {
    setMapState((prev) => ({ ...prev, loading: true }));
    const interval = setInterval(() => {
      if (window.kakao) {
        const container = mapContainerRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(36.3766263411, 127.38719915966),
          level: 3,
        };
        setMapState((prev) => ({ ...prev, center: options.center }));
        const newMap = new window.kakao.maps.Map(container, options);
        mapRef.current = newMap;
        setMapState((prev) => ({ ...prev, loading: false }));
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao) return;
    const map = mapRef.current;
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
    currentLocationOverlay.setMap(map);
    currentLocationOverlayRef.current = currentLocationOverlay;
    var path3 = new window.kakao.maps.Polyline({
      path: path.map((pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng)),
      strokeWeight: 13,
      strokeColor: "var(--gray-400)",
      strokeOpacity: 0.2,
      strokeStyle: "solid",
    });
    path3.setMap(map);

    var path1 = new window.kakao.maps.Polyline({
      path: path.map((pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng)),
      strokeWeight: 10,
      strokeColor: "var(--gray-000)",
      strokeOpacity: 1.0,
      strokeStyle: "solid",
    });
    path1.setMap(map);

    var path2 = new window.kakao.maps.Polyline({
      path: path.map((pos) => new window.kakao.maps.LatLng(pos.lat, pos.lng)),
      strokeWeight: 5,
      strokeColor: "var(--pink-600)",
      strokeOpacity: 1,
      strokeStyle: "solid",
    });
    path2.setMap(map);
  }, [loading]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!location.lat || !location.lng) return;
    if (locked) {
      map.panTo(new window.kakao.maps.LatLng(location.lat, location.lng));
    }
    if (currentLocationOverlayRef.current) {
      currentLocationOverlayRef.current.setPosition(
        new window.kakao.maps.LatLng(location.lat, location.lng)
      );
    }
  }, [loading, location.lat, location.lng, locked]);

  const lock = () => {
    setMapState((prev) => ({ ...prev, locked: true }));
  };

  const unlock = () => {
    setMapState((prev) => ({ ...prev, locked: false }));
  };

  return (
    <>
      <CurrentLocationButton onClick={lock}>
        <CurrentLocationButtonIcon
          className={"fas fa-crosshairs"}
          highlighted={locked}
        />
      </CurrentLocationButton>
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "100%" }}
        onTouchStart={unlock}
      ></div>
    </>
  );
}
