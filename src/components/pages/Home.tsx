import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.scss";

export const Home = () => {
  return (
    <div className="homeWrapper">
      <Link to={"/booktable/searchtables"}>
        <div className="bookButton">
          <p>Book table</p>
        </div>
      </Link>
    </div>
  );
};
