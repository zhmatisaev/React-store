import React from "react";

function Card(props) {
  return (
    <div className="card">
      <img width={133} height={120} src={props.imageUrl} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column price">
          <p> Цена:</p>
          <p> {props.price}</p>
        </div>
        <button className="button">
          <img width="11px" height="11px" src="/image/plus.png" />
        </button>
      </div>
    </div>
  );
}

export default Card;
