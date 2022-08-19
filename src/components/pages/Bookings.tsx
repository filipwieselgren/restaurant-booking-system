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

        <AmountOfPeople />
        <div className="dateHeaderContainer">
          <p>Välj datum</p>
        </div>
        <CalendarComponent></CalendarComponent>
        <div className="buttonContainer">
          <button>Gå vidare</button>
        </div>
      </article>
    </section>
  );
};
