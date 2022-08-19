import { CalendarComponent } from "../CalendarComponent";
import "../../styles/bookings.scss";
import { AmountOfPeople } from "../AmountOfPeople";
import { IBooking } from "../../models/IBooking";
import { useState } from "react";

export const Bookings = () => {
  const [booking, setBooking] = useState<IBooking>({
    name: "",
    amountOfPeople: 0,
    date: "",
    time: 0,
    email: "",
    phone: 0,
  });

  const getDate = (d: string) => {
    booking.date = d;
    console.log("i bookings funktion, date:", d);
  };

  const getQTY = (q: number) => {
    booking.amountOfPeople = q;
    console.log("i bookings funktion, antal:", q);
  };

  console.log(booking);

  return (
    <section className="bookingPage">
      <article className="bookingFormsContainer">
        <div className="wichForm">
          <div className="ifDateForm">
            <p>Antal och datum</p>
          </div>
          <div className="ifTimeForm">
            <p>Val av tid</p>
          </div>
          <div className="ifConfirmation">
            <p>Bekräftelse</p>
          </div>
        </div>

        <AmountOfPeople getData={getQTY} />
        <div className="dateHeaderContainer">
          <p>Välj datum</p>
        </div>
        <CalendarComponent getData={getDate}></CalendarComponent>
        <div className="buttonContainer">
          <button>Gå vidare</button>
        </div>
      </article>
    </section>
  );
};
