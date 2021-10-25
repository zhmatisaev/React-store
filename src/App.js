import Card from "./components/Card/index";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import "./index.scss";
// import useState from "useState";
function App() {
  const [cardOpened, setCardOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const [cartItems, setCartItems] = React.useState([]);

  //  для поиска
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    fetch("https://617310d7110a740017222f6b.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddtoCart = (obj) => {
    setCartItems((prev) => [...prev, obj]);
  };
  // console.log(cartItems);
  //
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {/* при клике onClose корзина закроется / будет false */}
      {cardOpened && (
        <Drawer
          items={cartItems}
          // onDelete={() => setDeleteItem(false)}
          onClose={() => setCardOpened(false)}
        />
      )}
      {/* при клике onClickCart корзина откроется  / буде  true */}
      <Header onClickCart={() => setCardOpened(true)} />
      {/* contnet  */}
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>
            {searchValue
              ? `поиск по запросу: "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-blok d-flex">
            <img
              width="22px"
              height="22px"
              src="/image/search.svg"
              alt="search"
            />
            <img
              className="clear cu-p"
              src="/image/btn-remove.svg"
              alt="Remove"
            />
            <input
              onChange={onChangeSearchInput}
              value={searchValue} // input делает контролируемым
              placeholder="search..."
            />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFovarit={() => console.log("Добавили в закладки")}
              onPlus={(obj) => onAddtoCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
