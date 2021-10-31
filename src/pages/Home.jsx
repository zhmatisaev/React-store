import React from "react";
import Card from "../components/Card/index";
import AppContext from "../context";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorit,
  onAddtoCart,
  isLoading,
}) {
  //   const { isAddedItem } = React.useContext(AppContext);
  const renderItems = () => {
    // пройти по массивом и найти все что будет написано в  searchValue.
    // title.toLowerCase() переведет на нижний регистр поиск будет даже если маленькой буквой
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        //   title={item.title}
        //   price={item.price}
        //   imageUrl={item.imageUrl}
        onFavorit={(obj) => onAddToFavorit(obj)}
        onPlus={(obj) => onAddtoCart(obj)}
        // added={isAddedItem(item && item.id)}
        loading={isLoading}
        {...item}
      />
    ));
  };
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

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
