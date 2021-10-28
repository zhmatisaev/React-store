import React from "react";
import styles from "./Card.module.scss";

function Card({ onFavorit, price, imageUrl, title, onPlus }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorit, setFavorit] = React.useState(false);

  let onClickPlus = () => {
    onPlus({ title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorit({ title, imageUrl, price });
    setFavorit(!isFavorit);
  };

  return (
    //После разделение на модулей
    //обратимся  классу card через styles className={styles.card}
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        {/* если  isFavorit true фото с красным светом если false без света*/}
        <img
          src={isFavorit ? "/image/liked.svg" : "/image/unliked.svg"}
          alt="unliked"
        />
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
