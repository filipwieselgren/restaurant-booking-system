import { ChangeEvent, useState } from "react";
import { IBookingProps } from "../../models/IBookingProps";

export const AmountOfPeople = (props: IBookingProps<number>) => {
  const qtyList = [1, 2, 3, 4, 5, 6];
  const moreThanSixList = [7, 8, 9, 10, 11, 12];

  const [checkbox, setCheckbox] = useState(false);
  const [changeList, setChangeList] = useState(qtyList);

  const getAmountOfPeople = (q: number) => {
    console.log("du har valt: ", q, " personer");
    props.getData(q);
  };

  let qtyHTML = changeList.map((q, i) => {
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

  console.log("checkbox", checkbox);

  const changeQTY = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target.checked;
    setCheckbox(target);

    if (target) {
      setChangeList(moreThanSixList);
    } else {
      setChangeList(qtyList);
    }
  };

  return (
    <section className="qtyContainer">
      <div className="qtyHeaderContainer">
        <p>Välj antal personer</p>
        <p>
          Är ni fler än 6 ?
          <input onChange={changeQTY} name="checkbox" type="checkbox" />
        </p>
      </div>
      <div className="qtyWrapper">{qtyHTML}</div>
    </section>
  );
};
