import React, { useState } from "react";
import "../style/NavBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as House } from "../assets/house.svg";
import { ReactComponent as GrayHouse } from "../assets/gray_house.svg";
import { ReactComponent as GachiLogo } from "../assets/gachi_gayu.svg";
import { ReactComponent as GrayGachiLogo } from "../assets/gray_gachi_gayu.svg";
import { ReactComponent as Person } from "../assets/person.svg";
import { ReactComponent as GrayPerson } from "../assets/gray_person.svg";

import searchIcon from "../assets/gray_gachi_gayu.svg";
import homeIcon from "../assets/gray_house.svg";
import profileIcon from "../assets/gray_person.svg";

import selectedSearchIcon from "../assets/pink_gachi_gayu.svg";
import selectedHomeIcon from "../assets/house.svg";
import selectedProfileIcon from "../assets/person.svg";
import { styled } from "styled-components";

const Icon = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  height: 2.5rem;
  transform: translate(-50%, ${(props) => (props.selected ? "-50%" : "-42%")});
  opacity: ${(props) => (props.selected ? 0 : 1)};
  transition:
    opacity 0.3s,
    transform 0.3s;
`;

const SelectedIcon = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  height: 2.5rem;
  transform: translate(-50%, ${(props) => (props.selected ? "-50%" : "-42%")});
  opacity: ${(props) => (props.selected ? 1 : 0)};
  /* filter: drop-shadow(0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.13)); */
  transition:
    opacity 0.3s,
    transform 0.3s;
`;

export default function NavBar() {
  const navigate = useNavigate();

  const clickIcon = (name) => {
    navigate(`/${name}`);
  };

  const location = useLocation();

  const selected = location.pathname.split("/")[1];

  const btns = {
    search: {
      icon: searchIcon,
      selectedIcon: selectedSearchIcon,
      callback: () => clickIcon("search"),
    },
    home: {
      icon: homeIcon,
      selectedIcon: selectedHomeIcon,
      callback: () => clickIcon("home"),
    },
    profile: {
      icon: profileIcon,
      selectedIcon: selectedProfileIcon,
      callback: () => clickIcon("profile"),
    },
  };

  return (
    <div className="navbar-container">
      {Object.keys(btns).map((key) => (
        <span key={key} style={{ position: "relative" }}>
          <Icon
            src={btns[key].icon}
            onClick={btns[key].callback}
            selected={selected === key}
          />
          <SelectedIcon
            src={btns[key].selectedIcon}
            onClick={btns[key].callback}
            selected={selected === key}
          />
        </span>
      ))}
    </div>
  );
}
