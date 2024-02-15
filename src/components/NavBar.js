import React, { useState } from "react";
import "../style/NavBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as House } from "../assets/house.svg";
import { ReactComponent as GrayHouse } from "../assets/gray_house.svg";
import { ReactComponent as GachiLogo } from "../assets/gachi_gayu.svg";
import { ReactComponent as GrayGachiLogo } from "../assets/gray_gachi_gayu.svg";
import { ReactComponent as Person } from "../assets/person.svg";
import { ReactComponent as GrayPerson } from "../assets/gray_person.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const [naviMenu, setNaviMenu] = useState(1);

  return (
    <div className="navbar-container">
      {naviMenu === 1 ? (
        <GachiLogo />
      ) : (
        <GrayGachiLogo
          onClick={() => {
            setNaviMenu(1);
            navigate("/search");
          }}
        />
      )}
      {naviMenu === 2 ? (
        <House />
      ) : (
        <GrayHouse
          onClick={() => {
            setNaviMenu(2);
            navigate("/home");
          }}
        />
      )}
      {naviMenu === 3 ? (
        <Person />
      ) : (
        <GrayPerson
          onClick={() => {
            setNaviMenu(3);
            navigate("/profile");
          }}
        />
      )}
    </div>
  );
}
