import { useEffect, useState } from "react";
import axios from "axios";
import OfferCard from "../components/OfferCard";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading ...</p>
  ) : (
    <div>
      {data.offers.map((offer) => {
        return <OfferCard offerInfos={offer} key={offer._id} />;
      })}
    </div>
  );
};

export default Home;
