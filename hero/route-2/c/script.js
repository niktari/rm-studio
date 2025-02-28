const textContainer = document.getElementById("container");
const hiddenTextEl = document.getElementById("hiddenText");

// Break full text into an array
const fullTextArray = [
  "is",
  "the",
  "Design",
  "Practice",
  "of",
  "Ryan Bugden",
  "&",
  "Michelle Ando",
];

const fontSizeArr = [
  "calc(150vw / 3)",
  "calc(80vw / 3)",
  "calc(55vw / 3)",
  "calc(40vw / 3)",
  "calc(30vw / 3)",
  "calc(25vw / 3)",
  "calc(20vw / 3)",
  "calc(18vw / 3)",
  "calc(15vw / 3)",
];

let index = 0;

textContainer.addEventListener("click", () => {
  if (index < fullTextArray.length) {
    const font = index % 2 === 0 ? "sans" : "blackletter";
    hiddenTextEl.innerHTML += `<span class="${font}">${fullTextArray[index]}</span>`;
    index++;
    updateFontSize();
  } else {
    index = 0;
    hiddenTextEl.innerHTML = "";
    updateFontSize();
  }
});

function updateFontSize() {
  textContainer.style.fontSize = fontSizeArr[index];
}

const cursor = document.querySelector(".custom-cursor");
let timeout;

function animateText() {
  const originalText = cursor.innerHTML.trim();
  console.log(originalText);
  cursor.innerHTML = "";

  originalText.split("").forEach((char, index) => {
    let span = document.createElement("span");
    span.textContent = char;
    cursor.appendChild(span);

    span.style.animationDelay = `${index * 0.3}s`;
  });
}

animateText();

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
  cursor.style.transform = "translate(-50%, -50%) scale(1)";
  cursor.style.opacity = "1";

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    disppearCursor();
  }, 10000);
});

document.addEventListener("mousedown", () => {
  disppearCursor();
});

disppearCursor();

function disppearCursor() {
  cursor.style.transform = "translate(-50%, -50%) scale(0.5)";
  cursor.style.opacity = "0";
}
