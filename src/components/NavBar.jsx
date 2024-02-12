
import styled from "@emotion/styled";
import React, { useState } from "react";
import "./NavBar.css";

export default function NavBar() {
  // A navbar layout
  const [selected, setSelected] = useState("home");

  const btns = {
    "search": {
      icon: "fas fa-search",
      callback: () => setSelected("search")
    },
    "home": {
      icon: "fas fa-home",
      callback: () => setSelected("home")
    },
    "profile": {
      icon: "fas fa-user",
      callback: () => setSelected("profile")
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