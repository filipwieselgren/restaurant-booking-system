import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { IBooking } from "../../models/IBooking";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.scss";
import "../../styles/components-style/adminStyles/_singleBooking.scss";

//COMPONENT
export const SingleBooking = () => {
  //set variables
  const params = useParams();
  const navigate = useNavigate();

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

  //prevent from submit
  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  //fetch all bookings in array and find single booking. Set single booking in state
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

  //delete single booking
  const deleteBooking = () => {
    fetch(
      "http://localhost:8080/admin/bookings/" + singleBooking._id + "/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: null, //if you do not want to send any addional data,  replace the complete JSON.stringify(YOUR_ADDITIONAL_DATA) with null
      }
    );
    navigate("/admin");
  };

  //update singleBooking-state every time an input is edited
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSingleBooking({ ...singleBooking, [e.target.name]: e.target.value });
  };

  //save changes "Spara"
  const saveChanges = () => {
    console.log(singleBooking);

    fetch(
      "http://localhost:8080/admin/bookings/" + singleBooking._id + "/edit",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify(singleBooking),
      }
    );

    navigate("/admin");
  };

  //tsx
  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <form onSubmit={preventSubmit}>
          <h3>Bokningsdetaljer</h3>
          <div className="bookingDiv">
            <div>
              <h3>Antal personer</h3>
              <input type="number" name="amount" />
            </div>

            <div>
              <h3>Datum</h3>
              <input type="date" name="date" />
            </div>

            <div>
              <h3>Tid</h3>
              <input type="number" name="time" />
            </div>
          </div>

          <h3>Personuppgifter</h3>
          <div className="detailsDiv">
            <h3>Namn</h3>
            <input
              type="text"
              name="name"
              defaultValue={singleBooking.name}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDiv">
            <h3>E-post</h3>
            <input
              type="text"
              name="email"
              defaultValue={singleBooking.email}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDiv">
            <h3>Telefonnummer</h3>
            <input
              type="text"
              name="phone"
              value={singleBooking.phone}
              onChange={handleChange}
            />
          </div>
          <div className="inputDiv">
            <button onClick={saveChanges}>spara ändringar</button>
            <button onClick={deleteBooking}>ta bort bokning</button>
          </div>
        </form>

        <button>Avbryt</button>
      </div>
    </div>
  );
};
