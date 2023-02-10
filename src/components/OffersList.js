import React, {useState} from "react";

const OffersList = ({offers}) => {
  return (
    <ul>
      {offers.map((offer) => (
        <li key={offer.id}>
          <h3>{offer.title}</h3>
          <p>Prix :{offer.price}</p>
        </li>
      ))}
    </ul>
  );
};
export default OffersList;
