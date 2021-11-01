import axios from "axios";
import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
  const { onAddToFavorit, onAddtoCart } = React.useContext(AppContext);
  // skeleton
  const [isLoading, setIsLoading] = React.useState(true);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://617310d7110a740017222f6b.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Ошибка при запросе заказов");
      }
    })();
  }, []);
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            //   title={item.title}
            //   price={item.price}
            //   imageUrl={item.imageUrl}
            // onFavorit={(obj) => onAddToFavorit(obj)}
            // onPlus={(obj) => onAddtoCart(obj)}
            // added={isAddedItem(item && item.id)}
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;
