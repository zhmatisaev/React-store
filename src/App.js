import Card from "./components/Card/index";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
import React from "react";
// import useState from "useState";
function App() {
  const arr = [];
  const [cardOpened, setCardOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://617310d7110a740017222f6b.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  return (
    <div className="wrapper clear">
      {/* при клике onClose корзина закроется / будет false */}
      {cardOpened && <Drawer onClose={() => setCardOpened(false)} />}
      {/* при клике onClickCart корзина откроется  / буде  true */}
      <Header onClickCart={() => setCardOpened(true)} />
      {/* contnet  */}
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>All sneakers</h1>
          <div className="search-blok d-flex">
            <img
              width="22px"
              height="22px"
              src="/image/search.svg"
              alt="search"
            />
            <input placeholder="search..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onFovarit={() => console.log(obj)}
              onPlus={() => console.log(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
