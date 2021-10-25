import React from "react";
import styles from "./Card.module.scss";

function Card({ onFavorit, price, imageUrl, title, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);

  let onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    //После разделение на модулей
    //обратимся  классу card через styles className={styles.card}
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorit}>
        <img src="/image/unliked.svg" alt="Unliked" />
      </div>
      <img width={133} height={120} src={imageUrl} alt="sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column price">
          <p> Цена:</p>
          <p> {price}</p>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          // если isAdded  true btn-checked.svg иначе false btn-plus.svg
          src={isAdded ? "/image/btn-checked.svg" : "/image/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}

export default Card;
