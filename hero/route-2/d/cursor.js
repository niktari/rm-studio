const cursor = document.querySelector(".custom-cursor");
const textContainer = document.querySelector("#container");
let showCursor = true;
let timeout;

function initCursor() {
  document.onmousemove = function (e) {
    const { width, height } = cursor.getBoundingClientRect();

    let mappedLeft = map(
      e.clientX,
      0,
      window.innerWidth,
      width / 2,
      window.innerWidth - width / 2,
    );
    let mappedTop = map(
      e.clientY,
      0,
      window.innerHeight,
      height / 2,
      window.innerHeight - height / 2,
    );

    cursor.style.opacity = "1";
    textContainer.style.cursor = "none";
    cursor.style.left = `${mappedLeft}px`;
    cursor.style.top = `${mappedTop}px`;
    cursor.style.transform = "translate(-50%, -50%)";

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      disppearCursor();
    }, 10000);
  };
}

function animateText() {
  const originalText = cursor.textContent;
  cursor.innerHTML = "";
  const words = originalText.split(" ");
  let wordWrapper = "";

  wordWrapper = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(`<span>&nbsp;</span>`);

  cursor.innerHTML = wordWrapper;

  const wordSpans = document.querySelectorAll(".word");

  wordSpans.forEach((wordSpan) => {
    let text = wordSpan.innerText;
    let letterWrapper = "";

    for (let i = 0; i < text.length; i++) {
      letterWrapper += `<span class="letter">${text.charAt(i)}</span>`;
    }

    wordSpan.innerHTML = letterWrapper;

    let letterSpans = document.querySelectorAll(".letter");

    letterSpans.forEach((letterSpan, index) => {
      letterSpan.style.animationDelay = `${0.3 * index}s`;
    });
  });
}

animateText();

function handleCursor() {
  if (showCursor) {
    initCursor();
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      disppearCursor();
    }, 10000);
  } else {
    disppearCursor();
    textContainer.style.cursor = "pointer";
    document.onmousemove = null;
  }
}

handleCursor();

document.addEventListener("mousedown", () => {
  disppearCursor();
});

document.addEventListener("mouseleave", () => {
  disppearCursor();
});

document.addEventListener("mouseout", () => {
  disppearCursor();
});

disppearCursor();

function disppearCursor() {
  cursor.style.opacity = "0";
}

function map(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}
