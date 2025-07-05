import { useEffect, useState } from "react";
import menu from "./assets/menu.png";
import bar from "./assets/menus.png";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(true);
  const [isgrid, setGrid] = useState(true);

  useEffect(() => {
    fetch(
      page
        ? "https://fakestoreapi.com/products"
        : "https://jsonplaceholder.typicode.com/posts"
    )
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, [page, isgrid]);

  const knownPage = {
    true: "button bg-slate-700 w-[50%] text-2xl cursor-pointer",
    false: "button bg-slate-500 w-[50%] text-2xl cursor-pointer",
  };

  return (
    <>
      <div className="navigation max-w-[1232px] mx-auto flex justify-between h-15 rounded text-slate-100 text-center mb-10">
        <div className={[knownPage[page]]} onClick={() => setPage(true)}>
          Products
        </div>
        <div className={[knownPage[!page]]} onClick={() => setPage(false)}>
          Posts
        </div>
        <div className="flex text-center justify-center bg-slate-300 px-4 py-2 cursor-pointer">
          <img
            src={isgrid ? menu : bar}
            alt=""
            className="w-[40px]"
            onClick={() => setGrid(!isgrid)}
          />
        </div>
      </div>

      {page ? (
        <div
          className={`container grid grid-cols-${
            isgrid ? 4 : 2
          } max-w-[1232px] mx-auto gap-5 `}
        >
          {products.map((el) => {
            return (
              <div
                className={`card flex ${
                  isgrid ? "flex-col" : ""
                } p-5 rounded shadow-2xl cursor-pointer`}
                key={el.id}
              >
                <img src={el.image} alt="" className="w-[200px] rounded h-50 object-contain m-4" />
                <ol>
                  <li>
                    <b>Name :</b> {el.title}
                  </li>
                  <li className="text-green-700">
                    <b className="text-black">Price: </b> {el.price}$
                  </li>
                  <li>
                    <b>Rating: </b> {"⭐".repeat(el?.rating?.rate || 1)}
                  </li>
                </ol>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`card grid grid-cols-${isgrid ? 4 : 2} max-w-[1232px] mx-auto gap-5 `}>
          {products.map((el) => {
            return (
              <div
                className="card flex flex-col p-5 rounded shadow-2xl cursor-pointer "
                key={el.id}
              >
                <h3 className="text-xl font-bold">{el.title}</h3>
                <p>{el.body}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default App;
