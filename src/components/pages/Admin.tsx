import React, { ChangeEvent } from "react";
import { AllBookings } from "../adminComponents/AllBookings";
import "../../styles/admin.scss";
import { useState, useEffect } from "react";
import { IAdminBookedRender } from "../../models/IAdminBookedProps";
import { Link } from "react-router-dom";

export const Admin = () => {
  //states
  const [bookings, setBookings] = useState<IAdminBookedRender[]>([]);
  const [searched, setSearched] = useState("");
  const [searchResult, setSearchResult] = useState<IAdminBookedRender[]>([]);

  //get bookings and set in state when entering admin-page
  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      });
  }, []);

  //runs everytime search-input event changes
  useEffect(() => {
    if (searched.length >= 1) {
      fetch("http://localhost:8080/admin/bookings/" + searched + "/search")
        .then((response) => response.json())
        .then((data) => setSearchResult(data));
    }
  }, [searched]);

  //runs after above code to update bookings-list with the one we search for
  useEffect(() => {
    bookings.filter((b) => {
      if (searched.length === 0) {
        setSearchResult(bookings);
      } else if (b.email.includes(searched.trim())) {
        return b;
      }
    });
  }, [searchResult, bookings, searched]);

  //JSX
  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <div className="menuWrapper">
          <div>
            <div className="add">
              {" "}
              <Link to="/booktable/searchtables">Create new</Link>{" "}
            </div>
          </div>
          <div className="inputDiv">
            <div>
              <input
                type="text"
                placeholder="search by email"
                value={searched}
                onChange={(e) => setSearched(e.target.value)}
              />
            </div>
          </div>

          <div className="headlinesDiv">
            <h3>Date</h3>
            <h3>Name</h3>
            <h3>Amount</h3>
            <h3>Time</h3>
            <h3>Mobile</h3>
          </div>
        </div>
        <div className="listWrapper">
          <AllBookings adminSearch={searchResult} />
        </div>
      </div>
    </div>
  );
};
