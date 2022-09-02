import React from "react";
import "../styles/admin.scss";
import "../styles/notfound.scss";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div>
      <div className="wrapper">
        <div className="adminWrapper">
          <div className="notFoundDiv">
            <h1>404 not found</h1>
            <p>Ooooops! Something went wrong.</p>
            <p>
              <Link className="link" to="/">
                Click here
              </Link>{" "}
              to get back to start
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
