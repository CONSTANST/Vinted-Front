import React, {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {Link, useNavigate} from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username,
          email,
          password,
          newsletter: newsletter,
        }
      );
      // console.log(response.data);
      if (response.data.token) {
        Cookies.set("token-vinted", response.data.token, {expires: 14});
        navigate("/");
      }
      // Code pour traiter la réponse de l'API et afficher un message de succès ou une erreur
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "This email already has an account") {
        setError(
          "Cet email est deja utilisé, veuillez créer un compte avec un mail valide"
        );
      }
      if (error.response.data.message === "Missing parameters") {
        setError("veullez remplir tous les champs s'il vous plais.");
      }
      // setError(err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <label htmlFor="username">Username:</label>
          <input
            placeholder="Nom d'utilisateur"
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="email"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {error && <div style={{color: "red"}}>{error}</div>}
        <div>
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
          <span>s'inscrire à notre newslettre</span>
        </div>
        <button type="submit">Sign Up</button>
        <Link to="/login">Tu as deja un compte, connecte-toi !</Link>
      </form>
    </div>
  );
};

export default SignUp;
