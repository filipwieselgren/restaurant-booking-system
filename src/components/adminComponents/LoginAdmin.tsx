import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components-style/adminStyles/login.scss";
import { validateEmailCall, validateLength } from "../../ts/validate";

interface IAdmin {
  email: string;
  password: string;
}

export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ifNotAdmin, setIfNotAdmin] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  let admin: IAdmin = { email, password };

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  let vE = () => {
    let validaterE = validateEmailCall(email);

    return validaterE;
  };

  let vL = () => {
    let validaterL = validateLength(password, 0);
    return validaterL;
  };

  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();

    // setLoader(true);
    let validaterL = vL();
    let validatesEmail = vE();

    if (validatesEmail) {
      setIsEmailError(false);
    } else {
      setIsEmailError(true);
    }

    if (validaterL) {
      setIsPasswordError(true);
    } else {
      setIsPasswordError(false);
    }

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
        <p className="loginHeader">Log in as LEON administrator</p>

        {loader && <span className="loader"></span>}

        <form onSubmit={preventSubmit} action="post">
          <div className="validateError">
            {ifNotAdmin && (
              <p className="wrongData">Wrong username or password</p>
            )}
            {isEmailError && <p>Pass a valid email</p>}
          </div>

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
            <button type="submit">Log in</button>
          </div>
        </form>
      </article>
    </section>
  );
};
