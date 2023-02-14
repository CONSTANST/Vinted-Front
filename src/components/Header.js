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
      // console.log(response.data.offers);
      setOffers(response.data.offers);
      setError(null);
    } catch (error) {
      setError("Une erreur s'est produite lors du filtrage des offres.");
    }
  };

  return (
    <header>
      {token ? (
        <>
          <button
            onClick={() => {
              handleToken(null);
              // Cookies.remove("token-vinted");
            }}
          >
            Se déconnecter
          </button>
          <Link to="/publish">Publish</Link>
        </>
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
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="number"
        placeholder="Prix minimum"
        value={priceMin}
        onChange={(event) => setPriceMin(event.target.value)}
      />
      <input
        type="number"
        placeholder="Prix maximum"
        value={priceMax}
        onChange={(event) => setPriceMax(event.target.value)}
      />
      <select value={sort} onChange={(event) => setSort(event.target.value)}>
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
