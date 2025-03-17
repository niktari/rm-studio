const textContainer = document.getElementById("container");
const hiddenTextEl = document.getElementById("hiddenText");

const fullTextArrayStyles = [
  { content: "is", style: "sans" },
  { content: "the", style: "blackletter" },
  { content: "design", style: "sans" },
  { content: "practice", style: "sans" },
  { content: "of", style: "sans" },
  { content: "Ryan Bugden", style: "blackletter" },
  { content: "&", style: "blackletter" },
  { content: "Michelle Ando", style: "blackletter" },
  { content: "based", style: "sans" },
  { content: "in", style: "sans" },
  { content: "Bushwick", style: "blackletter" },
  { content: "Brooklyn", style: "blackletter" },
  { content: "New York", style: "sans" },
  { content: "&", style: "blackletter" },
  { content: "specializing", style: "blackletter" },
  { content: "in", style: "sans" },
  { content: "branding", style: "blackletter" },
  { content: "identity systems", style: "sans" },
  { content: "print", style: "blackletter" },
  { content: "packaging", style: "sans" },
  { content: "books", style: "blackletter" },
  { content: "art direction", style: "sans" },
  { content: "&", style: "sans" },
  { content: "typeface design.", style: "blackletter" },
  { content: "Thanks", style: "sans" },
  { content: "for", style: "blackletter" },
  { content: "stopping", style: "sans" },
  { content: "by", style: "blackletter" },
  { content: "&", style: "blackletter" },
  { content: "clicking", style: "sans" },
  { content: "this", style: "blackletter" },
  { content: "many", style: "sans" },
  { content: "times", style: "blackletter" },
  { content: "<3", style: "sans" },
];

let index = 0;
const totalLines = fullTextArrayStyles.length + 1;

let viewportHeight = window.innerHeight;
let viewportWidth = window.innerWidth;

let containerProps = hiddenTextEl.getBoundingClientRect();
let containerHeight = containerProps.height;

function initStyles() {
  let minFontSize = Math.min(
    viewportHeight / (1.1 * totalLines),
    viewportWidth / (totalLines * 2)
  );

  let minFontSizeVW = (minFontSize / viewportWidth) * 100;
  hiddenTextEl.style.fontSize = `${minFontSizeVW}vw`;
}

initStyles();

function updateSketch() {
  // Avoid adding multiple event listeners
  textContainer.removeEventListener("click", updateContent);
  textContainer.addEventListener("click", updateContent);
}

// Debounce resize event to improve performance during resizing
function debounceResize() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    viewportHeight = window.innerHeight;
    viewportWidth = window.innerWidth;
    updateFontSize();
  }, 100);
}

window.addEventListener("resize", debounceResize);
updateSketch();

function updateContent() {
  if (index < fullTextArrayStyles.length) {
    const currentText = fullTextArrayStyles[index];
    const { content, style } = currentText;
    const newContent = document.createElement("div");
    newContent.className = style;
    newContent.textContent = content;
    hiddenTextEl.appendChild(newContent);
    hiddenTextEl.classList.remove("onlyRandM");
    textContainer.classList.remove("onlyRandM--container");
    index++;
  } else {
    index = 0;
    hiddenTextEl.innerHTML = '<div class="blackletter">R&M</div>';
    hiddenTextEl.classList.add("onlyRandM");
    textContainer.classList.add("onlyRandM--container");
  }

  if (index == 0) {
    showCursor = true;
  } else {
    showCursor = false;
  }

  handleCursor();

  updateFontSize();
}

function updateFontSize() {
  viewportHeight = window.innerHeight;
  viewportWidth = window.innerWidth;

  let scalingFactor = Math.min(viewportHeight / hiddenTextEl.scrollHeight, viewportWidth / hiddenTextEl.scrollWidth);
  hiddenTextEl.style.setProperty('--scalingFactor', scalingFactor);
}


// CURSOR
const cursor = document.querySelector(".custom-cursor");
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
