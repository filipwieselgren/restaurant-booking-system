import { CalendarComponent } from "../CalendarComponent";
import "../../styles/bookings.scss";
import { AmountOfPeople } from "../AmountOfPeople";
import { IBooking } from "../../models/IBooking";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TimeForm } from "../TimeForm";

export const Bookings = () => {
  const [isActiveCalendar, setIsActiveCalendar] = useState(true);
  const [isActiveTime, setIsActiveTime] = useState(false);
  const [isActiveConfirmation, setIsActiveConfirmation] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
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

  useEffect(() => {
    switchForm();
  }, [url]);

  // console.log("params", url);

  const getDate = (d: string) => {
    booking.date = d;
    console.log("i bookings funktion, date:", d);
  };

  const getQTY = (q: number) => {
    booking.amountOfPeople = q;
    console.log("i bookings funktion, antal:", q);
  };

  //console.log(booking);

  const switchForm = () => {
    if (url.pathname === "/booktable") {
      setShowCalendar(true);
      setShowTime(false);
      setShowConfirmation(false);

      setIsActiveCalendar(true);
      setIsActiveTime(false);
      setIsActiveConfirmation(false);
    }
    if (url.pathname === "/booktable/choose-time") {
      setShowTime(true);
      setShowCalendar(false);
      setShowConfirmation(false);

      setIsActiveCalendar(false);
      setIsActiveTime(true);
    }
    if (url.pathname === "/booktable/post") {
      setShowConfirmation(true);
      setShowTime(false);
      setShowCalendar(false);

      setIsActiveTime(false);
      setIsActiveConfirmation(true);
    }
  };

  const navigateToChooseTime = () => {
    if (url.pathname === "/booktable") {
      navigate("/booktable/choose-time");
    }
    if (url.pathname === "/booktable/choose-time") {
      navigate("/booktable/post");
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
          <div className={`ifConfirmation ${isActiveConfirmation && "active"}`}>
            <p>Bekräftelse</p>
          </div>
        </div>

        {showCalendar && (
          <section className="formContainer">
            <AmountOfPeople getData={getQTY} />
            <div className="dateHeaderContainer">
              <p>Välj datum</p>
            </div>
            <CalendarComponent getData={getDate}></CalendarComponent>
          </section>
        )}

        {showTime && (
          <section className="formContainer">
            <TimeForm />
          </section>
        )}

        <div className="buttonContainer">
          <button onClick={navigateToChooseTime}>Gå vidare</button>
        </div>
      </article>
    </section>
  );
};
