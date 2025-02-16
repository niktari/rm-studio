const textContainer = document.getElementById("container");
const hiddenTextEl = document.getElementById("hiddenText");

// Break full text into an array
const fullTextArray = [
  "is", "the", "Design", "Practice", "of",
  "Ryan Bugden", "&", "Michelle Ando"
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
  "calc(16vw / 3)",
];


let index = 0;

textContainer.addEventListener("click", () => {
  if (index < fullTextArray.length) {
    const font = index%2 === 0 ? "sans" : "blackletter";
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
