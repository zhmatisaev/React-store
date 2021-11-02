// import Drawer from "./components/Drawer/index";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Favorites from "./pages/Favorites";
// import { Route } from "react-router-dom";
// import AppContext from "./context";
// import React from "react";
// import axios from "axios";
// import "./index.scss";
// import Orders from "./pages/Orders.jsx";

// function App() {
//   const [cardOpened, setCardOpened] = React.useState(false);
//   const [items, setItems] = React.useState([]);
//   const [cartItems, setCartItems] = React.useState([]);
//   //  для поиска
//   const [searchValue, setSearchValue] = React.useState("");
//   //  для хранение favorit товаров
//   const [favorites, setFavorites] = React.useState("");
//   const [isLoading, setIsLoading] = React.useState(true);

//   React.useEffect(() => {
//     //  1-ой вариант запрос сделан с помощью  fetch
//     // fetch("https://617310d7110a740017222f6b.mockapi.io/items")
//     //   .then((res) => {
//     //     return res.json();
//     //   })
//     //   .then((json) => {
//     //     setItems(json);
//     //   });
//     // ************************************************************
//     // 2-ой вариант  запрос сделан с помощью  axios
//     async function fetchData() {
//       try {
//         const [itemsPespons, cartRespons, favoritesRespons] = await Promise.all(
//           [
//             axios.get("https://617310d7110a740017222f6b.mockapi.io/items"),
//             // запрос для получения данные из корзины с бэкенда
//             axios.get("https://617310d7110a740017222f6b.mockapi.io/cart"),
//             // и сохрани ее ответ в useState - setCartItems
//             // так не пропадает добавленные  данные в корзину в браузере при обнавление
//             axios.get("https://617310d7110a740017222f6b.mockapi.io/favorites"),
//           ]
//         );

//         setIsLoading(false);

//         setCartItems(cartRespons.data);
//         setFavorites(favoritesRespons.data);
//         setItems(itemsPespons.data);
//       } catch (error) {
//         alert("Ошибка при запросе данных");
//       }
//     }
//     fetchData();
//   }, []);
//   // при нажатия на кнопку плюс функция onAddtoCart добавляет товар в корзину
//   const onAddtoCart = async (obj) => {
//     try {
//       const findItem = cartItems.find(
//         (item) => Number(item.parentId) === Number(obj.id)
//       );
//       if (findItem) {
//         setCartItems((prev) =>
//           prev.filter((item) => Number(item.parentId) !== Number(obj.id))
//         );
//         await axios.delete(
//           `https://617310d7110a740017222f6b.mockapi.io/cart/${findItem.id}`
//         );
//       } else {
//         setCartItems((prev) => [...prev, obj]);
//         //  post создает новый массив для хранение товаров которые добавиляется  в корзину
//         const { data } = await axios.post(
//           "https://617310d7110a740017222f6b.mockapi.io/cart",
//           obj
//         );
//         setCartItems((prev) =>
//           prev.map((item) => {
//             if (item.parentId === data.parentId) {
//               return {
//                 ...item,
//                 id: data.id,
//               };
//             }
//             return item;
//           })
//         );
//       }
//     } catch (error) {
//       alert("Ошибка при добавлении в корзину");
//       console.error(error);
//     }
//   };

//   const onRemoveItem = (id) => {
//     try {
//       //  onRemoveItem при нажатия удаляет  карточки из корзины и из бэкенде по запросу axios.delete
//       axios.delete(`https://617310d7110a740017222f6b.mockapi.io/cart/${id}`);
//       // дай мне пред массив возми все что в нем есть и пробежись по нему отфилтруй тот эл которого id который передал в эту функцию
//       setCartItems((prev) =>
//         prev.filter((item) => Number(item.id) !== Number(id))
//       );
//     } catch (error) {
//       alert("Ошибка при удалении из корзины");
//       console.error(error);
//     }
//   };
//   //  Функция для добавления в favorites
//   const onAddToFavorit = async (obj) => {
//     try {
//       if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
//         axios.delete(
//           `https://617310d7110a740017222f6b.mockapi.io/favorites/${obj.id}`
//         );
//         setFavorites((prev) =>
//           prev.filter((item) => Number(item.id) !== Number(obj.id))
//         );
//       } else {
//         // иначе создать fovarites
//         const { data } = await axios.post(
//           "https://617310d7110a740017222f6b.mockapi.io/favorites",
//           obj
//         );
//         setFavorites((prev) => [...prev, data]);
//       }
//     } catch (error) {
//       alert("Не удалось добавить в фавориты");
//     }
//   };
//   const onChangeSearchInput = (event) => {
//     setSearchValue(event.target.value);
//     // console.log(event.target.value);
//   };

//   const isAddedItem = (id) => {
//     return cartItems.some((obj) => Number(obj.parentId) === Number(id));
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         items,
//         cartItems,
//         favorites,
//         isAddedItem,
//         onAddtoCart,
//         onAddToFavorit,
//         setCardOpened,
//         setCartItems,
//       }}
//     >
//       <div className="wrapper clear ">
//         {/* при клике onClose корзина закроется / будет false */}
//         <Drawer
//           items={cartItems}
//           onClose={() => setCardOpened(false)}
//           onRemove={onRemoveItem}
//           opened={cardOpened}
//         />

//         {/* при клике onClickCart корзина откроется  / буде  true */}
//         <Header onClickCart={() => setCardOpened(true)} />
//         {/* contnet  */}
//         <Route path="/" exact>
//           <Home
//             items={items}
//             cartItems={cartItems}
//             searchValue={searchValue}
//             setSearchValue={setSearchValue}
//             onChangeSearchInput={onChangeSearchInput}
//             onAddToFavorit={onAddToFavorit}
//             onAddtoCart={onAddtoCart}
//             isLoading={isLoading}
//           />
//         </Route>
//         <Route path="/favorites" exact>
//           <Favorites />
//         </Route>

//         <Route path="/orders" exact>
//           <Orders />
//         </Route>
//       </div>
//       )
//     </AppContext.Provider>
//   );
// }

// export default App;

// *************************************************************

import React from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer/index";
import AppContext from "./context";

import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://617310d7110a740017222f6b.mockapi.io/cart"),
            axios.get("https://617310d7110a740017222f6b.mockapi.io/favorites"),
            axios.get("https://617310d7110a740017222f6b.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных ;(");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://617310d7110a740017222f6b.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://617310d7110a740017222f6b.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении в корзину");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://617310d7110a740017222f6b.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении из корзины");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://617310d7110a740017222f6b.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
      } else {
        const { data } = await axios.post(
          "https://617310d7110a740017222f6b.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToFavorite,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>

        <Route path="/favorites" exact>
          <Favorites />
        </Route>

        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
