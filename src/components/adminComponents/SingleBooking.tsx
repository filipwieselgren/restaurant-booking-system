import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { IBooked } from "../../models/IBooked";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ISixDisable } from "../../models/ITablesAvalibles";
import { INineDisable } from "../../models/ITablesAvalibles";
import { Link } from "react-router-dom";
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

  //state for making drop-down disabled if no tables left
  const [tablesAtSix, setTablesAtSix] = useState<ISixDisable>({
    sixaclock: false,
    isDisabled: false,
  });
  const [tablesAtNine, setTablesAtNine] = useState<INineDisable>({
    nineaclock: false,
    isDisabled: false,
  });

  const [disabled, setDisabled] = useState<Boolean>(false);

  //set variables
  const params = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (tablesAtSix && tablesAtNine) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [tablesAtSix, tablesAtNine]);

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

  //set state till true/false beroende på tillgänglighet
  const renderAva = () => {
    for (const [key, value] of Object.entries(avaDate)) {
      if (key === "sixaclock" && value === true) {
        setTablesAtSix({ sixaclock: true, isDisabled: false });
      } else if (key === "sixaclock" && value === false) {
        setTablesAtSix({ sixaclock: false, isDisabled: true });
      }

      if (key === "nineaclock" && value === true) {
        setTablesAtNine({ nineaclock: true, isDisabled: false });
      } else if (key === "nineaclock" && value === false) {
        setTablesAtNine({ nineaclock: false, isDisabled: false });
      }
    }
  };

  //checkAva-function. Checks avaliability every time a DATE is chosen in calendar
  const checkAva = () => {
    fetch("http://localhost:8080/booktable/searchtables/" + singleBooking.date)
      .then((response) => response.json())
      .then((data) => setAvaDate(data));
    renderAva();
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
          <h3>Booking details</h3>
          <div className="bookingDiv">
            <div>
              <h3>Persons</h3>

              <input
                className="inputs"
                type="number"
                name="amountOfPeople"
                value={singleBooking.amountOfPeople}
                onChange={handleChange}
                min="1"
                max="6"
              />
            </div>

            <div>
              <h3>Date</h3>
              <input
                className="inputs"
                type="date"
                name="date"
                value={new Date(singleBooking.date).toLocaleDateString()}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]} //block previous dates
              />
            </div>

            <div>
              <h3>Time</h3>

              <select
                className="inputs"
                name="time"
                value={singleBooking.time}
                onChange={updateTime}
              >
                <option value="18" disabled={tablesAtSix.isDisabled}>
                  18
                </option>

                <option value="21" disabled={tablesAtNine.isDisabled}>
                  21
                </option>
              </select>
            </div>
          </div>
          <div>
            {tablesAtSix.sixaclock
              ? "ja kl 18"
              : "fullbokat kl 18 DETTA SKA BORT SEN"}
          </div>
          <div>
            {tablesAtNine.nineaclock
              ? "ja kl 21"
              : "fullbokat kl 21 DETTA SKA BORT SEN"}
          </div>
          <button onClick={checkAva}>Update avalible times</button>

          <h3>Personal details</h3>
          <div className="detailsDiv">
            <h3>Name</h3>
            <input
              className="inputs"
              type="text"
              name="name"
              value={singleBooking.name}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDiv">
            <h3>Email</h3>
            <input
              className="inputs"
              type="text"
              name="email"
              value={singleBooking.email}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDiv">
            <h3>Mobile</h3>
            <input
              className="inputs"
              type="text"
              name="phone"
              value={singleBooking.phone}
              onChange={handleChange}
            />
          </div>
          <div className="inputDiv">
            <button className="save" onClick={saveChanges}>
              Save changes
            </button>
            <div className="delete" onClick={deleteBooking}>
              Delete booking
            </div>
          </div>
        </form>

        <div className="cancel">
          <Link to="/admin">Cancel</Link>
        </div>
      </div>
    </div>
  );
};
