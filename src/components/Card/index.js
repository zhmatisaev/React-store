import React from "react";
import styles from "./Card.module.scss";

function Card(props) {
  const [isAdded, setIsAdded] = React.useState(false);

  let onClickPlus = () => {
    setIsAdded(!isAdded);
  };
  return (
    //После разделение на модулей
    //обратимся  классу card через styles className={styles.card}
    <div className={styles.card}>
      <div className={styles.favorite} onClick={props.onFavorit}>
        <img src="/image/unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={120} src={props.imageUrl} alt="sneakers" />
      <h5>{props.title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column price">
          <p> Цена:</p>
          <p> {props.price}</p>
        </div>
        {/* <button className="button" onClick={props.onPlus}> */}
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/image/btn-checked.svg" : "/image/btn-plus.svg"}
          alt="Plus"
        />
        {/* </button> */}
      </div>
    </div>
  );
}

export default Card;