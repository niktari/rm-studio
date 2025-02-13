const textContainer = document.getElementById("container");
const hiddenTextEl = document.getElementById("hiddenText");

// Break full text into an array
const fullTextArray = [
  "is", "the", "Design", "Practice", "of",
  "Ryan Bugden", "&", "Michelle Ando"
];

const fontSizeArr = [
  "calc(150vw / 3)", "calc(95vw / 3)", "calc(78vw / 3)",
  "calc(55vw / 3)", "calc(48vw / 3)", "calc(45vw / 3)",
  "calc(40vw / 3)", "calc(38vw / 3)","calc(35vw / 3)",
]

let index = 0;

textContainer.addEventListener("click", () => {
  if (index < fullTextArray.length) {
    hiddenTextEl.innerHTML += " " + fullTextArray[index];
    index++;
    updateFontSize();
  } else{
    index = 0;
    hiddenTextEl.innerHTML = "";
    updateFontSize();
  }
});

function updateFontSize() {
  textContainer.style.fontSize = fontSizeArr[index];
}
