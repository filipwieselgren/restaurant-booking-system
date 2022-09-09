import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/contact.scss";
export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [isNameError, setIsNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isMessageError, setIsMessageError] = useState(false);

  const [messageIsSent, setMessageIsSent] = useState(false);

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const validateName = () => {
    if (name.length === 0) {
      setIsNameError(true);
      return true;
    } else {
      setIsNameError(false);
      return false;
    }
  };

  const validateEmail = () => {
    let regex = /\S+@\S+\.\S+/.test(email);

    if (email.length === 0) {
      setIsEmailError(true);
      return true;
    } else {
      if (regex) {
        setIsEmailError(false);
        return false;
      } else {
        setIsEmailError(true);
        return true;
      }
    }
  };
  const validateMessage = () => {
    if (message.length === 0) {
      setIsMessageError(true);
      return true;
    } else {
      setIsMessageError(false);
      return false;
    }
  };

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();

    let vN = validateName();
    let vE = validateEmail();
    let vM = validateMessage();

    if (!vN && !vE && !vM) {
      sendFetch();
      setMessageIsSent(true);
    }
  };

  const sendFetch = () => {
    (async () => {
      const rawResponse = await fetch("http://localhost:8080/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify({ name, email, message }),
      });
    })();
  };

  let messageInputs = (
    <>
      <p>CONTACT LEON</p>
      <form onSubmit={sendMessage} action="post">
        <div>{isNameError && <p>Fill this field</p>}</div>
        <input
          className={`${isNameError && "errorValidate"}`}
          onChange={handleName}
          value={name}
          type="text"
          placeholder="Name:"
        />
        <div>{isEmailError && <p>Fill a valid email</p>}</div>

        <input
          className={`${isEmailError && "errorValidate"}`}
          onChange={handleEmail}
          value={email}
          type="text"
          placeholder="Email:"
        />
        <div>{isMessageError && <p>Enter your message</p>}</div>

        <textarea
          className={`${isMessageError && "errorValidate"}`}
          onChange={handleMessage}
          value={message}
          name=""
          id=""
          cols={30}
          rows={10}
          placeholder="Message:"
        ></textarea>
        <button>Send</button>
      </form>
    </>
  );

  let messageSentInfo = (
    <article className="infoMessageWrapper">
      <div className="rhombus2">
        <div className="circle21"></div>
        <div className="circle22"></div>
      </div>

      <p>Tack för dig meddelande {name}!</p>
      <p>Vi återkommer om 1-2 dagar.</p>

      <Link className="messageModalLink" to="/">
        Gå till startsida
      </Link>
    </article>
  );

  return (
    <section className="contactWrapper">
      <article className="formContainer">
        {messageIsSent && messageSentInfo}
        {!messageIsSent && messageInputs}
      </article>
    </section>
  );
};
