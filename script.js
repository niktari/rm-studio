const textContainer = document.getElementById("container");
const hiddenTextEl = document.getElementById("hiddenText");
let hiddenTextElements = document.querySelectorAll("#hiddenText div");

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
let lastIndex = -1;
const totalLines = fullTextArrayStyles.length + 1;

let viewportHeight = textContainer.clientHeight;
let viewportWidth = textContainer.clientWidth;

let containerProps = hiddenTextEl.getBoundingClientRect();
let containerHeight = containerProps.height;

function initStyles() {
  let minFontSize = Math.min(
    viewportHeight / (1.1 * totalLines),
    viewportWidth / (totalLines * 2),
  );

  hiddenTextEl.style.fontSize = `${minFontSize}px`; // Use px instead of vw for better precision
}

window.addEventListener("load", () => {
  initStyles();
  updateFontSize();
});

function updateSketch() {
  // Avoid adding multiple event listeners
  textContainer.removeEventListener("click", updateContent);
  textContainer.addEventListener("click", updateContent);
}

// Debounce resize event to improve performance during resizing
function debounceResize() {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    viewportHeight = textContainer.clientHeight;
    viewportWidth = textContainer.clientWidth;
    updateFontSize();
  }, 100);
}

window.addEventListener("resize", debounceResize);
updateSketch();

function updateContent() {
  if (index < fullTextArrayStyles.length) {
    showCursor = false;
    mobileCursor.style.opacity = "0";
    const { content, style } = fullTextArrayStyles[index];
    const newContent = document.createElement("div");
    const firstElement = document.querySelector("#hiddenText div");
    firstElement.classList.remove("no-lineheight");

    newContent.className = style;
    newContent.textContent = content;
    hiddenTextEl.appendChild(newContent);

    hiddenTextEl.classList.remove("onlyRandM");
    textContainer.classList.remove("onlyRandM--container");

    index++;
  } else {
    showCursor = true;
    mobileCursor.style.opacity = "1";
    index = 0;
    hiddenTextEl.innerHTML = '<div class="blackletter no-lineheight">R&M</div>';
    hiddenTextEl.classList.add("onlyRandM");
    textContainer.classList.add("onlyRandM--container");

    // Reset scaling factor
    hiddenTextEl.style.setProperty("--scalingFactor", 35);
    // hiddenTextEl.style.transform = "scale(1)";
  }

  handleCursor();
  updateFontSize();
}

// Debounce function: Limits the rate at which a function is called
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Debounced version of updateFontSize
const debouncedUpdateFontSize = debounce(updateFontSize, 100);

function updateFontSize() {
  viewportHeight = textContainer.clientHeight;
  viewportWidth = textContainer.clientWidth;

  let contentHeight = hiddenTextEl.scrollHeight;
  let contentWidth = hiddenTextEl.scrollWidth;

  let scalingFactor = Math.min(
    viewportHeight / contentHeight,
    viewportWidth / contentWidth,
  );

  let currentScalingFactor = parseFloat(
    hiddenTextEl.style.getPropertyValue("--scalingFactor"),
  );

  if (viewportWidth <= 480) {
    let minAdjustment;

    if (index >= 1 && index <= 2) {
      minAdjustment = 0.3;
    } else if (index === 5) {
      minAdjustment = 0.05;
    } else if(index > 5 && index < 30) {
      minAdjustment = 0.01;
    } else {
      minAdjustment = 0;
    }

    if (index === 0) {
      updateScaling(scalingFactor);
      lastIndex = index;
    } else if (lastIndex !== index) {
      const newScalingFactor = currentScalingFactor - minAdjustment;
      if (newScalingFactor <= scalingFactor) {
        scalingFactor = newScalingFactor;
      }
      lastIndex = index;
      // updateDebug();
      updateScaling(scalingFactor);
    }
  } else if (scalingFactor !== currentScalingFactor) {
    updateScaling(scalingFactor);
  }
}

function updateScaling(scalingFactor) {
  hiddenTextEl.style.setProperty("--scalingFactor", scalingFactor);
  hiddenTextEl.style.transform = `scale(${scalingFactor})`;
}

window.addEventListener("scroll", debounce(updateFontSize, 50), {
  passive: true,
});

// Observe changes in iframe size
// const resizeObserver = new ResizeObserver(debouncedUpdateFontSize);
// resizeObserver.observe(document.documentElement);

// CURSOR
const cursor = document.querySelector(".custom-cursor");
const mobileCursor = document.querySelector(".mobile-cursor");
let timeout;

function initCursor() {
  document.onmousemove = function (e) {
    const { width, height } = cursor.getBoundingClientRect();

    let containerWidth = textContainer.offsetWidth;
    let containerHeight = textContainer.offsetHeight;

    let offset = convertRemToPixels(1);

    let mappedLeft = map(
      e.clientX,
      0,
      containerWidth,
      (width / 2) + offset,
      containerWidth - offset - (width / 2)
    );
    
    let mappedTop = map(
      e.clientY,
      0,
      containerHeight,
      (height / 2) + offset,
      containerHeight - offset - (height / 2),
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

function animateText(el) {
  const originalText = el.textContent;
  el.innerHTML = "";
  const words = originalText.split(" ");
  let wordWrapper = "";

  wordWrapper = words
    .map((word) => `<span class="word">${word}</span>`)
    .join(`<span>&nbsp;</span>`);

  el.innerHTML = wordWrapper;

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

animateText(cursor);
animateText(mobileCursor);

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
  // return Math.min(high2, Math.max(low2, mappedValue)); // Clamps to [low2, high2]
}

function convertRemToPixels(rem) {    
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}