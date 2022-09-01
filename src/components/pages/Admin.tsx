import React, { ChangeEvent } from "react";
import { AllBookings } from "../adminComponents/AllBookings";
import "../../styles/admin.scss";
import { useState, useEffect } from "react";
import { IAdminBookedRender } from "../../models/IAdminBookedProps";
import { Link } from "react-router-dom";

const search = (email: string) => {};

export const Admin = () => {
  //states
  const [bookings, setBookings] = useState<IAdminBookedRender[]>([]);
  const [searched, setSearched] = useState("");

  //get bookings and set in state
  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  //function for handeling onChange in search-input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  //search through the bookings by email.
  //set the result in bookings-state. This will render the search-result at AllBookings-component
  const searchBooking = () => {
    search(searched);
    setSearched("");

    fetch("http://localhost:8080/admin/bookings/" + searched + "/search")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  };

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
                placeholder="search by full email"
                value={searched}
                onChange={handleChange}
              />
              <button onClick={searchBooking}>SEARCH</button>
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
          {bookings.map((booking) => {
            return (
              <div key={booking._id}>
                <AllBookings
                  _id={booking._id}
                  name={booking.name}
                  email={booking.email}
                  phone={booking.phone}
                  amountOfPeople={booking.amountOfPeople}
                  date={booking.date}
                  time={booking.time}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
