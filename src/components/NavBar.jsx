
import React, { useState } from "react";
import "../style/NavBar.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname.split("/")[1]);
  const navigate = useNavigate();

  const clickIcon = (name) => {
    setSelected(name);
    navigate(`/${name}`);
  };

  const btns = {
    "search": {
      icon: "fas fa-search",
      callback: () => clickIcon("search")
    },
    "home": {
      icon: "fas fa-home",
      callback: () => clickIcon("home")
    },
    "profile": {
      icon: "fas fa-user",
      callback: () => clickIcon("profile")
    }
  }

  return (
    <div className="navbar-container">
      {Object.keys(btns).map((key) => (
        <i
          key={key}
          className={`navicon ${selected === key ? "selected" : ""} ${btns[key].icon}`}
          onClick={btns[key].callback}
        />
      ))}
    </div>
  );
}