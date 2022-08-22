import { IBookingProps } from "../../models/IBookingProps";

export const TimeForm = (props: IBookingProps<number>) => {
  const arrayOfTimes = [18, 21];

  const getTime = (t: number) => {
    props.getData(t);
    console.log("du valde tid:", t);
  };

  let timeHTML = arrayOfTimes.map((t, i) => {
    return (
      <article onClick={() => getTime(t)} key={i} className="time">
        <p>{t}</p>
      </article>
    );
  });

  return <section className="timeFormContainer">{timeHTML}</section>;
};
