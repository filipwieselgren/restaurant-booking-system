import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const Home = () => {
  return (
    <div className="homeWrapper">
      <Link to={"/booktable/searchtables"}>
        <div className="bookButton">
          <p>Boka bord</p>
        </div>
      </Link>
      <div className="adminLinkWrapper">
        <Link to={"/admin"}>
          <p>Admin? Logga in här</p>
        </Link>
      </div>
    </div>
  );
};
