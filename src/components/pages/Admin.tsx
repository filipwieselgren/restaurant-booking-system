import React from "react";
import { AllBookings } from "../adminComponents/AllBookings";
import "../../styles/admin.scss";
import { useState, useEffect } from "react";

import { IBooking } from "../../models/IBooking";

export const Admin = () => {
  //states
  const [bookings, setBookings] = useState<IBooking[]>([]);

  //fetch
  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <div className="menuWrapper">
          <div className="buttonDiv">
            <div>LOGGA UT</div>
          </div>
          <div className="inputDiv">
            <input type="text" />
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
