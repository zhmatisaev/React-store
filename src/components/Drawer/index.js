// import React from "react";
// import Info from "../Info.jsx";
// import axios from "axios";
// import { useCart } from "../../hooks/useCart.js";
// import styles from "./Drawer.module.scss";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// function Drawer({ onClose, onRemove, items = [], opened }) {
//   const { cartItems, setCartItems, totalPrice } = useCart();
//   const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
//   const [orderId, setOrderId] = React.useState(null);
//   const [isLoading, setIsLoading] = React.useState(false);

//   const onClickOrder = async () => {
//     try {
//       setIsLoading(true);
//       const { data } = await axios.post(
//         "https://617310d7110a740017222f6b.mockapi.io/orders",
//         {
//           item: cartItems,
//         }
//       );
//       setOrderId(data.id);

//       setIsOrderCompleted(true);
//       setCartItems([]);
//       for (let i = 0; i < cartItems.length; i++) {
//         const item = cartItems[i];
//         await axios.delete(
//           "https://617310d7110a740017222f6b.mockapi.io/cart",
//           item.id
//         );
//         delay(1000);
//       }
//     } catch (error) {
//       //   alert("Ошибка при создании заказа!");
//     }
//     setIsLoading(false);
//   };
//   return (
//     <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
//       <div className={styles.drawer}>
//         <h2 className="mb-30 d-flex justify-between">
//           Корзина
//           <img
//             onClick={onClose}
//             className="cu-p"
//             src="/image/btn-remove.svg"
//             alt="Remove"
//           />
//         </h2>
//         {items.length > 0 ? (
//           <div className="d-flex  flex-column flex">
//             <div className="items flex">
//               {items.map((obj) => (
//                 <div
//                   key={obj.id}
//                   className="cartItem d-flex align-center mb-20 "
//                 >
//                   <div
//                     style={{ backgroundImage: `url(${obj.imageUrl})` }}
//                     className="cartItemImg"
//                   ></div>
//                   <div className="mr-20 flex">
//                     <p className="mb-5">{obj.title}</p>
//                     <b>{obj.price} </b>
//                   </div>
//                   <img
//                     onClick={(obj) => onRemove(obj.id)}
//                     className="removeBtn"
//                     src="/image/btn-remove.svg"
//                     alt="Remove"
//                   />
//                 </div>
//               ))}
//             </div>
//             <div className="cartTotalBlock">
//               <ul>
//                 <li className="d-flex">
//                   <span>Итого:</span>
//                   <div></div>
//                   <b>{totalPrice} руб.</b>
//                 </li>
//                 <li className="d-flex">
//                   <span>Налог: 5% </span>
//                   <div></div>
//                   <b>{(totalPrice / 100) * 5} руб.</b>
//                 </li>
//               </ul>
//               <button
//                 desabled={isLoading}
//                 onClick={onClickOrder}
//                 className="greenButton"
//               >
//                 Оформить заказ
//                 <img src="/image/arrow.svg" alt="Arrow" />
//               </button>
//             </div>
//           </div>
//         ) : (
//           <Info
//             title={isOrderCompleted ? "Заказ оформлен" : "Корзина пустая"}
//             description={
//               isOrderCompleted
//                 ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
//                 : "Добавьте хотя бы пару кроссовок , чтобы сделать заказ."
//             }
//             image={
//               isOrderCompleted
//                 ? "/image/complete-order.jpg"
//                 : "/image/empty-cart.jpg"
//             }
//           />
//         )}

//         {/* basket-items */}

//         {/* basket-items
//           <div className="cartItem d-flex align-center ">
//             <div
//               style={{ backgroundImage: "url(/image/sneakers/1.jpg)" }}
//               className="cartItemImg"
//             ></div>
//             <div className="mr-20 flex">
//               <p className="mb-5">Мужские кроссовки Nike Air Max 270</p>
//               <b>12 999 руб. </b>
//             </div>
//             <img
//               className="removeBtn"
//               src="/image/btn-remove.svg"
//               alt="Remove"
//             />
//           </div>
//         {/* </div> */}
//       </div>
//     </div>
//   );
// }

// export default Drawer;

// *****************************************

import React from "react";
import axios from "axios";

import Info from "../Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://617310d7110a740017222f6b.mockapi.io/orders",
        {
          items: cartItems,
        }
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://617310d7110a740017222f6b.mockapi.io/cart",
          item.id
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img
            onClick={onClose}
            className="cu-p"
            src="image/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"
                  ></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="image/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб. </b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ <img src="image/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "image/complete-order.jpg"
                : "image/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
