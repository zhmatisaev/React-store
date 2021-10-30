import React from "react";
import Card from "../components/Card";

function Favorites({ items, onAddToFavorit }) {
  return (
    <div className="contert p-40">
      <div className="d-flex align-center juctify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="d-flex flex-wrap">
        {items.map((item, index) => (
          <Card
            key={index}
            // id={item.id}
            // title={item.title}
            // price={item.price}
            // imageUrl={item.imageUrl}
            favorited={true}
            onFavorit={onAddToFavorit}
            {...item}

            // onPlus={(obj) => onAddtoCart(obj)}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
