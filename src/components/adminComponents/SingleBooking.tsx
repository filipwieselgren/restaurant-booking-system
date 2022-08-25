import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { IBooking } from "../../models/IBooking";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/admin.scss";
import "../../styles/components-style/adminStyles/_singleBooking.scss";

//COMPONENT
export const SingleBooking = () => {
  const params = useParams();

  //state for all bookings, a single Booking and each editable item
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [singleBooking, setSingleBooking] = useState<IBooking>({
    name: "",
    email: "",
    phone: 0,
    amountOfPeople: 0,
    date: "",
    time: 0,
    _id: "",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  //fetch all bookings in array
  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  //loop booking-array and find booking by params-id
  useEffect(() => {
    if (params.id) {
      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i]._id === params.id) {
          setSingleBooking(bookings[i]);
        } else {
        }
      }
    }
  }, [bookings]);

  //changeEvent for each item in editable input-fields
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  //tsx
  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <form action="#" method="post">
          <h3>Bokningsdetaljer</h3>
          <div className="bookingDiv">
            <div>
              <h3>Antal personer</h3>
              <input
                type="number"
                id="amount"
                value={singleBooking.amountOfPeople}
                onChange={handleAmount}
              />
            </div>

            <div>
              <h3>Datum</h3>
              <input
                type="date"
                id="date"
                value={singleBooking.date}
                onChange={handleDate}
              />
            </div>

            <div>
              <h3>Tid</h3>
              <input
                type="number"
                id="time"
                value={singleBooking.time}
                onChange={handleTime}
              />
            </div>
          </div>

          <h3>Personuppgifter</h3>
          <div className="detailsDiv">
            <h3>Namn</h3>
            <input
              type="text"
              id="name"
              value={singleBooking.name}
              onChange={handleName}
            />
          </div>
          <div className="detailsDiv">
            <h3>E-post</h3>
            <input
              type="text"
              id="email"
              value={singleBooking.email}
              onChange={handleEmail}
            />
          </div>
          <div className="detailsDiv">
            <h3>Telefonnummer</h3>
            <input
              type="text"
              id="phone"
              value={singleBooking.phone}
              onChange={handlePhone}
            />
          </div>
          <div className="inputDiv">
            <input type="submit" value="Spara ändringar" />
            <input type="submit" value="Ta bort bokning" />
          </div>
        </form>
        <button>Avbryt</button>
      </div>
    </div>
  );
};
