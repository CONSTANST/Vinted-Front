import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import {Navigate} from "react-router-dom";

// Je me connecte au compte stripe en front en fournissant la clef publique du Reacteur
const stripePromise = loadStripe(
  "pk_test_51MbLbgGzrh9Ois4wYtKRAZkaUaN5Qji9chIMO56r3cainb3IVYUeEGISXMfR0G2wXDCAgPDHYkJdiEWUqS9N8cB100B2y0HzYb"
);
const Payment = ({token}) => {
  return token ? (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm token={token} />
      </Elements>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default Payment;
