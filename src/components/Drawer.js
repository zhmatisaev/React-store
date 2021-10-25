import React from "react";

function Drawer({ onClose, onDelete, items = [] }) {
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
        {/* basket-items */}
        <div className="items">
          {items.map((obj) => (
            <div className="cartItem d-flex align-center mb-20 ">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg"
              ></div>
              <div className="mr-20 flex">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price} </b>
              </div>
              <img
                // onClick={onDelete}
                className="removeBtn"
                src="/image/btn-remove.svg"
                alt="Remove"
              />
            </div>
          ))}
        </div>

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
          <button className="greenButton">
            Оформить заказ <img src="/image/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
