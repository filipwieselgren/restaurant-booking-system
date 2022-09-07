import { useEffect, useState } from "react";
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

  const daysArray = [
    { day: "Mon", id: 0 },
    { day: "Tue", id: 1 },
    { day: "Wed", id: 2 },
    { day: "Thu", id: 3 },
    { day: "Fri", id: 4 },
    { day: "Sat", id: 5 },
    { day: "Sun", id: 7 },
  ];

  const monthDaysArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [choosenDate, setChoosenDate] = useState(0);

  useEffect(() => {
    getMonthNames();
    getDays();
  }, [currentMonthDays, currentMonthNumber]);

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
    let day = d.toString();
    let year = changeYear;
    let month = currentMonthNumber.toString();
    let editedMonth = "";
    let editedDay = "";

    if (month.length === 1) {
      editedMonth = "0" + month;
    } else {
      editedMonth = month;
    }

    if (day.length === 1) {
      editedDay = "0" + day;
    } else {
      editedDay = day;
    }

    let date = year + "-" + editedMonth + "-" + editedDay;

    let monthNow = new Date().getMonth() + 1;
    let dayNow = new Date().getDate();

    if (
      (currentMonthNumber === monthNow && d < dayNow) ||
      currentMonthNumber < monthNow
    ) {
      alert("You can't book this date");
    } else {
      setChoosenDate(d);
      props.getData(date);
    }
  };

  const daysHTML = getListOfDays.map((d, i) => {
    return (
      <div
        onClick={() => selectedDate(d)}
        className={`dayContainer ${choosenDate === d && "clicked"}`}
        key={i}
      >
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
          <div className="arrowContainer">
            <li className="arrowLeft">
              <i
                onClick={() =>
                  currentMonthNumber === 1 && changeYear === getYear
                    ? stop()
                    : goToLastMonth()
                }
                className="bi bi-chevron-left"
              ></i>
            </li>
          </div>
          <div className="datesContainer">
            <li className="month">{currentMonthName}</li>
            <li className="year">{changeYear}</li>
          </div>

          <div className="arrowContainer">
            <li className="arrowRight">
              <i onClick={goToNextMonth} className="bi bi-chevron-right"></i>
            </li>
          </div>
        </ul>
      </article>
      <article className="weekDaysContainer">
        {daysArray.map((day) => {
          return <p key={day.id}>{day.day}</p>;
        })}
      </article>
      <article className="daysContainer">{daysHTML}</article>
    </section>
  );
};
