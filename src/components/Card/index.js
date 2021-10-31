import React from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";

function Card({
  id,
  onFavorit,
  price,
  imageUrl,
  title,
  onPlus,
  favorited = false,
  loading = false,
}) {
  const { isAddedItem } = React.useContext(AppContext);

  // const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorit, setFavorit] = React.useState(favorited);

  let onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
    // setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorit({ id, title, imageUrl, price });
    setFavorit(!isFavorit);
  };

  return (
    //После разделение на модулей
    //обратимся  классу card через styles className={styles.card}
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite} onClick={onClickFavorite}>
            {/* если  isFavorit true фото с красным светом если false без света*/}
            <img
              src={isFavorit ? "/image/liked.svg" : "/image/unliked.svg"}
              alt="unliked"
            />
          </div>
          <img width="100%" height={135} src={imageUrl} alt="sneakers" />
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
              src={
                isAddedItem(id)
                  ? "/image/btn-checked.svg"
                  : "/image/btn-plus.svg"
              }
              alt="Plus"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
