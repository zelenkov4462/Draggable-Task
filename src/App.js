import "./App.css";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { randomColor } from "randomcolor";
import Draggable from "react-draggable";

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const changeHandler = (e) => {
    setItem(e.target.value);
  };

  const getRandomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const addHandler = () => {
    if (item.trim() === "") return;
    setItems([
      ...items,
      {
        id: uuid(),
        item,
        color: randomColor({
          luminosity: "light",
        }),
        defaultPos: {
          x: getRandomNumber(0, width - 215),
          y: -getRandomNumber(0, height - 50),
        },
      },
    ]);
    setItem("");
  };

  const deleteHandler = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePos = (data, index) => {
    let newArray = [...items];
    newArray[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArray);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          value={item}
          onChange={changeHandler}
          type="text"
          placeholder="Enter your tasks..."
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              addHandler();
            }
          }}
        />
        <button onClick={addHandler} className="enter">
          ENTER
        </button>
      </div>
      {items.map((item, index) => (
        <Draggable
          key={index}
          defaultPosition={item.defaultPos}
          onStop={(_, data) => {
            updatePos(data, index);
          }}
        >
          <div className="todo__item" style={{ backgroundColor: item.color }}>
            <div className={"item__title"}> {`${item.item}`}</div>
            <button className="delete" onClick={() => deleteHandler(item.id)}>
              X
            </button>
          </div>
        </Draggable>
      ))}
    </div>
  );
}

export default App;
