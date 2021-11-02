// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "../hooks/useCart";

// function Header(props) {
//   const { totalPrice } = useCart();

//   return (
//     <header className=" opacity 0.5 d-flex justify-between align-center p-40">
//       <Link to="/">
//         <div className="d-flex align-center">
//           <img
//             className="mr-15"
//             width="40px"
//             height="40px"
//             src="/image/logo.png"
//             alt="logo"
//           />

//           <div className="headerInfo">
//             <h3 className="text-uppercase">React Sneakers</h3>
//             <p className="opacity-5">Магазин лучших кроссовок</p>
//           </div>
//         </div>
//       </Link>

//       <ul className="d-flex">
//         <li onClick={props.onClickCart} className="mr-30 cu-p">
//           <img
//             width="18px"
//             height="18px"
//             src="/image/shopping-cart.png"
//             alt="Корзина"
//           />
//           <span> {totalPrice}руб.</span>
//         </li>
//         <li className="mr-20 cu-p">
//           <Link to="/favorites">
//             <img
//               width="18px"
//               height="18px"
//               src="/image/heart.svg"
//               alt="Закладки"
//             />
//           </Link>
//         </li>

//         <li>
//           <Link to="/orders">
//             <img
//               width="18px"
//               height="18px"
//               src="/image/user.png"
//               alt="Пользователь"
//             />
//           </Link>
//         </li>
//       </ul>
//     </header>
//   );
// }

// export default Header;

// *************************************************

import React from "react";
import { Link } from "react-router-dom";

import { useCart } from "../hooks/useCart";

function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/image/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/image/cart.svg" alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="/image/heart.svg" alt="Закладки" />
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img
              width={18}
              height={18}
              src="/image/user.png"
              alt="Пользователь"
            />
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
