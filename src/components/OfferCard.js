import { Link } from "react-router-dom";

const OfferCard = ({ offerInfos }) => {
  //   console.log(props);
  return (
    // <p>salut</p>
    <Link to={`/offer/${offerInfos._id}`}>
      <article>
        <div>
          {/* Si le vendeur a un avatar, je l'affiche */}
          {offerInfos.owner.account.avatar && (
            <img
              style={{
                height: 50,
                width: 50,
                borderRadius: "50%",
                objectFit: "cover",
              }}
              src={offerInfos.owner.account.avatar.secure_url}
              alt="owner"
            />
          )}
          <span>{offerInfos.owner.account.username}</span>
        </div>
        <img
          src={offerInfos.product_image.secure_url}
          alt="product"
          style={{ height: 400, width: 200, objectFit: "cover" }}
        />
        <p>{offerInfos.product_price} €</p>
        {/* <p> Taille : {offerInfos.product_details[1].TAILLE}</p> */}
        {/* Column-reverse permet d'inverser l'ordre de mes p */}
        <div style={{ display: "flex", flexDirection: "column-reverse" }}>
          {/* Je parcours procuct_detail */}
          {offerInfos.product_details.map((detail, index) => {
            // console.log(detail);
            // Si l'objet detail a une clef TAILLE, je l'affiche
            if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              // Si l'objet a un clef MARQUE je l'affiche
              return <p key={index}>{detail.MARQUE}</p>;
            } else {
              return null;
            }
          })}
        </div>
      </article>
    </Link>
  );
};

export default OfferCard;
