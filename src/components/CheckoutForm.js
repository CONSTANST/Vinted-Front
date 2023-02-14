import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

const CheckoutForm = ({token}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  // State servant à savoir si ma requête attend toujours une réponse et à savoir si le paiement a été effectué
  const location = useLocation();
  const {title, price} = location.state;
  // console.log(title);
  // console.log(price);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      //
      // console.log(cardElement);
      //
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      // console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      //
      console.log(stripeToken);
      //
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {token: stripeToken, title: title, amount: price}
      );
      //
      // console.log(response);
      console.log(response.data);
      //
      if (response.data === "succeeded") {
        setCompleted(true);
        setIsLoading(false);
      }
    } catch (error) {
      // console.log(error.message);
      console.log(error.response.data);
    }
  };
  return token ? (
    <form style={{width: "500px"}} onSubmit={handleSubmit}>
      <h3> Résumé de la commande</h3>
      <p>
        <span>{title} :</span>
        <span>{price}</span>
      </p>
      <CardElement />
      {completed ? (
        <p>Paiement effectué</p>
      ) : (
        <button disabled={isLoading} type="submit">
          Régler
        </button>
      )}
    </form>
  ) : (
    <Navigate to="/login" />
  );
};
export default CheckoutForm;
