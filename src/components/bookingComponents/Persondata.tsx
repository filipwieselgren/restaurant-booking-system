import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { IBookingProps } from "../../models/IBookingProps";
import { IPersonData } from "../../models/IPersondata";

interface IPersonDataProps {
  postBookingData: IBooking;
  getData(d: IPersonData): void;

  //getBookingData: IBookingProps<IPersonData>;
}

export const PersonData = (
  props: IPersonDataProps /* IBookingProps<IPersonData> */
) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  const navigate = useNavigate();

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const sendData = () => {
    // setBookingDone(true);
    props.getData({ name, email, phone });

    // navigate("/booktable/post");
  };

  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();

    /*   fetch("/booktable/persondata", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify(props.postBookingData),
    }); */

    (async () => {
      const rawResponse = await fetch(
        "http://localhost:8080/booktable/persondata",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            mode: "no-cors",
          },
          body: JSON.stringify(props.postBookingData),
        }
      );

      console.log(rawResponse);
    })();
  };

  let formInput;

  if (bookingDone === false) {
    formInput = (
      <>
        <div className="confirmHeaderContainer">
          <p>Bekräfta din bokning</p>
        </div>

        <div className="inputsContainer">
          <input
            value={name}
            onChange={handleName}
            id="nameInput"
            type="text"
            placeholder="Namn:"
          />
          <input
            value={email}
            onChange={handleEmail}
            id="emailInput"
            type="text"
            placeholder="Email:"
          />

          <input
            value={phone}
            onChange={handlePhone}
            id="phoneInput"
            type="text"
            placeholder="Telefonnummer:"
          />
        </div>

        <div className="buttonContainer">
          <button onClick={sendData}>Boka</button>
        </div>

        <div className="GDPRLinkContainer">
          <p>Genom att bekräfta bokning så godkänner du våra villkor.</p>
          <Link className="GDPRLink" to="/contact">
            Läs om våra GDPR-villkor här
          </Link>
        </div>
      </>
    );
  } else {
    // formInput = (
    //   <>
    //     <div>Your booking is confirmed</div>
    //     <div className="swal-icon swal-icon--success">
    //       <span className="swal-icon--success__line swal-icon--success__line--long"></span>
    //       <span className="swal-icon--success__line swal-icon--success__line--tip"></span>
    //       <div className="swal-icon--success__ring"></div>
    //       <div className="swal-icon--success__hide-corners"></div>
    //     </div>
    //   </>
    // );
  }

  return (
    <section className="personDataContainer">
      <form onSubmit={preventSubmit} className="personDataForm" action="post">
        {formInput}
      </form>
    </section>
  );
};
