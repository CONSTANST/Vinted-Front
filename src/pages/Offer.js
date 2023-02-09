import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // Je récupère l'id présent dans l'url
  const params = useParams();
  const id = params.id;
  //   console.log(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      <img src={data.product_image.secure_url} alt="product" />
      <p>{data.product_price} €</p>
      {/* Je parcours product_details */}
      {data.product_details.map((detail, index) => {
        // Je récupère le nomde la clef de detail
        const key = Object.keys(detail)[0];
        // console.log(key);
        // console.log(detail[key]);
        return (
          <div key={index}>
            {/* J'affiche le nom dela clef  */}
            <span>{key} : </span>
            {/* et son contenu */}
            <span>{detail[key]}</span>
          </div>
        );
      })}
      <p>{data.product_name}</p>
      <p>{data.product_description}</p>
      <p>{data.owner.account.username}</p>
    </div>
  );
};

export default Offer;
