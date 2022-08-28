import React, { ChangeEvent } from "react";
import { AllBookings } from "../adminComponents/AllBookings";
import "../../styles/admin.scss";
import { useState, useEffect } from "react";
import { IBooked } from "../../models/IBooked";
import { Link } from "react-router-dom";

const search = (email: string) => {};

export const Admin = () => {
  //hämta alla bokningar och sätt dem i bookings-state
  const [bookings, setBookings] = useState<IBooked[]>([]);
  const [searched, setSearched] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  //hantera onChange i sök-input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  //sök igenom bokningarna m.h.a email i input
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
          <div className="buttonDiv">
            <div>LOGGA UT</div>
          </div>
          <div className="inputDiv">
            <div>
              <input
                type="text"
                placeholder="sök bland bokningar"
                value={searched}
                onChange={handleChange}
              />
              <button onClick={searchBooking}>SÖK</button>
            </div>
            <div>
              <button>
                {" "}
                <Link to="/admin/addbooking">Lägg till bokning</Link>{" "}
              </button>
            </div>
          </div>

          <div className="headlinesDiv">
            <h3>Datum</h3>
            <h3>Namn & e-post</h3>
            <h3>Platser</h3>
            <h3>Tid</h3>
            <h3>Telefonnummer</h3>
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
