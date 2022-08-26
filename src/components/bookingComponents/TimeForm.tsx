import { useState } from "react";
import { IBookingProps } from "../../models/IBookingProps";
import { ITablesAvalible } from "../../models/ITablesAvalibles";

interface ITimes {
  times: ITablesAvalible;
  changeTest(nfb: string): void;
}

export const TimeForm = (props: IBookingProps<number> & ITimes) => {
  const arrayOfTimes = [
    {
      t: 18,
      notFullyBooked: `${props.times.sixaclock ? "time" : "block-time"}`,
    },
    {
      t: 21,
      notFullyBooked: `${props.times.nineaclock ? "time" : "block-time"}`,
    },
  ];

  const getTime = (t: number, notFullyBooked: string) => {
    if (notFullyBooked !== "block-time") {
      props.getData(t);
      props.changeTest(notFullyBooked);
      console.log("du valde tid:", t);
    } else {
      props.changeTest(notFullyBooked);
      console.log("This time is not available");
    }
  };

  console.log(props.times);

  let timeHTML = arrayOfTimes.map((t, i) => {
    return (
      <article
        onClick={() => getTime(t.t, t.notFullyBooked)}
        key={i}
        className={t.notFullyBooked}
      >
        <p>{t.t}</p>
      </article>
    );
  });

  return (
    <>
      <section className="timeFormContainer">{timeHTML}</section>
    </>
  );
};