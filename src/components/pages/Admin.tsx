import React from "react";
import { AllBookings } from "../adminComponents/AllBookings";
import "../../styles/admin.scss";
import { useState, useEffect } from "react";
import { IBooked } from "../../models/IBooked";

export const Admin = () => {
  //hämta alla bokningar och sätt dem i bookings-state
  const [bookings, setBookings] = useState<IBooked[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  //sök bland bokningar
  const searchBooking = () => {
    for (let i = 0; i < bookings.length; i++) {
      const email = bookings[i].email;

      // fetch("http://localhost:8080/admin/bookings/" + email + "/search")
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));
    }
  };

  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <div className="menuWrapper">
          <div className="buttonDiv">
            <div>LOGGA UT</div>
          </div>
          <div className="inputDiv">
            <input type="text" placeholder="sök bland bokningar" />
            <button onClick={searchBooking}>SÖK</button>
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
