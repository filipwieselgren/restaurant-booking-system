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
import axios from "axios";
import { validateEmailCall, validateLength } from "../../ts/validate";

export const SingleBooking = () => {
  const navigate = useNavigate();
  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

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

  const [changeMax, setChangeMax] = useState("6");
  const [checkbox, setCheckbox] = useState(false);

  const [avalibleTime, setAvalibleTime] = useState({
    sixaclock: false,
    nineaclock: false,
  });
  const [ifFullyBooked, setIfFullyBooked] = useState(false);

  const [runNextFetch, setRunNextFetch] = useState(false);

  const [isEmailError, setisEmailError] = useState(false);
  const [isPhoneError, setisPhoneError] = useState(false);
  const [isNameError, setisNameError] = useState(false);

  const [startOnChangeName, setStartOnChangeName] = useState(false);
  const [startOnChangeEmail, setStartOnChangeEmail] = useState(false);
  const [startOnChangePhone, setStartOnChangePhone] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const getSingleBooking = async () => {
      let response = axios.get<IAdminBookedProps>(
        "http://localhost:8080/admin/bookings/" + id
      );

      let promise: IAdminBookedProps = (await response).data;
      setSingleBooking(promise);
      setRunNextFetch(true);

      if (promise && promise._id === id) {
        console.log("id ok");
      } else {
        console.log("id not ok");

        navigate("/page-not-found");
      }
    };

    getSingleBooking();
  }, []);

  //checking avaliability when singlebooking-state is updated

  useEffect(() => {
    if (runNextFetch) {
      fetch(
        `http://localhost:8080/admin/${singleBooking._id}/${singleBooking.date}/${singleBooking.tables}/${singleBooking.time}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAvalibleTime(data);
        });
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
        setTablesAtNine({ nineaclock: false, isDisabled: true });
      }
    }
    maxPeople();
    notPossibleToBook();
  }, [avalibleTime, singleBooking.amountOfPeople, ifFullyBooked]);

  const notPossibleToBook = () => {
    if (singleBooking.time === 18) {
      setIfFullyBooked(!avalibleTime.sixaclock);
    } else if (singleBooking.time === 21) {
      setIfFullyBooked(!avalibleTime.nineaclock);
    } else {
      setIfFullyBooked(false);
    }
  };

  console.log("booking", singleBooking);
  console.log("ava times", avalibleTime);
  console.log("fullyBooked", ifFullyBooked);

  //FUNCTIONS//
  //add more persons to booking
  const addMorePersons = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target.checked;
    setCheckbox(target);

    if (target) {
      maxPeople();
    } else {
      setChangeMax("6");
    }
  };

  const maxPeople = () => {
    if (!ifFullyBooked) {
      setChangeMax("12");
    } else {
      setChangeMax("6");
    }
  };

  const twoHandlersName = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
    if (startOnChangeName) {
      let nameValidator = validateName();

      if (nameValidator) {
        setisNameError(true);
      } else {
        setisNameError(false);
        setStartOnChangeName(false);
      }
    }
  };
  const validateName = () => {
    let vL = validateLength(singleBooking.name, 0);

    return vL;
  };

  const twoHandlersEmail = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    if (startOnChangeEmail) {
      let emailValidator = validateEmail();

      if (emailValidator) {
        setisEmailError(false);
        setStartOnChangeEmail(false);
      } else {
        setisEmailError(true);
      }
    }
  };

  const validateEmail = () => {
    let vE = validateEmailCall(singleBooking.email);

    return vE;
  };

  const twoHandlersPhone = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);

    if (startOnChangePhone) {
      let validatorPhone = validatePhone();

      if (validatorPhone) {
        setisPhoneError(false);
        setStartOnChangePhone(false);
      } else {
        setisPhoneError(true);
      }
    }
  };

  const validatePhone = () => {
    let stringifyPhone = singleBooking.phone.toString();

    let vL = validateLength(stringifyPhone, 10);

    return vL;
  };

  //update singleBooking-object every time DATE-INPUT is edited
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSingleBooking({ ...singleBooking, [e.target.name]: e.target.value });
  };

  //update singleBooking-object every time AMOUNT-INPUT is edited
  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= 6) {
      singleBooking.tables = 1;
    } else {
      singleBooking.tables = 2;
    }
    setSingleBooking({ ...singleBooking, [e.target.name]: +e.target.value });
  };

  //update singleBookings TIME when the time-dropwdown-select changes
  const updateTime = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSingleBooking({
      ...singleBooking,
      [event.target.name]: event.target.value,
    });
  };

  //creates a POST when admin saves the changes.
  const saveChanges = async () => {
    let nameValidator = validateName();
    let emailValidator = validateEmail();
    let phoneValidator = validatePhone();

    if (nameValidator) {
      setisNameError(true);
      setStartOnChangeName(true);
    } else {
      setisNameError(false);
    }

    if (emailValidator) {
      setisEmailError(false);
    } else {
      setisEmailError(true);
      setStartOnChangeEmail(true);
    }

    if (phoneValidator) {
      setisPhoneError(false);
    } else {
      setisPhoneError(true);
      setStartOnChangePhone(true);
    }

    if (!nameValidator && emailValidator && phoneValidator) {
      await fetch(
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
    }
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
                onChange={handleAmount}
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

          <h3>Personal details</h3>
          <div className="detailsDiv">
            <h3>Name</h3>

            <input
              className={`"inputs" ${isNameError && "validateError"}`}
              type="text"
              name="name"
              value={singleBooking.name}
              onBlur={twoHandlersName}
              onChange={handleChange}
            />
          </div>

          <div className="detailsDiv">
            <h3>Email</h3>
            <input
              className={`"inputs" ${isEmailError && "validateError"}`}
              type="text"
              name="email"
              value={singleBooking.email}
              onBlur={twoHandlersEmail}
              onChange={handleChange}
            />
          </div>
          <div className="detailsDiv">
            <h3>Mobile</h3>
            <input
              className={`"inputs" ${isPhoneError && "validateError"}`}
              type="text"
              name="phone"
              value={singleBooking.phone}
              onBlur={twoHandlersPhone}
              onChange={handleChange}
            />
          </div>
          <div className="inputDiv">
            <button className="save" onClick={saveChanges}>
              Save changes
            </button>
            <button className="delete" onClick={deleteBooking}>
              Delete booking
            </button>
          </div>
        </form>

        <button className="cancel">
          <Link to="/admin">Cancel</Link>
        </button>
      </div>
    </div>
  );
};
