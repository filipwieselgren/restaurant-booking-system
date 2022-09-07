import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components-style/adminStyles/login.scss";

interface IAdmin {
  email: string;
  password: string;
}

export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ifNotAdmin, setIfNotAdmin] = useState(false);
  const [loader, setLoader] = useState(false);
  let admin: IAdmin = { email, password };

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();

    (async () => {
      const rawResponse = await fetch("http://localhost:8080/admin/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
        body: JSON.stringify(admin),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setIfNotAdmin(false);

            navigate("/admin");
          } else {
            setIfNotAdmin(true);
          }
        });
    })();
  };

  return (
    <section className="loginPage">
      <article className="loginContainer">
        <p className="loginHeader">Logga in som administratör</p>

        {loader && <span className="loader"></span>}

        <form onSubmit={preventSubmit} action="post">
          <input
            id="email"
            onChange={handleEmail}
            value={email}
            type="text"
            placeholder="Email:"
          />

          <input
            id="pass"
            onChange={handlePassword}
            value={password}
            type="password"
            placeholder="Password:"
          />
          <div className="buttonContainer">
            <button type="submit">Logga in</button>
          </div>
        </form>
        {ifNotAdmin && (
          <p className="wrongData">Fel användarnamn eller lösenord</p>
        )}
      </article>
    </section>
  );
};
