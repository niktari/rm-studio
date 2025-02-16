let c = document.getElementById("container");

// const area = window.innerHeight * window.innerWidth;
const oneTile = window.innerWidth / 15;
const totalArea = (window.innerHeight / oneTile) * 15;
const maxTiles = (Math.floor(totalArea / 15)) * 15

const minY = window.innerHeight / 6;
const maxY = window.innerHeight - (window.innerHeight / 6);

let startingValue = 3;
const tiles = [];

generateDivs();
document.addEventListener("mousemove", handleMouseMove);

let animationFrameId = null;

// Create divs once and store them
function generateDivs() {
    for (let i = 0; i < maxTiles; i++) {
        let myDiv = document.createElement("div");

        myDiv.textContent = i % 2 === 0 ? (i % 4 !== 0 ? "M" : "R") : "&";

        tiles.push(myDiv);
    }

    // Set initial three tiles in container
    for (let i = 0; i < startingValue; i++) {
        c.appendChild(tiles[i]);
    }
}

// Wait until next animation frame before executing tiles
function handleMouseMove(e) {
    if(animationFrameId !== null) {
      return;
    }
  
    animationFrameId = requestAnimationFrame(() => {
        generateTiles(e);
        animationFrameId = null; // Allow next animation frame
    });
  
//   console.log(animationFrameId);
}

function generateTiles(e) {
    // let fullValue = Math.ceil(map(e.clientY, 0, window.innerHeight, 3, maxTiles));
    let currentValue = Math.ceil(map(e.clientY, minY, maxY, 3, maxTiles))
    let rowValue = map(currentValue, 3, maxTiles, 3, 15);

    updateTiles(currentValue);
    updateFontSize(rowValue);

    startingValue = currentValue;
}

function updateTiles(currentValue) {
    let fragment = document.createDocumentFragment();

    if (startingValue < currentValue) {
        // Add new divs
        for (let i = startingValue; i < currentValue; i++) {
            if (!c.contains(tiles[i])) {
                fragment.appendChild(tiles[i]);
            }
            c.style.alignContent = "flex-start";
        }
        c.appendChild(fragment);
    } else if (startingValue > currentValue) {
        // Remove extra divs
        for (let i = currentValue; i < startingValue; i++) {
            if (c.contains(tiles[i])) {
                c.removeChild(tiles[i]);
            }
        }

        c.style.alignContent = "center";
    }
}

function updateFontSize(rowValue) {
    tiles.forEach(div => {
        if (c.contains(div)) {
            div.style.fontSize = `calc(100vw / ${rowValue})`;
        }
    });
}

function map(value, low1, high1, low2, high2) {
    const mappedValue = low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
    return Math.min(high2, Math.max(low2, mappedValue)); // Clamps to [low2, high2]
}