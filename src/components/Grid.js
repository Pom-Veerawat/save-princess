import React, { useEffect, useState } from "react";
import classes from "./Grid.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faFrog,
  faFemale,
  faCrown,
  faArrowUp,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faWalking,
} from "@fortawesome/free-solid-svg-icons";

const Grid = (props) => {
  const [gridSize, setGridSize] = useState(props.size); // default size is 5
  const [urlFunctionApp, setUrlFunctionApp] = useState("https://saveprincess.azurewebsites.net/getnextmove"); // default size is 5
  const [gridDiv, setridDiv] = useState(<></>);

  const [princessLocation, setPrincessLocation] = useState({ i: 2, j: 2 });
  const [princeLocation, setPrinceLocation] = useState({
    princei: 1,
    princej: 1,
  });
  const [update, setUpdate] = useState(false);

  /*  useEffect(() => {generateGrid()}, [gridSize]); */
  useEffect(() => {
    setridDiv(generateGrid());
  }, [update]);
  const handleSizeChange = (event) => {
    
    setGridSize(event.target.value);
  };

  const urlChange = (event) => {
    
    setUrlFunctionApp(event.target.value);
  };
  const onBtnClick = () => {
    /* setPrincessLocation({
      i: getRandomInt(0, gridSize - 1),
      j: getRandomInt(0, gridSize - 1),
    }); */

    setPrinceLocation((prev) => {
      return {
        ...prev,
        princei: getRandomInt(0, gridSize - 1),
        princej: getRandomInt(0, gridSize - 1),
      };
    });

    setPrincessLocation((prev) => {
      return {
        ...prev,
        i: getRandomInt(0, gridSize - 1),
        j: getRandomInt(0, gridSize - 1),
      };
    });

    /*  setPrinceLocation({
        princei: getRandomInt(0, gridSize - 1),
        princej: getRandomInt(0, gridSize - 1)
    }); */
    setUpdate((prev) => {
      return !prev;
    });
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // alert(min+ " " +max);
    const rand = Math.floor(Math.random() * (max - min) + min);

    //alert(rand);
    return rand; // The maximum is exclusive and the minimum is inclusive
  }

  const movePrince = (direction) => {
    if (direction === "UP") {
      if (princeLocation.princej > 0) {
        setPrinceLocation((prev) => {
          return { ...prev, princej: prev.princej - 1 };
        });
      }
    }
    if (direction === "DOWN") {
      if (princeLocation.princej < gridSize - 1) {
        setPrinceLocation((prev) => {
          return { ...prev, princej: prev.princej + 1 };
        });
      }
    }
    if (direction === "LEFT") {
      if (princeLocation.princei > 0) {
        setPrinceLocation((prev) => {
          return { ...prev, princei: prev.princei - 1 };
        });
      }
    }
    if (direction === "RIGHT") {
      if (princeLocation.princei < gridSize - 1) {
        setPrinceLocation((prev) => {
          return { ...prev, princei: prev.princei + 1 };
        });
      }
    }

    setUpdate((prev) => {
      return !prev;
    });
  };

  const generateGrid = () => {
    //alert('renew grid')
    const rows = [];
    for (let i = 0; i < gridSize; i++) {
      let prince;
      let princess;
      let setcolor = false;
      const cells = [];
      for (let j = 0; j < gridSize; j++) {
        if (
          princeLocation.princei == princessLocation.i &&
          princeLocation.princej == princessLocation.j
        ) {
          prince = <FontAwesomeIcon icon={faCrown} />;
        } else {
        }
        if (princeLocation.princei == i && princeLocation.princej == j) {
          prince = <FontAwesomeIcon icon={faFrog} />;
          if (
            princeLocation.princei == princessLocation.i &&
            princeLocation.princej == princessLocation.j
          ) {
            prince = <FontAwesomeIcon icon={faWalking} size="lg" />;
            setcolor = true;
          }
        }
        if (princessLocation.i == i && princessLocation.j == j) {
          princess = <FontAwesomeIcon icon={faFemale} size="lg" />;
        }

        cells.push(
          <div key={`${i}-${j}`} className={classes.cell} style={{color: setcolor?"red":""}}>
            {/* {txt==""?`${i}-${j}`:txt}  */}
            {prince} {princess}
          </div>
        );
        prince = null;
        princess = null;
        setcolor=false;
        //txt="";
      }
      rows.push(
        <div key={i} className="row">
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div>
      <label htmlFor="grid-size">Grid size:</label>
      <input
        id="grid-size"
        type="number"
        value={gridSize}
        onChange={handleSizeChange}
      />
      <button onClick={onBtnClick}>Generate new grid and token</button>
      <div className={`${classes.grid}`}>{gridDiv /* generateGrid() */}</div>
      <button onClick={() => movePrince("UP")}>
        <FontAwesomeIcon icon={faArrowUp} />
        UP
      </button>
      <button onClick={() => movePrince("DOWN")}>
        <FontAwesomeIcon icon={faArrowDown} />
        DOWN
      </button>
      <button onClick={() => movePrince("LEFT")}>
        <FontAwesomeIcon icon={faArrowLeft} />
        LEFT
      </button>
      <button onClick={() => movePrince("RIGHT")}>
        <FontAwesomeIcon icon={faArrowRight} />
        RIGHT
      </button>
      <br>
      </br>
      <input
        id="urlmove"
        type="text"
        value={urlFunctionApp}
        onChange={urlChange}
        style={{width:"80%"}}
      />
      <br>
      </br>
      <button>Next Move</button>

     {/*  <div>{`prince = ${princeLocation.princei} ${princeLocation.princej} `}</div>
      <div>{`princess = ${princessLocation.i} ${princessLocation.j}`}</div> */}
    </div>
  );
};

export default Grid;
