import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { IBooked } from "../../models/IBooked";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/admin.scss";
import "../../styles/components-style/adminStyles/_singleBooking.scss";
import { response } from "express";

//COMPONENT

export const SingleBooking = () => {
  //STATES
  //state for all bookings
  const [bookings, setBookings] = useState<IBooked[]>([]);
  //state for a single Booking
  const [singleBooking, setSingleBooking] = useState<IBooked>({
    name: "",
    email: "",
    phone: 0,
    amountOfPeople: 0,
    date: "",
    time: 0,
    _id: "",
  });
  //state for checking avaliability of date
  const [avaDate, setAvaDate] = useState({});
  const [freeatsix, setfreeatsix] = useState<Boolean>(false);
  const [freeatnine, setfreeatnine] = useState<Boolean>(false);

  //set variables
  const params = useParams();
  const navigate = useNavigate();

  const updateSix = () => {
    for (const [key, value] of Object.entries(avaDate)) {
      if (key === "sixaclock" && value === true) {
        setfreeatsix(true);
      } else {
        setfreeatsix(false);
      }
    }
  };

  const updateNine = () => {
    for (const [key, value] of Object.entries(avaDate)) {
      if (key === "nineaclock" && value === true) {
        setfreeatnine(true);
      } else {
        setfreeatnine(false);
      }
    }
  };

  //prevent from submit
  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  //HOOKS AND FUNCTIONS
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

  //deleteBooking-function. Deletes booking
  const deleteBooking = () => {
    fetch(
      "http://localhost:8080/admin/bookings/" + singleBooking._id + "/delete",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      }
    );
    navigate("/admin");
  };

  //checkAva-function. Checks avaliability every time a DATE is chosen in calendar
  const checkAva = () => {
    fetch("http://localhost:8080/booktable/searchtables/" + singleBooking.date)
      .then((response) => response.json())
      .then((data) => setAvaDate(data));

    updateNine();
    updateSix();
  };

  //handleChange-function. Updates singleBooking-state every time an input is edited
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      setSingleBooking({ ...singleBooking, [e.target.name]: +e.target.value });
    } else {
      setSingleBooking({ ...singleBooking, [e.target.name]: e.target.value });
    }
  };

  // updateTime-function. Updates singleBookings-state when the time-dropwdown-select changes
  const updateTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSingleBooking({
      ...singleBooking,
      [event.target.name]: event.target.value,
    });
  };

  //saveChanges-function. Creates a POST when admin saves the changes.
  const saveChanges = () => {
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

  //JSX
  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <form onSubmit={preventSubmit}>
          <h3>Bokningsdetaljer</h3>
          <div className="bookingDiv">
            <div>
              <h3>Antal personer</h3>
              <input
                type="number"
                name="amountOfPeople"
                value={singleBooking.amountOfPeople}
                onChange={handleChange}
                min="1"
                max="6"
              />
            </div>

            <div>
              <h3>Datum</h3>
              <input
                type="date"
                name="date"
                value={new Date(singleBooking.date).toLocaleDateString()}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} //block previous dates
              />
            </div>

            <div>
              <h3>Tid</h3>

              <select
                name="time"
                value={singleBooking.time}
                onChange={updateTime}
              >
                <option value="18">18</option>

                <option value="21">21</option>
              </select>
            </div>
          </div>
          <div>
            <b>
              {freeatsix
                ? " true, finns tider kl 18... "
                : " false, fullbokat kl 18... "}
            </b>
            <b>
              {freeatnine
                ? " true, finns tider kl 21"
                : " false, fullbokat kl 21 "}
            </b>
          </div>
          <button onClick={checkAva}>kolla tillgänglighet</button>

          <h3>Personuppgifter</h3>
          <div className="detailsDiv">
            <h3>Namn</h3>
            <input
              type="text"
              name="name"
              value={singleBooking.name}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDiv">
            <h3>E-post</h3>
            <input
              type="text"
              name="email"
              value={singleBooking.email}
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
