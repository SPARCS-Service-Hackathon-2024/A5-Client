import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import ListSlider from "./search/ListSlider";
import { useRecoilValue } from "recoil";
import { sliderState } from "../store/map";

const PanelContainer = styled.div`
  position: absolute;
  top: 0vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  touch-action: none;
  pointer-events: none;
`;

const DragBar = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 20%;
  height: 0.3rem;
  background-color: var(--gray-200);
  border-radius: 0.2rem;
  touch-action: none;
`;

const PanelCategory = styled.div`
  width: 100%;
  height: 5rem;
  background-color: var(--gray-000);
  border-bottom: 0.18rem solid var(--gray-100);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  > div {
    padding-bottom: 1.5rem;
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

const panelTop = 18; // vh
const panelBottom = 13; // vh
export default function SearchPanel() {
  const panelRef = useRef(null);
  const { menu } = useRecoilValue(sliderState);

  const [panelPos, setPanelPos] = useState(1); // 0 ~ 1
  const panelPosRef = useRef(panelPos);
  const [isDragging, setIsDragging] = useState(false);

  const onTouchMove = (e) => {
    const touch = e.touches[0];
    const y = ((touch.clientY - 18) / window.innerHeight) * 100;
    const currentPanelPos = (y - panelTop) / (100 - panelTop - panelBottom);
    if (currentPanelPos >= 0 && currentPanelPos <= 1) {
      console.log("move", panelPos * (100 - panelTop - panelBottom) + panelTop);
      setPanelPos(currentPanelPos);
      panelPosRef.current = currentPanelPos;
    }
  };

  const onTouchEnd = (e) => {
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("touchend", onTouchEnd);
    // snap to 0, 0.5, 1
    if (panelPosRef.current < 0.25) setPanelPos(0);
    else if (panelPosRef.current < 0.75) setPanelPos(0.5);
    else setPanelPos(1);
    setIsDragging(false);
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
  };

  return (
    <PanelContainer>
      <div
        ref={panelRef}
        style={{
          position: "absolute",
          top: `${panelPos * (100 - panelTop - panelBottom) + panelTop}vh`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "100vw",
          height: "100vh",
          backgroundColor: "var(--gray-000)",
          borderRadius: "1rem 1rem 0 0",
          transition: isDragging ? "none" : "top 0.3s",
          pointerEvents: "auto",
          overflow: "hidden",
        }}
      >
        <DragBar onTouchStart={onTouchStart} />
        <PanelCategory>
          <div>{menu !== "주변 산책로" && menu.concat(", 가치가유!")}</div>
        </PanelCategory>
        <ListSlider
          ref={panelRef}
          style={{
            height: `${100 - 0.5 * (100 - panelTop - panelBottom) - panelBottom - 20}vh`,
          }}
        />
      </div>
    </PanelContainer>
  );
}
