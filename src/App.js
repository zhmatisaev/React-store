import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
  const arr = [
    {
      title: "Мужские кроссовки Nike Blaser Mid Suede",
      price: 12999,
      imageUrl: "/image/sneakers/1.jpg",
    },

    {
      title: "Мужские кроссовки Nike Air Max 270",
      price: 16999,
      imageUrl: "/image/sneakers/2.jpg",
    },
    {
      title: "Мужские кроссовки Nike Air Max 270",
      price: 16999,
      imageUrl: "/image/sneakers/3.jpg",
    },
    {
      title: "Мужские кроссовки Nike Air Max 270",
      price: 16999,
      imageUrl: "/image/sneakers/4.jpg",
    },
  ];

  return (
    <div className="wrapper clear">
      {/*  block basket */}
      <Drawer />
      {/* header */}
      <Header />
      {/* contnet  */}
      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>All sneakers</h1>
          <div className="search-blok d-flex">
            <img
              width="22px"
              height="22px"
              src="/image/search.svg"
              alt="search"
            />
            <input placeholder="search..." />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj) => (
            <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
