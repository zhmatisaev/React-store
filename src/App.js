import Card from "./components/Card/index";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
import axios from "axios";
import "./index.scss";
// import useState from "useState";
function App() {
  const [cardOpened, setCardOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);

  const [cartItems, setCartItems] = React.useState([]);

  //  для поиска
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    //  1-ой вариант запрос сделан с помощью  fetch
    // fetch("https://617310d7110a740017222f6b.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    // ************************************************************
    // 2-ой вариант  запрос сделан с помощью  axios
    axios
      .get("https://617310d7110a740017222f6b.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });

    // запрос для получения данные из корзины с бэкенда
    axios
      .get("https://617310d7110a740017222f6b.mockapi.io/cart")
      .then((res) => {
        // и сохрани ее ответ в useState - setCartItems
        // так не пропадает добавленные  данные в корзину в браузере при обнавление
        setCartItems(res.data);
      });
  }, []);
  // при нажатия на плюс функция onAddtoCart добавляет товар в корзину
  const onAddtoCart = (obj) => {
    //  post создает новый массив для хранение товаров которые добавиляется  в корзину
    axios.post("https://617310d7110a740017222f6b.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    console.log(id);
    // axios.delete(`https://617310d7110a740017222f6b.mockapi.io/cart/${id}`);
    // дай мне пред массив возми все что в нем и пробежись по нему от филтруй тот эл которого id который передал в эту функцию
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <div className="wrapper clear ">
      {/* при клике onClose корзина закроется / будет false */}
      {cardOpened && (
        <Drawer
          items={cartItems}
          // onDelete={() => setDeleteItem(false)}
          onClose={() => setCardOpened(false)}
          onRemove={onRemoveItem}
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
