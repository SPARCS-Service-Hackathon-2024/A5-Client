import { Outlet } from "react-router-dom";
import Header from "../common/Header";

const CheckPhotoLayout = () => {
  return (
    <>
      <Header title="인증사진 촬영" />
      <Outlet />
    </>
  );
};

export default CheckPhotoLayout;
