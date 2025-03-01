const textContainer = document.getElementById("container");
const hiddenTextEl = document.getElementById("hiddenText");

let textDivs;

let showCursor = true;

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
const cursor = document.querySelector(".custom-cursor");
let timeout;

textContainer.addEventListener("click", () => {
  if (index < fullTextArrayStyles.length) {
    const currentText = fullTextArrayStyles[index];
    const { content, style } = currentText;
    hiddenTextEl.classList.remove("onlyRandM");

    setTimeout(() => {
      hiddenTextEl.classList.remove("no-transition");
    }, 50);

    hiddenTextEl.innerHTML += `<div class="${style}">${content}</div>`;
    index++;
    updateFontSize();
  } else {
    index = 0;
    hiddenTextEl.classList.add("onlyRandM");
    hiddenTextEl.classList.add("no-transition");
    hiddenTextEl.innerHTML = '<div class="blackletter">R&M</div>';
    hiddenTextEl.style.removeProperty("transform");
  }

  if(index == 0) {
    showCursor = true;
  } else {
    showCursor = false;
  }

  handleCursor();

});

function updateFontSize() {
  const containerHeight = window.innerHeight;
  const textHeight = hiddenTextEl.scrollHeight;
  const containerWidth = window.innerWidth;
  const textWidth = hiddenTextEl.scrollWidth;

  const scaleFactor = Math.min(
    containerHeight / textHeight,
    containerWidth / textWidth
  );
  hiddenTextEl.style.transform = `scale(${scaleFactor.toFixed(2)})`;
}


// CURSOR
function initCursor() {

  document.onmousemove = function(e) {

    const { width, height } = cursor.getBoundingClientRect();

    let mappedLeft = map(e.clientX, 0, window.innerWidth, width / 2, window.innerWidth - width / 2);
    let mappedTop = map(e.clientY, 0, window.innerHeight, height / 2, window.innerHeight - height / 2);
    

    cursor.style.opacity = "1";
    textContainer.style.cursor = "none";
    cursor.style.left = `${mappedLeft}px`;
    cursor.style.top = `${mappedTop}px`;
    cursor.style.transform = "translate(-50%, -50%)";

  }
  
}


function animateText() {

  const originalText = cursor.textContent;
  cursor.innerHTML = "";

  let words = originalText.split(' ');

  let wordWrapper = '';

  wordWrapper = words.map(word => `<span class="word">${word}</span>`).join(`<span>&nbsp;</span>`);

  cursor.innerHTML = wordWrapper;

  let wordSpans = document.querySelectorAll(".word");

  wordSpans.forEach(wordSpan => {
    let text = wordSpan.innerText;
    let letterWrapper = '';

    for(let i = 0; i < text.length; i++) {
      letterWrapper += `<span class="letter">${text.charAt(i)}</span>`
    }

    wordSpan.innerHTML = letterWrapper;

    let letterSpans = document.querySelectorAll(".letter");

    letterSpans.forEach((letterSpan, index) => {
      letterSpan.style.animationDelay = `${0.3 * index}s`;
    })

  })

  // MS Original Code
    // const originalText = cursor.innerHTML.trim();
  // originalText.split("").forEach((char, index) => {
  //   let span = document.createElement("span");
  //   span.textContent = char;

  //   cursor.appendChild(span);

  //   span.style.animationDelay = `${index * 0.3}s`;
  // });
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


// document.addEventListener("mousedown", () => {
//   disppearCursor();
// });

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

(function() {
  const classes = document.body.classList;
  let timer = 0;
  window.addEventListener("resize", function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    } else classes.add("stop-transitions");

    timer = setTimeout(() => {
      classes.remove("stop-transitions");
      timer = null;
    }, 100);
  });
})();





function map(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}