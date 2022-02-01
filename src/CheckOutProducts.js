import React from "react";
import "./CheckOutProducts.css";
import { useStateValue } from "./StateProvider";

function CheckOutProducts({ id, image, title, price, rating, hidebutton }) {
  const [{ basket }, dispatch] = useStateValue();

  function removeFromBasket() {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  }

  return (
    <div className="checkoutproduct">
      <img className="checkoutproduct-image" src={image} />
      <div className="checkoutproduct-info">
        <p className="checkoutproduct-title">{title}</p>
        <p className="checkoutproduct-price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutproduct-rating">
          {Array(rating)
            .fill()
            .map(() => {
              <p>🌟</p>;
            })}
        </div>
        {!hidebutton && (
          <button onClick={removeFromBasket}>Remove from basket</button>
        )}
      </div>
    </div>
  );
}

export default CheckOutProducts;
