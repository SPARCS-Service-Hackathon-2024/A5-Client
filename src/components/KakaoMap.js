import React, { useEffect, useMemo, useRef } from "react";
import watchLocation from "../hooks/watchLocation";
import styled from "@emotion/styled";

import Flag from "../assets/flag.svg";
import Pet from "../assets/pet.svg";
import ShoppingBag from "../assets/shopping_bag.svg";
import GuidePlace from "../assets/guide_location.svg";
import Garbage from "../assets/garbage.svg";

import { useRecoilState } from "recoil";
import {
  highlightState,
  iconSpotState as recoilIconSpotState,
  mapState as mapStateRecoil,
} from "../store/map";
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
  const mapContainerRef = useRef(null);

  const [mapState, setMapState] = useRecoilState(mapStateRecoil);

  const { loading, locked, center } = mapState;

  const [path, setPath] = useRecoilState(pathState);

  const [highlight, setHighlight] = useRecoilState(highlightState);

  const [iconSpotState, setIconSpotState] = useRecoilState(recoilIconSpotState);

  const markerRef = useRef(null);
  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao) return;
    const map = mapRef.current;
    const markers = iconSpotState.map((spot) => {
      console.log("><9><", spot.location.latitude, spot.location.longitude);
      const typeMap = {
        WALK_TOGETHER: Pet,
        ERRAND: ShoppingBag,
        TOURISM: GuidePlace,
        PLOGGING: Garbage,
      };
      const marker = new window.kakao.maps.CustomOverlay({
        map: map,
        clickable: true,
        content: `<img src=${typeMap[spot.type]} style="width: 3rem; filter: drop-shadow(0.15rem 0rem 0rem white) drop-shadow(-0.15rem 0rem 0rem white) drop-shadow(0rem 0.15rem 0rem white) drop-shadow(0rem -0.15rem 0rem white) drop-shadow(0.07rem 0.07rem 0.4rem rgba(0, 0, 0, 0.25));" />`,
        position: new window.kakao.maps.LatLng(
          Number(spot.location.latitude),
          Number(spot.location.longitude)
        ),
        xAnchor: 0.5,
        yAnchor: 0.5,
        zIndex: 2,
      });
      marker.setMap(map);
      return marker;
    });
    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [iconSpotState, loading]);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!window.kakao) return;
    const map = mapRef.current;
    if (highlight) {
      map.panTo(new window.kakao.maps.LatLng(highlight.y, highlight.x));
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(highlight.y, highlight.x),
      });
      markerRef.current = marker;
      marker.setMap(map);
      return () => {
        marker.setMap(null);
      };
    }
  }, [highlight]);

  const currentLocationOverlay = useMemo(() => {
    if (loading) return null;
    if (!window.kakao) return null;
    if (!mapRef.current) return null;
    const pos = {
      lat: 36.3766263411,
      lng: 127.38719915966,
    };
    if (location.lat && location.lng) {
      pos.lat = location.lat;
      pos.lng = location.lng;
    }
    const res = new window.kakao.maps.CustomOverlay({
      map: mapRef.current,
      clickable: true,
      content: `<div style='
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: var(--pink-600);
        border: 0.25rem solid var(--gray-000);
        transform: translate(-50%, -50%);
        filter: drop-shadow(0.1rem 0.1rem 0.4rem rgba(0, 0, 0, 0.25));'>
      </div>`,
      position: new window.kakao.maps.LatLng(pos.lat, pos.lng),
      xAnchor: 0,
      yAnchor: 0,
      zIndex: 3,
    });
    res.setMap(mapRef.current);
    return res;
  }, [loading]);

  useEffect(() => {
    setMapState((prev) => ({ ...prev, loading: true }));
    const interval = setInterval(() => {
      if (window.kakao) {
        const container = mapContainerRef.current;
        const pos = {
          lat: 36.3766263411,
          lng: 127.38719915966,
        };
        if (location.lat && location.lng) {
          pos.lat = location.lat;
          pos.lng = location.lng;
        }
        const options = {
          center: new window.kakao.maps.LatLng(pos.lat, pos.lng),
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
    window.kakao.maps.event.addListener(mapRef.current, "dragend", () => {
      // Update Recoil state with new center location
      const newCenter = mapRef.current.getCenter();
      console.log("lat is ", newCenter.getLat(), "lng is ", newCenter.getLng());

      setMapState((prev) => ({
        ...prev,
        center: { lat: newCenter.getLat(), lng: newCenter.getLng() },
      }));
    });
    const map = mapRef.current;
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
    return () => {
      path1.setMap(null);
      path2.setMap(null);
      path3.setMap(null);
    };
  }, [loading, path]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!location.lat || !location.lng) return;
    if (locked) {
      map.panTo(new window.kakao.maps.LatLng(location.lat, location.lng));
    }
    if (currentLocationOverlay) {
      currentLocationOverlay.setPosition(
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
