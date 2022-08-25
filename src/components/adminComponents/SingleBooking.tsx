import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { IBooking } from "../../models/IBooking";
import { useParams } from "react-router-dom";
import "../../styles/admin.scss";
import "../../styles/components-style/adminStyles/_singleBooking.scss";

export const SingleBooking = () => {
  const params = useParams();

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

  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

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

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return (
    <div>
      <div className="wrapper">
        <div className="adminWrapper">
          <div className="listWrapper">
            <div className="editWrapper">
              <div className="editBookingDiv">
                <h2>Bokning</h2>
                <p>
                  {singleBooking.amountOfPeople} personer, {singleBooking.date}{" "}
                  kl: {singleBooking.time}
                </p>
                <div className="editBtn">Ändra</div>
              </div>

              <form action="#" method="post">
                <div className="bookingDiv">
                  <h3>Namn</h3>
                  <input
                    type="text"
                    id="name"
                    value={singleBooking.name}
                    onChange={handleName}
                  />
                </div>
                <div className="bookingDiv">
                  <h3>E-post</h3>
                  <input
                    type="text"
                    id="email"
                    value={singleBooking.email}
                    onChange={handleEmail}
                  />
                </div>
                <div className="bookingDiv">
                  <h3>Telefonnummer</h3>
                  <input
                    type="text"
                    id="phone"
                    value={singleBooking.phone}
                    onChange={handlePhone}
                  />
                </div>
                <div className="inputDiv">
                  <input type="submit" value="Spara" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
