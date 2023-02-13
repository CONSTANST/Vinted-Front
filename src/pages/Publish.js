import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Publish = ({token}) => {
  //   const [email, setEmail] = useState("");
  //   const [username, setUsername] = useState("");
  const [picture, setPicture] = useState();
  const [imageToDisplay, setImageToDisplay] = useState();
  const [titre, settitre] = useState("");
  const [description, setdescription] = useState("");
  const [marque, setmarque] = useState("");
  const [taille, settaille] = useState("");
  const [color, setcolor] = useState("");
  const [etat, setetat] = useState("");
  const [lieu, setlieu] = useState("");
  const [price, setprice] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleImageChange = (event) => {
    setPicture(event.target.files[0]);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = async (event, token) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("Titre", titre);
      formData.append("description", description);
      formData.append("picture", picture);
      formData.append("Marque", marque);
      formData.append("taille", taille);
      formData.append("color", color);
      formData.append("état", etat);
      formData.append("lieu", lieu);
      formData.append("price", price);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setImageToDisplay(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <Link to="/">Revenir vers la page d'acceuil</Link>
      <h2> Vends ton article </h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} />
        {imageToDisplay && <img src={imageToDisplay.secure_url} alt="" />}
        <input
          value={titre}
          type="texte"
          placeholder="Ex: Chemise sézane verte"
          onChange={(event) => {
            settitre(event.target.value);
          }}
        />
        <input
          value={description}
          type="texte"
          placeholder="Ex: neuve"
          onChange={(event) => {
            setdescription(event.target.value);
          }}
        />
        <input
          value={marque}
          type="text"
          placeholder="Ex: zara"
          onChange={(event) => {
            setmarque(event.target.value);
          }}
        />
        <input
          value={taille}
          type="text"
          placeholder="Ex: L/40/12"
          onChange={(event) => {
            settaille(event.target.value);
          }}
        />
        <input
          value={color}
          type="text"
          placeholder="Ex: Fushia"
          onChange={(event) => {
            setcolor(event.target.value);
          }}
        />
        <input
          value={etat}
          type="text"
          placeholder="Ex: Neuf avec étiquette"
          onChange={(event) => {
            setetat(event.target.value);
          }}
        />
        <input
          value={lieu}
          type="text"
          placeholder="Ex: Paris"
          onChange={(event) => {
            setlieu(event.target.value);
          }}
        />
        <>
          <input
            value={price}
            type="text"
            placeholder="0,00€"
            onChange={(event) => {
              setprice(event.target.value);
            }}
          />
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            Je suis intéressé(e) par les échanges.
          </label>
        </>

        <input type="submit" onSubmit={handleSubmit} />
      </form>
    </div>
  );
};
export default Publish;
