import React from "react";
import {Link} from "react-router-dom";

const OffersList = ({offers}) => {
  // console.log(offers);

  return (
    <div>
      {offers.map((offer) => {
        return (
          <Link to={`/offer/${offer._id}`}>
            <div>
              <h3>{offer.product_name}</h3>
              <p>{offer.product_description}</p>
              <p>{offer.product_price}</p>
              <h4>Product Details:</h4>
              <ul>
                {offer.product_details.map((detail, index) => {
                  return (
                    <li key={index}>
                      {Object.keys(detail)[0]}: {Object.values(detail)[0]}
                    </li>
                  );
                })}
              </ul>
              <h4>Product Pictures:</h4>
              {offer.product_pictures.map((picture, index) => {
                return (
                  <img
                    key={index}
                    src={picture.secure_url}
                    alt={picture.public_id}
                  />
                );
              })}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default OffersList;
