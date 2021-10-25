import React from "react";

function Header(props) {
  return (
    <header className=" opacity 0.5 d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img
          className="mr-15"
          width="40px"
          height="40px"
          src="/image/logo.png"
          alt="logo"
        />
        <div className="headerInfo">
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </div>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img
            width="18px"
            height="18px"
            src="/image/shopping-cart.png"
            alt="cart"
          />
          <span> 1205 руб.</span>
        </li>
        <li>
          <img width="18px" height="18px" src="/image/user.png" alt="user" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
