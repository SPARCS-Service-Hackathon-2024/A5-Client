import { Outlet } from "react-router-dom";
import Header from "../common/Header";

const VerifyLayout = () => {
  return (
    <>
      <Header title="자격증 인증" />
      <Outlet />
    </>
  );
};

export default VerifyLayout;
