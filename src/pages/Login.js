import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
// import {useCookies} from "react-cookie";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {email, password}
      );
      if (response.data.token) {
        Cookies.set("token-vinted", response.data.token, {expires: 14});
        navigate("/");
      }
      // setCookie("token", response.data.token);
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "User not found") {
        setError("Veuillez utiliser un mail valide");
      }
      if (error.response.data.message === "Missing parameters") {
        setError("veullez remplir tous les champs s'il vous plais.");
      }
      // setError(err.message);
      // console.error(error.message);
    }
  };

  return (
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
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">Se connecter</button>
      {error && <div style={{color: "red"}}>{error}</div>}
      <Link to="/signup"> Pas encore compte Inscris-toi</Link>
    </form>
  );
};

export default Login;
