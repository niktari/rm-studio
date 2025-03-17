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

function wrapTextInSpans() {
  let textSpan = document.querySelectorAll(".effect--span");

  textSpan.forEach((span, index) => {
    span.onmouseover = function () {
      span.style.transform = `translate(${Math.cos(index * 2) * 0.1}px, ${Math.cos(index * 0.1) * 2}px)`;

      if (span.classList.contains("sans-mono")) {
        span.classList.remove("sans-mono");
      } else {
        span.classList.add("sans-mono");
      }

      setTimeout(() => {
        span.style.transform = `translate(0, 0)`;
      }, 1000);
    };
  });
}

wrapTextInSpans();

function random(min, max) {
  return Math.random() * (max - min) + min;
}
