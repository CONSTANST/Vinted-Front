import {useEffect, useState} from "react";
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
    <div style={{"font-size": 0, "text-align": "center"}}>
      {data.offers.map((offer) => {
        return (
          <div
            style={{
              display: "inline-block",
              width: "24%",
              margin: "1%",
              verticalAlign: "top",
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            <OfferCard offerInfos={offer} key={offer._id} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;
