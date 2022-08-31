import { ChangeEvent, FormEvent, useEffect, useState } from "react";
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

  const [emailError, setEmailError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [nameError, setNameError] = useState(true);

  const [validationDone, setValidationDone] = useState(false);
  const [startOnChange, setStartOnChange] = useState(false);

  const navigate = useNavigate();

  const twoHandlers = (e: ChangeEvent<HTMLInputElement>) => {
    handleName(e);
    if (startOnChange) {
      console.log("started on change");
      checkIfStillNotValidated();
    }
  };

  const checkIfStillNotValidated = () => {
    console.log("i check funktionen");
    validateName();
  };

  const validateEmail = () => {
    let regex = /\S+@\S+\.\S+/.test(email);

    if (email.length === 0) {
      setEmailError(false);
    } else {
      if (regex) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    // return /\S+@\S+\.\S+/.test(email);
  };
  const validatePhone = () => {
    if (phone.length === 0) {
      setPhoneError(false);
    } else {
      if (phone.length < 10 || phone.length > 10) {
        setPhoneError(false);
      } else {
        setPhoneError(true);
      }
    }
  };
  const validateName = () => {
    if (name.length === 0) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target.value;

    setName(target);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let target = e.target.value;

    setEmail(target);
  };

  const handlePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const sendData = () => {
    props.getData({ name, email, phone });

    // navigate("/booktable/post");
  };

  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();

    validateEmail();
    validateName();
    validatePhone();

    if (emailError === true && nameError === true && phoneError === true) {
      setValidationDone(true);
    }

    if (!validationDone) {
      setStartOnChange(true);
    }

    if (validationDone === true) {
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
      })();
    }
  };

  console.log("validation done", validationDone);
  console.log("startonchane", startOnChange);
  console.log("mail", emailError);
  console.log("name", nameError);
  console.log("phone", phoneError);

  return (
    <section className="personDataContainer">
      <form onSubmit={preventSubmit} className="personDataForm" action="post">
        <div className="confirmHeaderContainer">
          <p>Bekräfta din bokning</p>
        </div>

        <div className="inputsContainer">
          {!nameError && <p>Fyll i fältet</p>}

          <input
            value={name}
            onChange={twoHandlers}
            /* onChange={() =>
              `${handleName}${startOnChange && checkIfStillNotValidated}`
            } */
            // onChange={handleName}
            id="nameInput"
            type="text"
            placeholder="Namn:"
            className={`${!nameError && "validationError"} `}
          />
          {!emailError && <p>Fyll i en korrekt emailadress</p>}
          <input
            value={email}
            onChange={handleEmail}
            id="emailInput"
            type="text"
            placeholder="Email:"
            className={`${!emailError && "validationError"} `}
          />
          {!phoneError && <p>Fyll i ett korrekt telefonnummer</p>}

          <input
            value={phone}
            onChange={handlePhone}
            id="phoneInput"
            type="text"
            placeholder="Telefonnummer:"
            className={`${!phoneError && "validationError"} `}
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
