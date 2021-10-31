import React from "react";
import AppContext from "../context";

function Info({ title, description, image }) {
  const { setCardOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center flex-column flex">
      <img
        className="mb-20"
        width="120px"
        height="120px"
        src={image}
        alt="cart"
      />
      <h2>{title} </h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCardOpened(false)} className="greenButton">
        <img src="/image/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
}

export default Info;
