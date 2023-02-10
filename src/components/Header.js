import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import OffersList from "./OffersList";

const Header = ({handleToken, token}) => {
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState("");
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState(null);

  const handleFilter = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${title}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}`
      );

      setOffers(response.data);
      setError(null);
    } catch (e) {
      setError("Une erreur s'est produite lors du filtrage des offres.");
    }
  };

  return (
    <header>
      {token ? (
        <button
          onClick={() => {
            handleToken(null);
            // Cookies.remove("token-vinted");
          }}
        >
          Se déconnecter
        </button>
      ) : (
        <>
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>
        </>
      )}
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix minimum"
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix maximum"
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
      />
      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="price-desc">Prix décroissant</option>
        <option value="price-asc">Prix croissant</option>
      </select>
      <button onClick={handleFilter}>Filtrer</button>
      {error && <p>{error}</p>}
      <OffersList offers={offers} />
    </header>
  );
};

export default Header;
