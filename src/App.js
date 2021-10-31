import Drawer from "./components/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Route } from "react-router-dom";
import AppContext from "./context";
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
  // skeleton
  const [isLoading, setIsLoading] = React.useState(true);

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
    async function fetchData() {
      const itemsPespons = await axios.get(
        "https://617310d7110a740017222f6b.mockapi.io/items"
      );

      // запрос для получения данные из корзины с бэкенда
      const cartRespons = await axios.get(
        "https://617310d7110a740017222f6b.mockapi.io/cart"
      );
      // и сохрани ее ответ в useState - setCartItems
      // так не пропадает добавленные  данные в корзину в браузере при обнавление

      const favoritesRespons = await axios.get(
        "https://617310d7110a740017222f6b.mockapi.io/favorites"
      );
      setIsLoading(false);

      setCartItems(cartRespons.data);
      setFavorites(favoritesRespons.data);
      setItems(itemsPespons.data);
    }
    fetchData();
  }, []);
  // при нажатия на плюс функция onAddtoCart добавляет товар в корзину
  const onAddtoCart = (obj) => {
    // try {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(
        `https://617310d7110a740017222f6b.mockapi.io/cart/${obj.id}`
      );
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(obj.id))
      );
    } else {
      //  post создает новый массив для хранение товаров которые добавиляется  в корзину
      axios.post("https://617310d7110a740017222f6b.mockapi.io/cart", obj);
      setCartItems((prev) => [...prev, obj]);
    }
    // } catch (error) {}
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
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://617310d7110a740017222f6b.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        // иначе создать fovarites
        const { data } = await axios.post(
          "https://617310d7110a740017222f6b.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
    }
  };
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    // console.log(event.target.value);
  };

  const isAddedItem = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isAddedItem,
        onAddToFavorit,
        setCardOpened,
        setCartItems,
      }}
    >
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
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorit={onAddToFavorit}
            onAddtoCart={onAddtoCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
      </div>
      )
    </AppContext.Provider>
  );
}

export default App;
