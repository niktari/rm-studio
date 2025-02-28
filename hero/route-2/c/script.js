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
});

function updateFontSize() {
  const containerHeight = window.innerHeight;
  const textHeight = hiddenTextEl.scrollHeight;
  const containerWidth = window.innerWidth;
  const textWidth = hiddenTextEl.scrollWidth;

  const scaleFactor = Math.min(containerHeight / textHeight, containerWidth / textWidth);
  hiddenTextEl.style.transform = `scale(${scaleFactor.toFixed(2)})`;
}

document.addEventListener("mouseover", function(){
  const currentText = fullTextArrayStyles[index];
  const { content, style } = currentText;
  console.log(content);
})

// CURSOR
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

(function() {
  const classes = document.body.classList;
  let timer = 0;
  window.addEventListener('resize', function () {
      if (timer) {
          clearTimeout(timer);
          timer = null;
      }
      else
          classes.add('stop-transitions');

      timer = setTimeout(() => {
          classes.remove('stop-transitions');
          timer = null;
      }, 100);
  });
})();