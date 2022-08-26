import { CalendarComponent } from "../bookingComponents/CalendarComponent";
import "../../styles/bookings.scss";
import { AmountOfPeople } from "../bookingComponents/AmountOfPeople";
import { IBooking } from "../../models/IBooking";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TimeForm } from "../bookingComponents/TimeForm";
import { PersonData } from "../bookingComponents/Persondata";
import { IPersonData } from "../../models/IPersondata";

export const Bookings = () => {
  const [isActiveCalendar, setIsActiveCalendar] = useState(true);
  const [isActiveTime, setIsActiveTime] = useState(false);
  const [isActivePersonData, setIsActivePersonData] = useState(false);

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
    tables: 0,
  });

  const url = useLocation();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Gå vidare");
  const [activeCancelButton, setActiveCancelButton] = useState(false);

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
    booking.date = d;
    console.log("i bookings funktion, date:", d);
  };

  // funktion som hämtar antal personer
  const getQTY = (q: number) => {
    booking.amountOfPeople = q;

    if (q <= 6) {
      booking.tables = 1;
    } else {
      booking.tables = 2;
    }
    console.log("i bookings funktion, tables:", booking.tables);

    console.log("i bookings funktion, antal:", q);
  };

  // funktion som hämtar tid av bokning
  const getTime = (t: number) => {
    booking.time = t;
    console.log("i bookings funktion, tid:", t);
  };

  //funktion som hämtar personuppgifter
  const getPersonData = (p: IPersonData) => {
    booking.email = p.email;
    booking.name = p.name;
    booking.phone = +p.phone;
    console.log("i bookings funktion, person: ", p);
    console.log("efter ha fått personData, bookings:", booking);
  };

  console.log(booking);

  //funktion som ändrar innehåll i modal beroende på rul
  const switchForm = () => {
    if (url.pathname === "/booktable/searchtables") {
      setShowCalendar(true);
      setShowTime(false);
      setShowPersondata(false);

      setIsActiveCalendar(true);
      setIsActiveTime(false);
      setIsActivePersonData(false);

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
      //styr vad för innehåll som visas
      setShowPersondata(true);
      setShowTime(false);
      setShowCalendar(false);

      // styr classerna
      setIsActivePersonData(true);
      setIsActiveCalendar(false);
      setIsActiveTime(false);

      //ändrar knapp till avboka
      setActiveCancelButton(true);
    }
  };

  //funktioner som navigerar till rätt form via url

  const navigateToForms = () => {
    if (url.pathname === "/booktable/searchtables") {
      navigate("/booktable/choose-time");
    }
    if (url.pathname === "/booktable/choose-time") {
      navigate("/booktable/persondata");
    }

    if (url.pathname === "/booktable/persondata") {
      navigate("/booktable");
    }
  };

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
            <TimeForm getData={getTime} />
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

        <div className="buttonContainer">
          <button
            className={`${activeCancelButton && "cancelButton"}`}
            onClick={navigateToForms}
          >
            {buttonText}
          </button>
        </div>
      </article>
    </section>
  );
};
