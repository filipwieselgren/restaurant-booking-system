import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IBooking } from "../../models/IBooking";
import { IBookingProps } from "../../models/IBookingProps";
import { IPersonData } from "../../models/IPersondata";

interface IPersonDataProps {
  postBookingData?: IBooking;
  getData?(d: IPersonData): void;
}

export const PersonData = (props: IPersonDataProps) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingDone, setBookingDone] = useState(false);

  // false -  error, true - finns inte error
  const [isEmailError, setisEmailError] = useState(false);
  const [isPhoneError, setisPhoneError] = useState(false);
  const [isNameError, setisNameError] = useState(false);

  const [startOnChangeName, setStartOnChangeName] = useState(false);
  const [startOnChangeEmail, setStartOnChangeEmail] = useState(false);
  const [startOnChangePhone, setStartOnChangePhone] = useState(false);

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
      setisNameError(true);
      return false;
    } else {
      setisNameError(false);
      return true;
    }
  };

  const validateEmail = () => {
    let regex = /\S+@\S+\.\S+/.test(email);

    if (email.length === 0) {
      setisEmailError(true);
    } else {
      if (regex) {
        setisEmailError(false);
        return true;
      } else {
        setisEmailError(true);
        return false;
      }
    }
  };
  const validatePhone = () => {
    if (phone.length === 10) {
      setisPhoneError(false);
      return true;
    } else {
      setisPhoneError(true);
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
    if (props.getData) {
      props.getData({ name, email, phone });
    }

    // navigate("/booktable/post");
  };

  const preventSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let emailValidator = validateEmail();
    let nameValidator = validateName();
    let phoneValidator = validatePhone();

    if (nameValidator) {
      setisNameError(false);
    } else {
      setisNameError(true);
    }

    if (emailValidator) {
      setisEmailError(false);
    } else {
      setisEmailError(true);
    }

    if (phoneValidator) {
      setisPhoneError(false);
    } else {
      setisPhoneError(true);
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
          <div className="errorMessage">
            {isNameError && <p>Fyll i fältet</p>}
          </div>
          <input
            value={name}
            onBlur={validateName}
            onChange={twoHandlersName}
            id="nameInput"
            type="text"
            placeholder="Namn:"
            className={`${isNameError && "validationError"} `}
          />
          <div className="errorMessage">
            {isEmailError && <p>Fyll i en korrekt emailadress</p>}
          </div>

          <input
            value={email}
            onBlur={validateEmail}
            onChange={twoHandlersEmail}
            id="emailInput"
            type="text"
            placeholder="Email:"
            className={`${isEmailError && "validationError"} `}
          />
          <div className="errorMessage">
            {isPhoneError && <p>Fyll i ett korrekt telefonnummer</p>}
          </div>

          <input
            value={phone}
            onBlur={validatePhone}
            onChange={twoHandlersPhone}
            id="phoneInput"
            type="text"
            placeholder="Telefonnummer:"
            className={`${isPhoneError && "validationError"} `}
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
