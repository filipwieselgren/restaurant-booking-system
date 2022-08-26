import { CalendarComponent } from "../bookingComponents/CalendarComponent";
import "../../styles/bookings.scss";
import { AmountOfPeople } from "../bookingComponents/AmountOfPeople";
import { IBooking } from "../../models/IBooking";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TimeForm } from "../bookingComponents/TimeForm";
import { PersonData } from "../bookingComponents/Persondata";
import { IPersonData } from "../../models/IPersondata";
import axios from "axios";
import { ITablesAvalible } from "../../models/ITablesAvalibles";
import { time } from "console";

export const Bookings = () => {
  const [isActiveCalendar, setIsActiveCalendar] = useState(true);
  const [isActiveTime, setIsActiveTime] = useState(false);
  const [isActivePersonData, setIsActivePersonData] = useState(false);
  const [times, setTimes] = useState<ITablesAvalible>({
    nineaclock: false,
    sixaclock: false,
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showPersondata, setShowPersondata] = useState(false);
  const [booking, setBooking] = useState<IBooking>({
    name: "",
    amountOfPeople: 0,
    date: "",
    time: 0,
    email: "",
    phone: 0,
  });

  const url = useLocation();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Gå vidare");
  const [activeCancelButton, setActiveCancelButton] = useState(false);
  const [showFullyBookedText, setShowFullyBookedText] =
    useState<boolean>(false);
  const [startUseEffect, setStartUseEffect] = useState<boolean>(false);
  const [test, setTest] = useState<boolean>(false);
  const [dateAndTimeMissing, setDateAndTimeMissing] = useState<boolean>(false);

  useEffect(() => {
    if (activeCancelButton) {
      setButtonText("Avbryt");
    } else {
      setButtonText("Gå vidare");
    }

    switchForm();
  }, [url, activeCancelButton]);

  // funktion som hämtar datum, år, dag, månad
  const getDate = (d: string) => {
    setDateAndTimeMissing(false);
    booking.date = d;
    // console.log("i bookings funktion, date:", d);
  };

  // funktion som hämtar antal personer
  const getQTY = (q: number) => {
    setDateAndTimeMissing(false);
    booking.amountOfPeople = q;
    // console.log("i bookings funktion, antal:", q);
  };

  // funktion som hämtar tid av bokning
  const getTime = (t: number) => {
    booking.time = t;
    // console.log("i bookings funktion, tid:", t);
  };

  //funktion som hämtar personuppgifter
  const getPersonData = (p: IPersonData) => {
    booking.email = p.email;
    booking.name = p.name;
    booking.phone = +p.phone;
    // console.log("i bookings funktion, person: ", p);
    // console.log("efter ha fått personData, bookings:", booking);
  };

  // console.log(booking);

  //funktion som ändrar innehåll i modal beroende på url
  const switchForm = () => {
    if (url.pathname === "/booktable/searchtables") {
      //styr vad för innehåll som visas
      setShowCalendar(true);
      setShowTime(false);
      setShowPersondata(false);

      // styr classerna
      setIsActiveCalendar(true);
      setIsActiveTime(false);
      setIsActivePersonData(false);

      //ändrar knapp till avboka
      setActiveCancelButton(false);
    }
    if (url.pathname === "/booktable/choose-time") {
      setShowTime(true);
      setShowCalendar(false);
      setShowPersondata(false);

      setIsActiveTime(true);
      setIsActiveCalendar(false);
      setIsActivePersonData(false);
    }
    if (url.pathname === "/booktable/persondata") {
      setShowPersondata(true);
      setShowTime(false);
      setShowCalendar(false);

      setIsActivePersonData(true);
      setIsActiveCalendar(false);
      setIsActiveTime(false);

      setActiveCancelButton(true);
    }
  };

  //funktioner som navigerar till rätt form via url
  const navigateToForms = (times: ITablesAvalible) => {
    if (url.pathname === "/booktable/searchtables") {
      navigate("/booktable/choose-time", {
        state: { sixtimes: times.sixaclock, ninetimes: times.nineaclock },
      });
    }
    if (url.pathname === "/booktable/choose-time") {
      booking.time !== 0
        ? navigate("/booktable/persondata")
        : console.log("Välj tid");
    }

    if (url.pathname === "/booktable/persondata") {
      navigate("/booktable");
    }
  };
  let chooseTimeAndDate = <></>;
  let fullyBooked = <></>;

  if (showFullyBookedText) {
    fullyBooked = (
      <div>We are full this day. Please choose another day! 💚</div>
    );
  } else if (showFullyBookedText == false) {
    fullyBooked = <></>;
  }

  if (dateAndTimeMissing) {
    console.log(booking.amountOfPeople);
    console.log("Time", booking.date);

    let missingData = "";
    if (booking.amountOfPeople === 0 && !booking.date) {
      missingData =
        "let us know how many people you will be and then pick a date 😇";
    } else if (booking.amountOfPeople === 0) {
      missingData = "let us know how many people you will be 😇";
    } else if (!booking.date) {
      missingData = "pick a date 😇";
    }

    chooseTimeAndDate = <div>You need to {missingData}</div>;
  } else if (dateAndTimeMissing === false) {
    chooseTimeAndDate = <></>;
  }

  const checkIfDateIsAvailable = async (d: string) => {
    let api: string = `http://localhost:8080/booktable/searchtables/${d}`;

    try {
      let response = await axios.get(api);

      setTimes(response.data);

      setStartUseEffect(true);
    } catch (error) {
      setDateAndTimeMissing(true);

      console.log(error);
    }
  };

  useEffect(() => {
    if (startUseEffect)
      if (times.nineaclock || times.sixaclock) {
        setShowFullyBookedText(false);
        navigateToForms(times);
      } else {
        setShowFullyBookedText(true);
      }
  }, [times]);

  const changeTest = (nft: string) => {
    nft === "block-time" ? setTest(true) : setTest(false);
  };

  let timeNotAvailable = <></>;
  console.log(dateAndTimeMissing);

  test ? (timeNotAvailable = <div>This time is not available 🥸</div>) : <></>;
  return (
    <section className="bookingPage">
      <article className="bookingFormsContainer">
        <div className="wichForm">
          <div className={`ifDateForm ${isActiveCalendar && "active"}`}>
            <p>Antal och datum</p>
          </div>
          <div className={`ifTimeForm ${isActiveTime && "active"}`}>
            <p>Val av tid</p>
          </div>
          <div className={`ifConfirmation ${isActivePersonData && "active"}`}>
            <p>Bekräftelse</p>
          </div>
        </div>

        {showCalendar && (
          <section className="formContainerCalendar">
            <AmountOfPeople getData={getQTY} />
            <div className="dateHeaderContainer">
              <p>Välj datum</p>
            </div>
            <CalendarComponent getData={getDate}></CalendarComponent>
          </section>
        )}

        {showTime && (
          <section className="formContainerTime">
            <TimeForm getData={getTime} times={times} changeTest={changeTest} />
          </section>
        )}

        {showPersondata && (
          <section className="formContainerPersonData">
            <PersonData
              postBookingData={booking}
              getData={getPersonData}
              /* getData={getPersonData} */
            />
          </section>
        )}

        {chooseTimeAndDate}
        {timeNotAvailable}
        {fullyBooked}
        <div className="buttonContainer">
          <button
            className={`${activeCancelButton && "cancelButton"}`}
            onClick={() => checkIfDateIsAvailable(booking.date)}
          >
            {buttonText}
          </button>
        </div>
      </article>
    </section>
  );
};
