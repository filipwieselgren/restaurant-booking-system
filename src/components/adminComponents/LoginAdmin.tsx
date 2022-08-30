import { ChangeEvent, FormEvent, useState } from "react";
import "../../styles/components-style/adminStyles/login.scss";

interface IAdmin {
  email: string;
  password: string;
}

export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*  const [admin, setAdmin] = useState<IAdmin>({
    email: "",
    password: "",
  }); */

  let admin: IAdmin = { email, password };
  console.log("admin", admin);

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // admin.email = email;
  };
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    //admin.password = password;
  };

  const sendData = () => {
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
        .then((data) => console.log(data));
    })();
  };

  const preventSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="loginPage">
      <article className="loginContainer">
        <p>Logga in som administratör</p>
        <form onSubmit={preventSubmit} action="post">
          <input
            onChange={handleEmail}
            value={email}
            type="text"
            placeholder="Email:"
          />
          <input
            onChange={handlePassword}
            value={password}
            type="password"
            placeholder="Password:"
          />
          <div className="buttonContainer">
            <button onClick={sendData} type="submit">
              Logga in
            </button>
          </div>
        </form>
      </article>
    </section>
  );
};
