import Footer from "../components/common/Footer";
import styled from "styled-components";
import { ReactComponent as Vertical } from "../assets/photo_vertical.svg";
import { ReactComponent as Dark } from "../assets/photo_dark.svg";
import { ReactComponent as Reflection } from "../assets/photo_reflection.svg";
import { ReactComponent as AutoTake } from "../assets/auto_photo_par.svg";
import { useNavigate } from "react-router-dom";

import { useEffect, useRef } from "react";
import axios from "axios";

const VerifyContainer = styled.div`
  height: 100vh;
  > div:first-child {
    display: flex;
    padding-top: 0.5rem;
    padding-left: 1rem;
  }
  > ul {
    color: white;
    margin-bottom: 8rem;
    position: fixed;
    bottom: 0;
    text-align: left;
    padding-right: 1rem;
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

function getDeviceStream(option) {
  if ("getUserMedia" in navigator.mediaDevices) {
    return navigator.mediaDevices.getUserMedia(option);
  } else {
    return new Promise(function (resolve, reject) {
      navigator.getUserMedia(option, resolve, reject);
    });
  }
}

export default function VerifyPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const takePhoto = async () => {
    const token = localStorage.getItem("access_token");
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    const blob = await fetch(data).then((res) => res.blob());
    const file = new File([blob], "certification.png", { type: "image/png" });

    stopStream();

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    const formData = new FormData();
    formData.append("certificationImage", file);
    try {
      const res = await axios.post("/api/certifications", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/verify-success");
    } catch (err) {
      navigate("/verify-fail");
    }
  };
  const stopStream = () => {
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
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
        <Dark />
        <Reflection />
      </IconContainer>
      <ul>
        <li>복사본이나 사진은 사용할 수 없습니다.</li>
        <li>정보 확인이 어렵거나 훼손된 자격증은 인증이 반려될 수 있습니다.</li>
      </ul>
      <Footer second="촬영하기" funct={takePhoto} />
    </VerifyContainer>
  );
}
