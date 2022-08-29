import { setMaxListeners } from "events";
import { useEffect, useState } from "react";
import { IBooking } from "../../models/IBooking";
import { IBookingProps } from "../../models/IBookingProps";

export const CalendarComponent = (props: IBookingProps<string>) => {
  const [getMonth, setGetMonth] = useState(new Date().getMonth() + 1);
  const getYear = new Date().getFullYear();
  const [currentMonthName, setCurrentMonthName] = useState("");
  const [currentMonthNumber, setCurrentMonthNumber] = useState(0);
  const [changeYear, setChangeYear] = useState(new Date().getFullYear());

  const [currentMonthDays, setCurrentMonthDays] = useState(0);
  const [getListOfDays, setGetListOfDays] = useState<number[]>([]);

  const listOfAllDays: number[] = [];

  const monthNumberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthDaysArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  useEffect(() => {
    getMonthNames();
    getDays();
  }, [, currentMonthDays, currentMonthNumber]);

  const getMonthNames = () => {
    if (currentMonthNumber === 0) {
      for (let i = 0; i < monthNumberArray.length; i++) {
        if (getMonth === i + 1) {
          setCurrentMonthNumber(monthNumberArray[i]);
        }
      }
    }

    for (let i = 0; i < monthsArray.length; i++) {
      if (currentMonthNumber === i + 1) {
        setCurrentMonthName(monthsArray[i]);
      }
    }

    /*  for (let i = 0; i < monthsArray.length; i++) {
      if (getMonth === i + 1) {
        setCurrentMonthName(monthsArray[i]);
      }
    } */
  };

  const getDays = () => {
    if (currentMonthNumber === 0) {
      for (let i = 0; i < monthDaysArray.length; i++) {
        if (getMonth === i + 1) {
          setCurrentMonthDays(monthDaysArray[i]);
        }
      }
    } else {
      for (let i = 0; i < monthDaysArray.length; i++) {
        if (currentMonthNumber === i + 1) {
          setCurrentMonthDays(monthDaysArray[i]);
        }
      }
    }

    for (let i = 0; i < currentMonthDays; i++) {
      let number = i + 1;

      listOfAllDays.push(number);
      setGetListOfDays(listOfAllDays);
    }
  };

  const goToNextMonth = () => {
    setCurrentMonthNumber(currentMonthNumber + 1);

    if (currentMonthNumber === 12 && changeYear >= getYear) {
      setCurrentMonthNumber(1);
      setChangeYear(changeYear + 1);
    }
  };

  //
  const goToLastMonth = () => {
    setCurrentMonthNumber(currentMonthNumber - 1);

    if (currentMonthNumber === 1 && changeYear > getYear) {
      setCurrentMonthNumber(12);
      setChangeYear(changeYear - 1);
    } else if (currentMonthNumber === 1 && changeYear === getYear) {
    }
  };

  // funktion som ska skicka valt datum
  const selectedDate = (d: number) => {
    /*  let booking: IBooking = {
      name: "",
      amountOfPeople: 0,
      date: "",
      time: 0,
      email: "",
      phone: 0,
    }; */

    let day = d;
    let year = changeYear;
    let month = currentMonthName;
    let date = d + "-" + month + "-" + year;
    console.log("du valde datum:", date);

    props.getData(date);
  };

  //console.log(currentMonthNumber);

  const daysHTML = getListOfDays.map((d, i) => {
    return (
      <div onClick={() => selectedDate(d)} className="dayContainer" key={i}>
        {d}
      </div>
    );
  });

  const stop = () => {
    console.log("The past is in the past, you can't go there!");
  };

  return (
    <section className="calendarContainer">
      <article className="monthAndYearHeader">
        <ul className="monthAndYearContainer">
          <li className="arrowLeft">
            <i
              onClick={
                () =>
                  currentMonthNumber === 1 && changeYear === getYear
                    ? stop()
                    : goToLastMonth()
                // Lägg till så man inte kan gå längre tbx än månaden man är i
              }
              className="bi bi-chevron-left"
            ></i>
          </li>
          <li className="month">{currentMonthName}</li>
          <li className="year">{changeYear}</li>
          <li className="arrowRigth">
            <i onClick={goToNextMonth} className="bi bi-chevron-right"></i>
          </li>
        </ul>
      </article>
      <article className="weekDaysContainer">
        <p>Mon</p>
        <p>Tue</p>
        <p>Wed</p>
        <p>Thu</p>
        <p>Fri</p>
        <p>Sat</p>
        <p>Sun</p>
      </article>
      <article className="daysContainer">{daysHTML}</article>
    </section>
  );
};
