import React from "react";
import Card from "../components/Card/index";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorit,
  onAddtoCart,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex justify-between align-center mb-40">
        <h1>
          {searchValue ? `поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-blok d-flex">
          <img
            width="22px"
            height="22px"
            src="/image/search.svg"
            alt="search"
          />
          {/*  если в (searchValue input) есть текст  */}
          {searchValue && (
            // выполнять этот част. появиться кнопка х
            <img
              onClick={() => setSearchValue("")}
              className="clear cu-p"
              src="/image/btn-remove.svg"
              alt="Remove"
            />
          )}

          <input
            onChange={onChangeSearchInput}
            value={searchValue} // input делает контролируемым
            placeholder="search..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          // пройти по массивом и найти все что будет написано в  searchValue.
          // title.toLowerCase() переведет на нижний регистр поиск будет даже если маленькой буквой
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorit={(obj) => onAddToFavorit(obj)}
              onPlus={(obj) => onAddtoCart(obj)}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
