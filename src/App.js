import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Route } from "react-router-dom";
import React from "react";
import axios from "axios";
import "./index.scss";

function App() {
  const [cardOpened, setCardOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  //  для поиска
  const [searchValue, setSearchValue] = React.useState("");
  //  для хранение favorit товаров
  const [favorites, setFavorites] = React.useState("");

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

    axios
      .get("https://617310d7110a740017222f6b.mockapi.io/favorites")
      .then((res) => {
        setFavorites(res.data);
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
    //  onRemoveItem при нажатие удаляет  карточки из корзины и из бэкенде по запросу axios.delete
    axios.delete(`https://617310d7110a740017222f6b.mockapi.io/cart/${id}`);
    // дай мне пред массив возми все что в нем и пробежись по нему от филтруй тот эл которого id который передал в эту функцию
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  //  Функция для добавления в favorites
  const onAddToFavorit = async (obj) => {
    if (favorites.find((obj) => obj.id === obj.id)) {
      axios.delete(
        `https://617310d7110a740017222f6b.mockapi.io/favorites/${obj.id}`
      );
    } else {
      // иначе создать fovarites
      const { data } = await axios.post(
        "https://617310d7110a740017222f6b.mockapi.io/favorites",
        obj
      );
      setFavorites((prev) => [...prev, data]);
    }
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
          onClose={() => setCardOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      {/* при клике onClickCart корзина откроется  / буде  true */}
      <Header onClickCart={() => setCardOpened(true)} />
      {/* contnet  */}
      <Route path="/" exact>
        <Home
          items={items}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorit={onAddToFavorit}
          onAddtoCart={onAddtoCart}
        />
      </Route>
      <Route path="/favorites" exact>
        <Favorites items={favorites} onAddToFavorit={onAddToFavorit} />
      </Route>
    </div>
  );
}

export default App;
