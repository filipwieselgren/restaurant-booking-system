import { clickOptions } from "@testing-library/user-event/dist/click";
import { ChangeEvent, useEffect, useState } from "react";
import { IBookingProps } from "../../models/IBookingProps";

/* interface INumbers {
  q: number;
  clicked: boolean;
} */

export const AmountOfPeople = (props: IBookingProps<number>) => {
  /*   const [qtyList, setQtyList] = useState<INumbers[]>([
    { q: 1, clicked: false },
    { q: 2, clicked: false },
    { q: 3, clicked: false },
    { q: 4, clicked: false },
    { q: 5, clicked: false },
    { q: 6, clicked: false },
  ]); */

  const qtyList = [1, 2, 3, 4, 5, 6];
  const moreThanSixList = [7, 8, 9, 10, 11, 12];
  /*  const [moreThanSixList, setMoreThanSixList] = useState<INumbers[]>([
    { q: 7, clicked: false },
    { q: 8, clicked: false },
    { q: 9, clicked: false },
    { q: 10, clicked: false },
    { q: 11, clicked: false },
    { q: 12, clicked: false },
  ]); */

  const [checkbox, setCheckbox] = useState(false);
  const [changeList, setChangeList] = useState(qtyList);

  const [startEffect, setStartEffect] = useState(false);
  const [choosenQTY, setChoosenQTY] = useState<number>();

  useEffect(() => {
    getHTML();
  }, [startEffect]);

  const getAmountOfPeople = (q: number) => {
    setChoosenQTY(q);

    setStartEffect(!startEffect);

    props.getData(q);
  };

  const changeQTY = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target.checked;
    setCheckbox(target);

    if (target) {
      setChangeList(moreThanSixList);
    } else {
      setChangeList(qtyList);
    }
  };

  const getHTML = () => {
    let qtyHTML = changeList.map((q, i) => {
      return (
        <div
          onClick={() => getAmountOfPeople(q)}
          key={i}
          className={`numberContainer ${choosenQTY === q && "clicked"}`}
        >
          <p>{q}</p>
        </div>
      );
    });

    return qtyHTML;
  };

  return (
    <section className="qtyContainer">
      <div className="qtyHeaderContainer">
        <p>Välj antal personer</p>

        <div className="checkboxContainer">
          <p> Är ni fler än 6 ?</p>
          <div className="check">
            <input
              onChange={changeQTY}
              className="checkbox"
              id="check"
              type="checkbox"
            />
            <label className="checkbox" htmlFor="check"></label>
          </div>

          {/* <div className="checkbox-rect">
            <input
              onChange={changeQTY}
              type="checkbox"
              id="checkbox-rect1"
              name="check"
            />
            <label htmlFor="checkbox-rect1"></label>
          </div> */}
          {/*   <input
            className="checkbox"
            onChange={changeQTY}
            name="checkbox"
            type="checkbox"
          /> */}
        </div>
      </div>
      <div className="qtyWrapper">{getHTML()}</div>
    </section>
  );
};
