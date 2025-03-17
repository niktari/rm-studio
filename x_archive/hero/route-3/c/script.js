let c = document.getElementById("container");

// Calculate amount of rows so that it always fills the viewport height
const oneTile = window.innerWidth / 15;
const totalArea = (window.innerHeight / oneTile) * 15;
const maxTiles = Math.floor(totalArea / 15) * 15;

let startingValue = 3;
const tiles = [];
const newTiles = [];

const minY = window.innerHeight / 6;
const maxY = window.innerHeight - window.innerHeight / 6;

const typefaces = ["RM-Blackletter-Mono", "RM-Sans-Mono"];

let letterInterval = null;

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
  let currentValue = Math.ceil(map(e.clientY, minY, maxY, 3, maxTiles));
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

  // Stop animation when only 3 tiles are present
  // This avoids adding more than one letter to each div
  if (currentValue === 3 && letterInterval !== null) {
    clearInterval(letterInterval);
    letterInterval = null;

    tiles.forEach((tile) => {
      tile.style.color = "#000000";
    });
  } else if (currentValue > 3 && letterInterval === null) {
    // Restart interval if tiles increase again
    cycleLetters();

    tiles.forEach((tile) => {
      tile.style.color = "#09D386";
    });
  }
}

function updateFontSize(rowValue) {
  tiles.forEach((div) => {
    if (c.contains(div)) {
      div.style.fontSize = `calc(100vw / ${rowValue})`;
    }
  });
}

function cycleLetters() {
  if (letterInterval !== null) {
    return;
  }

  letterInterval = setInterval(() => {
    let randomIndices = getRandomIndices(
      tiles.length,
      Math.floor(Math.random() * tiles.length),
    );
    let paraElems = [];

    randomIndices.forEach((randomIndex) => {
      let paraElem = document.createElement("p");
      paraElem.textContent = tiles[randomIndex].textContent;
      paraElem.classList.add("new-letter");
      // tiles[randomIndex].style.color = "#09D386";
      tiles[randomIndex].appendChild(paraElem);
      paraElems.push({ elem: paraElem, parent: tiles[randomIndex] }); // Store reference
    });

    setTimeout(() => {
      paraElems.forEach(({ elem, parent }) => {
        if (parent.contains(elem)) {
          parent.removeChild(elem);
        }

        // parent.style.color = "#000000";
      });
    }, 1000);
  }, 2000);
}

function map(value, low1, high1, low2, high2) {
  const mappedValue = low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  return Math.min(high2, Math.max(low2, mappedValue)); // Clamps to [low2, high2]
}

// Fisher-Yates shuffle
function getRandomIndices(arrayLength, numIndices) {
  if (numIndices > arrayLength) {
    throw new Error("numIndices cannot be larger than the array length");
  }

  let indices = Array.from({ length: arrayLength }, (_, i) => i); // Create array [0, 1, 2, ...]

  for (let i = indices.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[randomIndex]] = [indices[randomIndex], indices[i]]; // Swap elements
  }

  return indices.slice(0, numIndices);
}
