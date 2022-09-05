import React from "react";
import { Link } from "react-router-dom";
import "../../styles/layout/navigation.scss";
const logoImg = require("../../assets/logo.png");

export const Navigation = () => {
  return (
    <div className="navWrapper">
      <div className="loginWrapper">
        {" "}
        <Link to={"/admin/login"}>
          <div className="loginBtn">Admin? Log in here!</div>
        </Link>
      </div>
      <div className="logonmenu">
        <div className="logoWrapper">
          <Link to={"/"}>
            <div className="logo">
              <img src={logoImg} alt="logotype" />
            </div>
          </Link>
        </div>
        <div className="menuWrapper">
          <Link to={"/meny"}>
            <div className="menuBtn">Our menu</div>
          </Link>
          <Link to={"/contact"}>
            <div className="contactBtn">Contact us</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
