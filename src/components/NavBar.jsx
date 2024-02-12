
import React, { useState } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const [selected, setSelected] = useState("home");
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