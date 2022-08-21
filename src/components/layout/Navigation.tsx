import React from "react";
import "../../styles/navigation.scss";

export const Navigation = () => {
  return (
    <div className="navWrapper">
      <div>
        <div className="logo">LOGGA</div>
      </div>
      <div>
        <div className="menuBtn">MENY</div>
        <div className="contactBtn">KONTAKT</div>
      </div>
    </div>
  );
};
