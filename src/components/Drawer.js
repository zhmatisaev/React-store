import React from "react";
import AppContext from "../context";
import Info from "./Info.jsx";

function Drawer({ onClose, onRemove, items = [] }) {
  const { setCartItems } = React.useContext(AppContext);
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const onClickOrder = () => {
    setIsOrderCompleted(true);
    setCartItems([]);
  };
  return (
    <div className="overlay">
      <div className="drawer ">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            onClick={onClose}
            className="cu-p"
            src="/image/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div className="d-flex  flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20 "
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} </b>
                  </div>
                  <img
                    onClick={(obj) => onRemove(obj.id)}
                    className="removeBtn"
                    src="/image/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li className="d-flex">
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li className="d-flex">
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">
                Оформить заказ
                <img src="/image/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title="Корзина пустая"
            description="Добавьте хотя бы пару кроссовок , чтобы сделать заказ."
            image="/image/empty-cart.jpg"
          />
        )}

        {/* basket-items */}

        {/* basket-items
          <div className="cartItem d-flex align-center ">
            <div
              style={{ backgroundImage: "url(/image/sneakers/1.jpg)" }}
              className="cartItemImg"
            ></div>
            <div className="mr-20 flex">
              <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
              <b>12 999 руб. </b>
            </div>
            <img
              className="removeBtn"
              src="/image/btn-remove.svg"
              alt="Remove"
            />
          </div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Drawer;
