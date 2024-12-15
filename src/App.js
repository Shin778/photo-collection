import { React, useState, useEffect } from "react";
import { Collection } from "./Collection";
import "./index.scss";

const ctgrs = [{ name: "All" }, { name: "Sea" }, { name: "Mountains" }, { name: "Architecture" }, { name: "Cities" }];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [collections, SetCollections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`https://675ee6a91f7ad2426996ff81.mockapi.io/photos?${categoryId ? `category=${categoryId}` : ""}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        SetCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        setError("Error while receiving data");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  return (
    <div className="App">
      <h1>My Photo Collection</h1>
      <div className="top">
        <ul className="tags">
          {ctgrs.map((obj, i) => (
            <li onClick={() => setCategoryId(i)} className={categoryId === i ? "active" : ""} key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="search-input" placeholder="Search by name" />
      </div>

      {error && <h2>{error}</h2>}

      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(inputValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
    </div>
  );
}

export default App;
