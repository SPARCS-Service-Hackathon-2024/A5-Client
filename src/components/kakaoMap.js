import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { mapState } from "../store/map";
import styled from "styled-components";
import { BiCurrentLocation } from "react-icons/bi";
import { MdEditLocationAlt } from "react-icons/md";
import Input from "@mui/material/Input";
import CircularProgress from "@mui/material/CircularProgress";

function KakaoMap({ id }) {
  const [center, setCenter] = useState({
    lat: 37.5878109,
    lng: 127.0017424,
  });
  const [map, setMap] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [{ data, loading }, setMapState] = useRecoilState(mapState);
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCenter({
        lat: coords.latitude,
        lng: coords.longitude,
      });
      setMapState((state) => ({
        ...state,
        radius: 1000,
        center: {
          lat: coords.latitude,
          lng: coords.longitude,
        },
      }));
    });
  };
  const getLocation = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const lng = map.getCenter().getLng();
    const lat = map.getCenter().getLat();
    geocoder.coord2RegionCode(lng, lat, (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].region_type === "H") {
            setMapState((state) => ({
              ...state,
              location: `${result[i].region_1depth_name} ${result[i].region_2depth_name}`,
            }));
            break;
          }
        }
      }
    });
  };
  const renderMarkers = () => {
    if (data.length === 0) {
      getLocation();
      return;
    }
    const bounds = new window.kakao.maps.LatLngBounds();
    const markers = [];
    for (let i = 0; i < data.length; i++) {
      markers.push({
        position: {
          lat: data[i].y,
          lng: data[i].x,
        },
        content: data[i].name,
        id: data[i].id,
      });
      bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    }
    map.setBounds(bounds); // 지도 범위 재설정
    getLocation();
  };

  // 현위치 가져오기
  useEffect(() => {
    if (data) return;
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (!map || !data) return;
    renderMarkers();
  }, [map, data]);
  return center ? (
    <>
      {loading && (
        <Loading>
          <CircularProgress sx={{ color: "white" }} />
        </Loading>
      )}
      <MapWrapper>
        {showInput && !id && <Input />}
        <Map
          center={center}
          onCreate={setMap}
          style={{ flexGrow: "1", height: "100%", position: "relative" }}
        />
        {!id && (
          <>
            <div className="button-wrapper">
              <button onClick={getCurrentPosition} className="location-button">
                <BiCurrentLocation />
              </button>
              <button
                className={showInput ? "active" : ""}
                onClick={() => setShowInput((state) => !state)}
              >
                <MdEditLocationAlt />
              </button>
            </div>
          </>
        )}
      </MapWrapper>
    </>
  ) : null;
}

const Loading = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: white;
    color: black;
    border-radius: 8px;
    font-size: 1.5rem;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 0.1rem;
    &.active {
      background-color: black;
      color: white;
    }
  }
  .button-wrapper {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
  }
  .search-button {
    position: absolute;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    z-index: 2;
  }
`;

// const Label = styled.div`
//   position: relative;
//   border-radius: 6px;
//   box-shadow: 0px 1px 2px #888;
//   color: black;
//   background-color: ${({ theme }) => theme.color.gachiPink};
//   padding: 0.5rem 1rem;
//   cursor: pointer;
//   &::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 50%;
//     width: 0;
//     height: 0;
//     border: 10px solid transparent;
//     border-top-color: ${({ theme }) => theme.color.gachiPink};
//     border-bottom: 0;
//     margin-left: -10px;
//     margin-bottom: -10px;
//   }
//   &::before {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 50%;
//     width: 0;
//     height: 0;
//     border: 15px solid transparent;
//     border-top-color: #888;
//     opacity: 0.4;
//     border-bottom: 0;
//     margin-left: -15px;
//     margin-bottom: -11px;
//     z-index: -1;
//   }
// `;

export default React.memo(KakaoMap);
