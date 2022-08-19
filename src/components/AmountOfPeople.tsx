export const AmountOfPeople = () => {
  let qtyList = [1, 2, 3, 4, 5, 6];

  const getAmountOfPeople = (q: number) => {
    console.log("du har valt: ", q, " personer");
  };

  let qtyHTML = qtyList.map((q, i) => {
    return (
      <div
        onClick={() => getAmountOfPeople(q)}
        key={i}
        className="numberContainer"
      >
        <p>{q}</p>
      </div>
    );
  });

  return (
    <section className="qtyContainer">
      <div className="qtyHeaderContainer">
        <p>Välj antal personer</p>
      </div>
      <div className="qtyWrapper">{qtyHTML}</div>
    </section>
  );
};
