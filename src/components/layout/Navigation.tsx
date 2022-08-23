import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navigation.scss";

export const Navigation = () => {
  return (
    <div className="navWrapper">
      <div className="logoWrapper">
        <Link to={"/"}>
          <div className="logo">LOGGA</div>
        </Link>
      </div>
      <div className="menuWrapper">
        <Link to={"/meny"}>
          <div className="menuBtn">MENY</div>
        </Link>
        <Link to={"/kontakt"}>
          <div className="contactBtn">KONTAKT</div>
        </Link>
      </div>
    </div>
  );
};
