const letters = [
  "R",
  "&",
  "M",
  " ",
  "i",
  "s",
  " ",
  "t",
  "h",
  "e",
  " ",
  "D",
  "e",
  "s",
  "i",
  "g",
  "n",
  " ",
  "P",
  "r",
  "a",
  "c",
  "t",
  "i",
  "c",
  "e",
  " ",
  "o",
  "f",
  " ",
  "R",
  "y",
  "a",
  "n",
  " ",
  "B",
  "u",
  "g",
  "d",
  "e",
  "n",
  " ",
  "&",
  " ",
  "M",
  "i",
  "c",
  "h",
  "e",
  "l",
  "l",
  "e",
  " ",
  "A",
  "n",
  "d",
  "o",
];

const typefaces = ["RM-Blackletter-Mono", "RM-Sans-Mono"];

const containers = document.querySelectorAll(".letters-container");
const transformAmounts = [];

const frequency = 50;
const amplitude = 20;

const staticText = document.getElementById("static-text");
const staticTextInfo = staticText.getBoundingClientRect();
const staticTextHeight = staticTextInfo.height;

const maxDivs = Math.floor(window.innerHeight / staticTextHeight);

staticText.style.display = "none";

generateDivs();
document.addEventListener("mousemove", translateDivs);

function generateDivs() {
  for (let i = 0; i < maxDivs; i++) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("letter");

    const chosenText = letters.slice(
      0,
      Math.sin(-i * frequency) * amplitude + letters.length,
    );
    const showText = chosenText.join("");
    divContainer.innerHTML = showText;

    const mapTransition = map(chosenText.length, 0, letters.length, 25, 10);
    divContainer.style.transition = `${Math.abs(mapTransition * 100 + 100)}ms ease-in-out`;
    divContainer.style.animationDelay = `${Math.abs(mapTransition * 100 + 100)}ms`;

    if (i % 2) {
      divContainer.style.fontFamily = typefaces[0];
    } else {
      divContainer.style.fontFamily = typefaces[1];
    }

    const transformAmount = Math.sin(i * frequency) * amplitude;
    transformAmounts.push(transformAmount);

    divContainer.style.transform = `translateX(${transformAmount}vw)`;
    const secondDivContainer = divContainer.cloneNode(true);

    const firstFragment = document.createDocumentFragment();
    const secondFragment = document.createDocumentFragment();

    firstFragment.appendChild(divContainer);
    secondFragment.appendChild(secondDivContainer);

    containers[0].appendChild(firstFragment);
    containers[1].appendChild(secondFragment);
  }
}

const firstDivLetters = document.querySelectorAll(
  ".letters-container.first div",
);
const secondDivLetters = document.querySelectorAll(
  ".letters-container.second div",
);

console.log(firstDivLetters.length, transformAmounts.length);

function translateDivs(e) {
  firstDivLetters.forEach((letter, index) => {
    let mappedTranslateX = map(
      e.clientY,
      0,
      window.innerHeight,
      transformAmounts[index],
      transformAmounts[index] * -1,
    );
    transformAmounts[firstDivLetters.length - 1] = 18.5595;
    letter.style.transform = `translateX(${mappedTranslateX}vw)`;
  });

  secondDivLetters.forEach((letter, index) => {
    transformAmounts[0] = 5.2475;
    let mappedTranslateX = map(
      e.clientY,
      0,
      window.innerHeight,
      transformAmounts[index],
      transformAmounts[index] * -1,
    );
    letter.style.transform = `translateX(${mappedTranslateX}vw)`;
  });
}

function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}
