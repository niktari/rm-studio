const c = document.getElementById("container");

// Calculate amount of rows so that it always fills the viewport height
const oneTile = window.innerWidth / 15;
const totalArea = (window.innerHeight / oneTile) * 15;
const maxTiles = Math.floor(totalArea / 15) * 15;

const minY = window.innerHeight / 6;
const maxY = window.innerHeight - window.innerHeight / 6;

let startingValue = 3;
const tiles = [];

const typefaces = ["RM-Blackletter-Mono", "RM-Sans-Mono"];
let fontInterval = null;

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
// This is a performance thing
function handleMouseMove(e) {
  if (animationFrameId !== null) {
    return;
  }

  animationFrameId = requestAnimationFrame(() => {
    generateTiles(e);
    animationFrameId = null; // Allow next animation frame
  });
}

function generateTiles(e) {
  // let fullValue = Math.ceil(map(e.clientY, 0, window.innerHeight, 3, maxTiles));
  let currentValue = Math.ceil(map(e.clientY, minY, maxY, 3, maxTiles));
  let rowValue = map(currentValue, 3, maxTiles, 3, 15);

  updateTiles(currentValue);
  updateFontSize(rowValue);

  // Stop animation when only 3 tiles are present
  // This avoids adding more than one letter to each div
  if (currentValue === 3 && fontInterval !== null) {
    clearInterval(fontInterval);
    fontInterval = null;

    // Turn the original three letters to Blackletter
    tiles.forEach((div) => {
      div.style.fontFamily = typefaces[0];
    });
  } else if (currentValue > 3 && fontInterval === null) {
    startFontCycle(); // Restart interval if tiles increase again
  }

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
    }
    c.appendChild(fragment);
  } else if (startingValue > currentValue) {
    // Remove extra divs
    for (let i = currentValue; i < startingValue; i++) {
      if (c.contains(tiles[i])) {
        c.removeChild(tiles[i]);
      }
    }
  }
}

function startFontCycle() {
  // This prevents multiple intervals, resets the interval
  if (fontInterval !== null) {
    return;
  }

  fontInterval = setInterval(() => {
    tiles.forEach((div) => {
      if (c.contains(div)) {
        const randomFont = Math.floor(Math.random() * typefaces.length);
        div.style.fontFamily = typefaces[randomFont];
      }
    });
  }, 1000);
}

function updateFontSize(rowValue) {
  tiles.forEach((div) => {
    if (c.contains(div)) {
      div.style.fontSize = `calc(100vw / ${rowValue})`;
    }
  });
}

function map(value, low1, high1, low2, high2) {
  const mappedValue = low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  return Math.min(high2, Math.max(low2, mappedValue)); // Clamps to [low2, high2]
}
