import React from "react";
import "../../styles/pages/contact.scss";
export const Contact = () => {
  return (
    <section className="contactWrapper">
      <article className="formContainer">
        <p>KONTAKT</p>
        <form action="post">
          <input type="text" placeholder="Namn:" />
          <input type="text" placeholder="Email:" />
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Meddelande:"
          ></textarea>
          <button>Skicka</button>
        </form>
      </article>
    </section>
  );
};
