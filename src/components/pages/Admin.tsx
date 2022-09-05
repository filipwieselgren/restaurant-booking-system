import React, { ChangeEvent } from "react";
import { AllBookings } from "../adminComponents/AllBookings";
import "../../styles/admin.scss";
import { useState, useEffect } from "react";
import { IAdminBookedRender } from "../../models/IAdminBookedProps";
import { Link } from "react-router-dom";
import { getSuggestedQuery } from "@testing-library/react";

const search = (email: string) => {};

export const Admin = () => {
  //states
  const [bookings, setBookings] = useState<IAdminBookedRender[]>([]);
  const [searched, setSearched] = useState("");

  //get bookings and set in state when entering admin-page
  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  //runs everytime search-input event changes
  useEffect(() => {
    fetch("http://localhost:8080/admin/bookings/" + searched + "/search")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, [searched]);

  //runs after above code to update bookings-list with the one we search for
  useEffect(() => {
    bookings.filter((b) => {
      if (searched === "") {
        return b;
      } else if (b.email.includes(searched)) {
        return b;
      }
    });
  }, [bookings]);

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
          <AllBookings adminRender={bookings} />
        </div>
      </div>
    </div>
  );
};
