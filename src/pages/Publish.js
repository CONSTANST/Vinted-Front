import {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Navigate} from "react-router-dom";

const Publish = ({token}) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [isExchangeAccepted, setIsExchangeAccepted] = useState();

  const handleImageChange = (event) => {
    setPicture(event.target.files[0]);
  };
  const handleCheckboxChange = (event) => {
    setIsExchangeAccepted(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", picture);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return token ? (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/">Revenir vers la page d'acceuil</Link>
      <h2>Vend ton article</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        {picture && <img src={URL.createObjectURL(picture)} alt="product" />}
        <input
          value={title}
          type="texte"
          placeholder="Ex: Chemise sézane verte"
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
        <textarea
          value={description}
          id="Décris ton article"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <input
          value={brand}
          type="text"
          placeholder="Ex: zara"
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <input
          value={size}
          type="text"
          placeholder="Ex: L/40/12"
          onChange={(event) => {
            setSize(event.target.value);
          }}
        />
        <input
          value={color}
          type="text"
          placeholder="Ex: Fushia"
          onChange={(event) => {
            setColor(event.target.value);
          }}
        />
        <input
          value={condition}
          type="text"
          placeholder="Ex: Neuf avec étiquette"
          onChange={(event) => {
            setCondition(event.target.value);
          }}
        />
        <input
          value={city}
          type="text"
          placeholder="Ex: Paris"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <>
          <input
            value={price}
            type="text"
            placeholder="0,00€"
            onChange={(event) => {
              setPrice(event.target.value);
            }}
          />
          <label>
            <input
              type="checkbox"
              checked={isExchangeAccepted}
              onChange={handleCheckboxChange}
            />
            Je suis intéressé(e) par les échanges.
          </label>
        </>

        <input type="submit" value="Publier l'offre" />
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default Publish;
