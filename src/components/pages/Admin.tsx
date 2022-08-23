import React from "react";
import { AllBookings } from "../adminComponents/AllBookings";
import "../../styles/admin.scss";
import { useState, useEffect } from "react";

import { IBooking } from "../../models/IBooking";

export const Admin = () => {
  //skapar state med tom lista
  const [bookings, setBookings] = useState<IBooking[]>([]);

  //hämtar alla objekt från databasen och sätter in i listan
  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <div className="buttonDiv">
          <input className="input" type="text" />
          <div className="button"></div>
        </div>
        <div className="headlinesDiv"></div>

        {bookings.map((booking) => {
          return (
            <AllBookings
              name={booking.name}
              email={booking.email}
              phone={booking.phone}
              amountOfPeople={booking.amountOfPeople}
              date={booking.date}
              time={booking.time}
            />
          );
        })}
      </div>
    </div>
  );
};
