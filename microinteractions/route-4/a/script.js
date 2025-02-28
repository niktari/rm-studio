const customCursor = document.querySelector("#custom-cursor");
const selectDivClass = document.querySelectorAll(".project-card");
let timeout;

function animateText() {
  const originalText = customCursor.innerHTML.trim();
  customCursor.innerHTML = "";

  originalText.split("").forEach((char, index) => {
    let span = document.createElement("span");
    span.textContent = char;
    customCursor.appendChild(span);

    span.style.animationDelay = `${index * 0.3}s`;
  });
}

animateText();

// Show cursor only on hover of viewmore elements
selectDivClass.forEach(el => {
  el.addEventListener('mouseenter', () => {
    customCursor.style.transform = "translate(-50%, -50%) scale(1)";
    customCursor.style.opacity = "1";
    el.style.cursor = "pointer";
  });

  el.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  });

  el.addEventListener('mouseleave', () => {
    customCursor.style.transform = "translate(-50%, -50%) scale(0.5)";
    customCursor.style.opacity = "0";
    el.style.cursor = "default";
  });
});