function wrapWordsInDivs() {
  const allText = document.getElementById("effect");
  const content = allText.textContent;
  const words = content.split(" ");

  const wordsWrapped = words
    .map((word) => `<div class="effect--div">${word}</div>`)
    .join(" ");

  allText.innerHTML = wordsWrapped;
}

wrapWordsInDivs();

let wordsDiv = document.querySelectorAll(".effect--div");

let lettersWrapped;
let letters;

function setWordText() {
  wordsDiv.forEach((word) => {
    const wordContent = word.textContent;
    const letters = wordContent.split("");

    lettersWrapped = letters
      .map((letter) => `<span class="effect--span">${letter}</span>`)
      .join("");

    word.innerHTML = lettersWrapped;
  });
}

setWordText();

function setFonts(parentIndex) {
  let allChildren = wordsDiv[parentIndex].children;
  for (let child of allChildren) {
    child.classList.add("sans-mono");
  }
}

setFonts(1);
setFonts(2);
setFonts(5);
setFonts(6);
setFonts(7);
setFonts(8);

let textSpan = document.querySelectorAll(".effect--span");

function wrapTextInSpans() {
  textSpan.forEach((span, index) => {
    const zoomLetter = document.getElementById("zoom-letter");
    const colors = ["#00bbff", "#ffdd00", "#ff4000", "#0ccd59"];

    span.onmouseover = function () {
      const spanStyles = window.getComputedStyle(span);
      const spanFont = spanStyles.getPropertyValue("font-family");

      console.log(spanFont);
      span.style.transform = `translate(${Math.cos(index * 2) * 0.1}px, ${Math.cos(index * 0.1) * 2}px)`;

      zoomLetter.innerHTML = span.textContent;
      zoomLetter.style.fontFamily = spanFont;
      zoomLetter.style.color =
        colors[Math.floor(Math.random() * colors.length)];

      setTimeout(() => {
        span.style.transform = `translate(0, 0)`;
      }, 1000);
    };

    span.onmouseout = function () {
      zoomLetter.innerHTML = "";
    };
  });
}

wrapTextInSpans();

function random(min, max) {
  return Math.random() * (max - min) + min;
}
