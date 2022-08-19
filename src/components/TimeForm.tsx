export const TimeForm = () => {
  const arrayOfTimes = ["21.00 - 00.00", "18.00 - 21.00"];

  let timeHTML = arrayOfTimes.map((t, i) => {
    return (
      <article key={i} className="time">
        <p>{t}</p>
      </article>
    );
  });

  return <section className="timeFormContainer">{timeHTML}</section>;
};
