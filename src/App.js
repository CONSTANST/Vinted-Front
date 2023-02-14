import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {useState} from "react";
import Cookies from "js-cookie";
// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
// import Publier from "./pages/Publier";
import Payment from "./pages/Payment";
// Component
import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("token-vinted") || null);
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token-vinted", token, {expires: 14});
    } else {
      setToken(null);
      Cookies.remove("token-vinted");
    }
  };

  return (
    <Router>
      <Header handleToken={handleToken} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
