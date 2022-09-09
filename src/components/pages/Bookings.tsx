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
import "../../styles/loader.scss";
import { Loader } from "../loader";

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
    cancelid: +new Date(),
    tables: 0,
  });

  const url = useLocation();
  const navigate = useNavigate();

  const [buttonText, setButtonText] = useState("Gå vidare");
  const [activeCancelButton, setActiveCancelButton] = useState(false);
  const [showFullyBookedText, setShowFullyBookedText] =
    useState<boolean>(false);
  const [startUseEffect, setStartUseEffect] = useState<boolean>(false);
  const [textWhentimeNotAvailable, setTextWhentimeNotAvailable] =
    useState<boolean>(false);
  const [dateAndTimeMissing, setDateAndTimeMissing] = useState<boolean>(false);
  const [chooseTime, setChooseTime] = useState<boolean>(false);

  const [navigateOnTimeForm, setNavigateOnTimeForm] = useState(false);
  const [navigateOnPersonDataForm, setNavigateOnPersonDataForm] =
    useState(false);

  //loader
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [nextPage, setNextPage] = useState<Boolean>(true);
  const [cancelBtn, setCancelBtn] = useState(true);

  useEffect(() => {
    if (activeCancelButton) {
      setButtonText("Cancel");
    } else {
      setButtonText("Next step");
    }

    switchForm();

    if (url.pathname === "/booktable/choose-time") {
      setNavigateOnTimeForm(true);
    } else {
      setNavigateOnTimeForm(false);
    }
    if (url.pathname === "/booktable/persondata") {
      setNavigateOnPersonDataForm(true);
    } else {
      setNavigateOnPersonDataForm(false);
    }
  }, [url, activeCancelButton]);

  const getDate = (d: string) => {
    setDateAndTimeMissing(false);
    booking.date = d;
  };

  const getQTY = (q: number) => {
    setDateAndTimeMissing(false);
    booking.amountOfPeople = q;

    if (q <= 6) {
      booking.tables = 1;
    } else {
      booking.tables = 2;
    }
  };

  const getTime = (t: number) => {
    booking.time = t;
  };

  const getPersonData = (p: IPersonData) => {
    booking.email = p.email;
    booking.name = p.name;
    booking.phone = +p.phone;
  };

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

      setActiveCancelButton(false);
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

  const navigateToDateFormByClick = () => {
    if (
      url.pathname === "/booktable/choose-time" ||
      url.pathname === "/booktable/persondata"
    ) {
      navigate("/booktable/searchtables");
    }
  };

  const navigateToTimeFormByClick = () => {
    if (url.pathname === "/booktable/persondata") {
      navigate("/booktable/choose-time");
    }
  };

  const navigateToForms = (times: ITablesAvalible) => {
    if (url.pathname === "/booktable/searchtables") {
      navigate("/booktable/choose-time", {
        state: { sixtimes: times.sixaclock, ninetimes: times.nineaclock },
      });
    }
    if (url.pathname === "/booktable/choose-time") {
      booking.time !== 0
        ? navigate("/booktable/persondata")
        : setChooseTime(true);
      booking.time === 0 ? setChooseTime(true) : setChooseTime(false);
      setTextWhentimeNotAvailable(false);
    }

    if (url.pathname === "/booktable/persondata") {
      navigate("/booktable/searchtables");
    }
  };
  let chooseTimeAndDate = <></>;
  let fullyBooked = <></>;
  let timeNotPicked = <></>;

  if (showFullyBookedText) {
    fullyBooked = (
      <div>We are full this day. Please choose another day! 💚</div>
    );
  } else if (showFullyBookedText == false) {
    fullyBooked = <></>;
  }

  if (dateAndTimeMissing) {
    let missingData = "";
    if (booking.amountOfPeople === 0 && !booking.date) {
      missingData =
        "Please let us know how many people you will be and then pick a date 😇";
    } else if (booking.amountOfPeople === 0) {
      missingData = "Please let us know how many people you will be 😇";
    } else if (!booking.date) {
      missingData = "Pick a date 😇";
    }

    chooseTimeAndDate = <div>{missingData}</div>;
  } else if (dateAndTimeMissing === false) {
    chooseTimeAndDate = <></>;
  }

  chooseTime === true
    ? (timeNotPicked = <div>Choose a time 🕰</div>)
    : (timeNotPicked = <></>);

  const checkIfDateIsAvailable = async (d: string, qty: number) => {
    let api: string = `http://localhost:8080/booktable/searchtables/${d}/${qty}`;

    if (booking.date && booking.amountOfPeople !== 0) {
      try {
        setIsLoading(true);
        let response = await axios.get(api);
        setStartUseEffect(true);

        setTimeout(() => {
          setIsLoading(false);
          setTimes(response.data);
        }, 800);
      } catch (error) {}
    } else {
      setDateAndTimeMissing(true);
    }
  };

  useEffect(() => {
    if (startUseEffect)
      if (times.nineaclock || times.sixaclock) {
        setNextPage(false);
        setShowFullyBookedText(false);
        navigateToForms(times);
      } else {
        setShowFullyBookedText(true);
      }
  }, [times]);

  const checkTime = (nfb: string) => {
    setChooseTime(false);
  };

  let timeNotAvailable = <></>;

  textWhentimeNotAvailable ? (
    (timeNotAvailable = <div>This time is not available 🥸</div>)
  ) : (
    <></>
  );

  const removeCancelBtn = () => {
    setCancelBtn(false);
  };

  const removeFullyBoookedText = () => {
    setShowFullyBookedText(false);
  };

  return (
    <section className="bookingPage">
      <article className="bookingFormsContainer">
        <div className="wichForm">
          <div
            onClick={navigateToDateFormByClick}
            className={`ifDateForm ${isActiveCalendar && "active"} ${
              navigateOnTimeForm && "navigate"
            } ${navigateOnPersonDataForm && "navigate"}`}
          >
            <p>Persons & Date</p>
          </div>

          <div
            onClick={navigateToTimeFormByClick}
            className={`ifTimeForm ${isActiveTime && "active"} ${
              navigateOnPersonDataForm && "navigate"
            }`}
          >
            <p>Time</p>
          </div>
          <div className={`ifConfirmation ${isActivePersonData && "active"}`}>
            <p>Confirmation</p>
          </div>
        </div>

        {showCalendar && (
          <section className="formContainerCalendar">
            <AmountOfPeople getData={getQTY} />
            <div className="dateHeaderContainer">
              <p>Pick a date</p>
            </div>

            <CalendarComponent
              getData={getDate}
              removeFullyBoookedText={removeFullyBoookedText}
            ></CalendarComponent>
          </section>
        )}

        {showTime && (
          <section className="formContainerTime">
            <TimeForm getData={getTime} times={times} checkTime={checkTime} />{" "}
          </section>
        )}

        {showPersondata && (
          <section className="formContainerPersonData">
            <PersonData
              postBookingData={booking}
              getData={getPersonData}
              callRemoveCancelBtn={removeCancelBtn}
            />
          </section>
        )}

        {timeNotPicked}
        {chooseTimeAndDate}
        {timeNotAvailable}
        {fullyBooked}
        {isLoading && nextPage ? <Loader /> : <></>}
        {cancelBtn ? (
          <div className="buttonContainer">
            <button
              className={`${activeCancelButton && "cancelButton"}`}
              onClick={() =>
                checkIfDateIsAvailable(booking.date, booking.amountOfPeople)
              }
            >
              {buttonText}
            </button>
          </div>
        ) : (
          <></>
        )}
      </article>
    </section>
  );
};
