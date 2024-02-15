import Footer from "../components/common/Footer";
import styled from "styled-components";
import { ReactComponent as Vertical } from "../assets/photo_vertical.svg";
import { ReactComponent as PhotoGuide } from "../assets/face_or_activity.svg";
import { ReactComponent as AutoTake } from "../assets/auto_photo_par.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function getDeviceStream(option) {
  if ("getUserMedia" in navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(option);
  } else {
    return new Promise(function (resolve, reject) {
      navigator.getUserMedia(option, resolve, reject);
    });
  }
}

const VerifyContainer = styled.div`
  height: calc(100vh - 5rem);
  overflow: hidden;
  > div:first-child {
    display: flex;
    padding-top: 0.5rem;
    padding-left: 1rem;
  }
`;
const VideoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 4rem);
  overflow: hidden;
`;
const Video = styled.video`
  height: 100vh;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  right: 0;
  > svg {
    margin: 1rem 0;
    opacity: 0.8;
  }
`;

export default function CheckPhotoPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    localStorage.setItem("photo", data);
    stopStream();
    navigate("/check-photo-done");
  };

  useEffect(() => {
    (async () => {
      const video = videoRef.current;
      const stream = await getDeviceStream({
        video: { width: 720 },
        audio: false,
      });
      video.srcObject = stream;
    })();
  }, []);

  const stopStream = () => {
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
  };

  return (
    <VerifyContainer>
      <VideoContainer>
        <Video ref={videoRef} id="myVideo" autoPlay />
      </VideoContainer>
      <div>
        <AutoTake />
      </div>
      <IconContainer>
        <Vertical />
        <PhotoGuide />
      </IconContainer>
      <Footer second="촬영하기" funct={takePhoto} />
    </VerifyContainer>
  );
}
