gsap.registerPlugin(Flip);

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
let containerProps = hiddenTextEl.getBoundingClientRect();
let { width, height } = containerProps;

const totalLines = fullTextArrayStyles.length;

textContainer.addEventListener("click", () => {
  const state = Flip.getState(".textbox");
  const hiddenTextState = Flip.getState("#hiddenText");

  if (index < fullTextArrayStyles.length) {
    hiddenTextEl.style.top = 0;
    const currentText = fullTextArrayStyles[index];
    const { content, style } = currentText;
    const newBox = document.createElement("span");
    newBox.classList.add("textbox");
    newBox.classList.add(style);
    newBox.textContent = content;
    hiddenTextEl.appendChild(newBox);
    index++;
    updateFontSize();
  } else {
    hiddenTextEl.style.top = `calc(50% - ${height}px / 2)`;
    index = 0;
    hiddenTextEl.innerHTML = '<span class="textbox blackletter">R&M</span>';
    hiddenTextEl.style.fontSize = `calc(100vw / 2)`;
  }

  if (index == 0) {
    showCursor = true;
  } else {
    showCursor = false;
  }

  Flip.from(state, {
    duration: 0.5,
    ease: "power2.out",
    stagger: 0,
  });

  Flip.from(hiddenTextState, {
    duration: 1,
    ease: "power2.out",
    stagger: 0,
  });

  handleCursor();
});

// window.onresize = () => {
//   initStyles();
// };

function updateFontSize() {
  const baseFontSize = 1000;
  const scaledFontSize = baseFontSize / (index + 1);
  hiddenTextEl.style.fontSize = `${scaledFontSize}px`;
}
