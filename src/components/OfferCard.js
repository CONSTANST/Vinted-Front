import {Link} from "react-router-dom";

const OfferCard = ({offerInfos}) => {
  //   console.log(props);
  return (
    // <p>salut</p>
    <Link to={`/offer/${offerInfos._id}`} style={{textDecoration: "none"}}>
      <article
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div style={{display: "flex", alignItems: "center"}}>
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
          style={{
            height: 600,
            width: 575,
            objectFit: "cover",
            marginLeft: "165px",
          }}
        />
        <div style={{width: "605px", height: "400px", marginLeft: "165px"}}>
          <p style={{fontWeight: "bold", fontSize: "20px"}}>
            {offerInfos.product_price} €
          </p>{" "}
          {offerInfos.product_details.map((detail, index) => {
            // console.log(detail);
            // Si l'objet detail a une clef TAILLE, je l'affiche
            if (detail.TAILLE) {
              return <p key={index}>{detail.TAILLE}</p>;
            } else if (detail.MARQUE) {
              // Si l'objet a un clef MARQUE je l'affiche
              return <p key={index}>{detail.MARQUE}</p>;
            } else if (detail.ÉTAT) {
              return <p key={index}>État : {detail.ÉTAT}</p>;
            } else if (detail.COULEUR) {
              return <p key={index}>Couleur : {detail.COULEUR}</p>;
            } else if (detail.EMPLACEMENT) {
              return <p key={index}>Emplacement : {detail.EMPLACEMENT}</p>;
            } else {
              return null;
            }
          })}
        </div>

        {/* <p> Taille : {offerInfos.product_details[1].TAILLE}</p> */}
        {/* Column-reverse permet d'inverser l'ordre de mes p */}
        {/* <div style={{display: "flex", flexDirection: "column-reverse"}}> */}
        {/* Je parcours procuct_detail */}
        {/* </div> */}
      </article>
    </Link>
  );
};

export default OfferCard;
