import { useState } from "react";
import { IBookingProps } from "../../models/IBookingProps";
import { ITablesAvalible } from "../../models/ITablesAvalibles";

interface ITimes {
  times: ITablesAvalible;
  checkTime(nfb: string): void;
}

export const TimeForm = (props: IBookingProps<number> & ITimes) => {
  const [choosenTime, setChoosenTime] = useState<Number>();

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
    setChoosenTime(t);
    if (notFullyBooked !== "block-time") {
      props.getData(t);
      props.checkTime(notFullyBooked);
    } else {
      props.checkTime(notFullyBooked);
    }
  };

  let timeHTML = arrayOfTimes.map((t, i) => {
    return (
      <article
        onClick={() => getTime(t.t, t.notFullyBooked)}
        key={i}
        className={
          t.notFullyBooked === "time"
            ? `${t.notFullyBooked} ${choosenTime === t.t && "clicked"}`
            : "block-time"
        }
      >
        <p>
          {t.notFullyBooked === "block-time" ? `We are full at ${t.t}` : t.t}
        </p>
      </article>
    );
  });

  return (
    <>
      <section className="timeFormContainer">{timeHTML}</section>
    </>
  );
};
