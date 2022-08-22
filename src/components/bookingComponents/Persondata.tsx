import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { IBookingProps } from "../../models/IBookingProps";
import { IPersonData } from "../../models/IPersondata";

export const PersonData = (props: IBookingProps<IPersonData>) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
    props.getData({ name, email, phone });
  };

  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="personDataContainer">
      <form onSubmit={preventSubmit} className="personDataForm" action="">
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
      </form>
    </section>
  );
};
