import React from "react";
import { ChangeEvent, FormEvent } from "react";
import { useState, useEffect } from "react";
import { IAdminBookedProps } from "../../models/IAdminBookedProps";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ISixDisable } from "../../models/ITablesAvalibles";
import { INineDisable } from "../../models/ITablesAvalibles";
import { Link } from "react-router-dom";
import "../../styles/admin.scss";
import "../../styles/components-style/adminStyles/_singleBooking.scss";
import "../../styles/components-style/bookingStyles/_amountOfPeople.scss";

export const SingleBooking = () => {
  //set variables
  const params = useParams();
  const navigate = useNavigate();
  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  //STATES//
  //state for all bookings
  const [bookings, setBookings] = useState<IAdminBookedProps[]>([]);
  //state for a single Booking
  const [singleBooking, setSingleBooking] = useState<IAdminBookedProps>({
    name: "",
    email: "",
    phone: 0,
    amountOfPeople: 0,
    date: "",
    time: 0,
    _id: "",
    cancelid: 0,
    tables: 0,
  });

  //state for making drop-down disabled if no tables left
  const [tablesAtSix, setTablesAtSix] = useState<ISixDisable>({
    sixaclock: false,
    isDisabled: false,
  });
  const [tablesAtNine, setTablesAtNine] = useState<INineDisable>({
    nineaclock: false,
    isDisabled: false,
  });

  //state for disableing "save-btn" if date is fully booked
  const [disabledBtn, setDisabledBtn] = useState(false);

  //state for adding more persons to booking via checkbox
  const [changeMax, setChangeMax] = useState("6");
  const [checkbox, setCheckbox] = useState(false);

  //state for avaliability ("ava" contains returned response after checking if date is availible. Returns Object with values true/false)
  const [avalibleTime, setAvalibleTime] = useState({});

  //HOOKS//
  //fetch all bookings in array and set in bookings-state.
  useEffect(() => {
    fetch("http://localhost:8080/admin/login")
      .then((response) => response.json())
      .then((data) => setBookings(data));
  }, []);

  //find single booking. Set in singleBooking-state
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

  //disable save-button if fully booked
  useEffect(() => {
    disableButton();
    console.log(tablesAtSix, tablesAtNine);
  }, [tablesAtSix, tablesAtNine]);

  //checking avaliability when singlebooking-state is updated
  useEffect(() => {
    if (bookings.length >= 1) {
      fetch(
        "http://localhost:8080/booktable/searchtables/" +
          singleBooking.date +
          "/" +
          singleBooking.amountOfPeople
      )
        .then((response) => response.json())
        .then((data) => setAvalibleTime(data));
    }
  }, [singleBooking]);

  //set tables-states depending on time-avaliability
  useEffect(() => {
    for (const [key, value] of Object.entries(avalibleTime)) {
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
    console.log(avalibleTime);
  }, [avalibleTime]);

  //FUNCTIONS//
  //add more persons to booking
  const addMorePersons = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target.checked;
    setCheckbox(target);

    if (target) {
      setChangeMax("12");
    } else {
      setChangeMax("6");
    }
  };

  //disable "save-button" if date is fully booked
  const disableButton = () => {
    if (tablesAtSix.sixaclock || tablesAtNine.nineaclock) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  };

  //update singleBooking-object every time an PERSON DETAILS-INPUT is edited
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "number") {
      setSingleBooking({ ...singleBooking, [e.target.name]: +e.target.value });
    } else {
      setSingleBooking({ ...singleBooking, [e.target.name]: e.target.value });
    }
  };

  //update singleBookings TIME when the time-dropwdown-select changes
  const updateTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSingleBooking({
      ...singleBooking,
      [event.target.name]: event.target.value,
    });
  };

  //creates a POST when admin saves the changes.
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

  //delete single booking
  const deleteBooking = () => {
    fetch(
      `http://localhost:8080/admin/bookings/${singleBooking._id}/delete`,

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

  //JSX//
  return (
    <div className="wrapper">
      <div className="adminWrapper">
        <form onSubmit={preventSubmit}>
          <h3>Booking details</h3>
          <div className="bookingDiv">
            <div>
              <h3>Persons </h3>

              <input
                className="inputs"
                type="number"
                name="amountOfPeople"
                value={singleBooking.amountOfPeople}
                onChange={handleChange}
                min="1"
                max={changeMax}
              />
              {
                <div className="boxWrapper">
                  <div className="checkboxContainer">
                    <p>Add persons</p>
                    <div className="check">
                      <input
                        onChange={addMorePersons}
                        className="checkbox"
                        id="check"
                        type="checkbox"
                      />
                      <label className="checkbox" htmlFor="check"></label>
                    </div>
                  </div>
                </div>
              }
            </div>

            <div>
              <h3>Date </h3>
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
              <h3>Booked time: {singleBooking.time}</h3>

              <select
                className="inputs"
                name="time"
                value={singleBooking.time}
                onChange={updateTime}
              >
                <option value="" disabled selected>
                  Select time
                </option>
                <option value="18" disabled={tablesAtSix.isDisabled}>
                  18
                </option>

                <option value="21" disabled={tablesAtNine.isDisabled}>
                  21
                </option>
              </select>
            </div>
          </div>

          {/* <div className="avaBtnWrapper">
            <div className="avaBtn" onClick={checkAva}>
              See avalible times
            </div>
          </div> */}

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
            <button
              className="save"
              disabled={disabledBtn}
              onClick={saveChanges}
            >
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
