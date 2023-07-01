/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dragId, setDragId] = useState();
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [imgOverlayURL, setImgOverlayURL] = useState("");
  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    const data = JSON.parse(localStorage.getItem("data"));
    const dragBox = data.find((box) => {
      return box.title === dragId;
    });
    const dropBox = data.find((box) => box.title === ev.currentTarget.id);
    const dragBoxOrder = dragBox.position;
    const dropBoxOrder = dropBox.position;
    const newBoxState = data.map((box) => {
      if (box.title === dragId) {
        box.position = dropBoxOrder;
      }
      if (box.title === ev.currentTarget.id) {
        box.position = dragBoxOrder;
      }
      return box;
    });

    setData(() => {
      return newBoxState;
    });
    localStorage.setItem("data", JSON.stringify(newBoxState));
  };

  const handleClick = (e) => {
    setIsOverlayVisible(true);
    setImgOverlayURL(e.target.src);
  };

  const handleKeyUp = (e) => {
    const keys = {
      27: () => {
        e.preventDefault();
        setIsOverlayVisible(false);
      },
    };

    if (keys[e.keyCode]) {
      keys[e.keyCode]();
    }
  };
  const getData = () => {
    fetch("/api/cats", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response)=> response.json())
      .then((myJson)=>{
        setData(myJson);
        localStorage.setItem("data", JSON.stringify(myJson));
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("data")) {
      getData();
    } else setIsLoading(false);
    window.addEventListener("keyup", handleKeyUp, false);
    return  ()=> {
      window.removeEventListener("keyup", handleKeyUp, false);
    };
  }, []);
  const localData = JSON.parse(localStorage.getItem("data"));
  return (
    <>
      <div className="grid">
        {localData
          ?.sort((a, b) => a.position - b.position)
          .map((item) => (
            <div
              draggable={true}
              id={item.title}
              key={item.title}
              onDragOver={(ev) => ev.preventDefault()}
              onDragStart={handleDrag}
              onDrop={handleDrop}
            >
              <div>{item.title}</div>

              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                <img src={item.img} alt={item.title} onClick={handleClick} />
              )}
            </div>
          ))}
      </div>
      {isOverlayVisible ? (
        <div className="overlay">
          <img src={imgOverlayURL} alt="" />
          <button onClick={() => setIsOverlayVisible(false)}>Close</button>
        </div>
      ) : null}
    </>
  );
}

export default App;
