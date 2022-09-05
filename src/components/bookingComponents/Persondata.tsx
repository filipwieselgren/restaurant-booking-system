import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { IBookingProps } from "../../models/IBookingProps";
import { IPersonData } from "../../models/IPersondata";

interface IPersonDataProps {
  postBookingData: IBooking;
  getData(d: IPersonData): void;
}

export const PersonData = (props: IPersonDataProps) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  // false -  error, true - finns inte error
  const [emailError, setEmailError] = useState(true);
  const [phoneError, setPhoneError] = useState(true);
  const [nameError, setNameError] = useState(true);

  const [startOnChangeName, setStartOnChangeName] = useState(false);
  const [startOnChangeEmail, setStartOnChangeEmail] = useState(false);
  const [startOnChangePhone, setStartOnChangePhone] = useState(false);

  /*  useEffect(() => {
    props.getData({ name, email, phone });
  }, [email, phone, name]); */

  const twoHandlersName = (e: ChangeEvent<HTMLInputElement>) => {
    handleName(e);
    if (startOnChangeName) {
      validateName();
    }
  };

  const twoHandlersEmail = (e: ChangeEvent<HTMLInputElement>) => {
    handleEmail(e);

    if (startOnChangeEmail) {
      validateEmail();
    }
  };

  const twoHandlersPhone = (e: ChangeEvent<HTMLInputElement>) => {
    handlePhone(e);

    if (startOnChangePhone) {
      validatePhone();
    }
  };

  const validateName = () => {
    if (name.length === 0) {
      setNameError(false);
      return false;
    } else {
      setNameError(true);
      return true;
    }
  };

  const validateEmail = () => {
    let regex = /\S+@\S+\.\S+/.test(email);

    if (email.length === 0) {
      setEmailError(false);
    } else {
      if (regex) {
        setEmailError(true);
        return true;
      } else {
        setEmailError(false);
        return false;
      }
    }
  };
  const validatePhone = () => {
    if (phone.length === 10) {
      setPhoneError(true);
      return true;
    } else {
      setPhoneError(false);
      return false;
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

  const preventSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let emailValidator = validateEmail();
    let nameValidator = validateName();
    let phoneValidator = validatePhone();

    if (nameValidator) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (emailValidator) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (phoneValidator) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    if (!nameValidator) {
      setStartOnChangeName(true);
    }
    if (!emailValidator) {
      setStartOnChangeEmail(true);
    }
    if (!phoneValidator) {
      setStartOnChangePhone(true);
    }
    if (nameValidator && emailValidator && phoneValidator) {
      sendFetch();
    }
  };

  const sendFetch = () => {
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
      setBookingDone(true);
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
          {!nameError && <p>Fyll i fältet</p>}

          <input
            value={name}
            onBlur={validateName}
            onChange={twoHandlersName}
            // onChange={handleName}
            id="nameInput"
            type="text"
            placeholder="Namn:"
            className={`${!nameError && "validationError"} `}
          />
          {!emailError && <p>Fyll i en korrekt emailadress</p>}
          <input
            value={email}
            onBlur={validateEmail}
            onChange={twoHandlersEmail}
            id="emailInput"
            type="text"
            placeholder="Email:"
            className={`${!emailError && "validationError"} `}
          />
          {!phoneError && <p>Fyll i ett korrekt telefonnummer</p>}

          <input
            value={phone}
            onBlur={validatePhone}
            onChange={twoHandlersPhone}
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
      </>
    );
  } else {
    formInput = (
      <>
        <div>Your booking is confirmed</div>
        <div className="swal-icon swal-icon--success">
          <span className="swal-icon--success__line swal-icon--success__line--long"></span>
          <span className="swal-icon--success__line swal-icon--success__line--tip"></span>
          <div className="swal-icon--success__ring"></div>
          <div className="swal-icon--success__hide-corners"></div>
        </div>
      </>
    );
  }

  return (
    <section className="personDataContainer">
      <form onSubmit={preventSubmit} className="personDataForm" action="post">
        {formInput}
      </form>
    </section>
  );
};
