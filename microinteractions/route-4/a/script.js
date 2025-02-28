const cursor = document.querySelector("#custom-cursor");
const selectDivClass = document.querySelectorAll(".project-card");
let timeout;

function animateText() {
  const originalText = cursor.innerHTML.trim();
  cursor.innerHTML = "";

  originalText.split("").forEach((char, index) => {
    let span = document.createElement("span");
    span.textContent = char;
    cursor.appendChild(span);

    span.style.animationDelay = `${index * 0.3}s`;
  });
}

animateText();

// Show cursor only on hover of viewmore elements
selectDivClass.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.opacity = "1";
    el.style.cursor = "pointer";
  });

  el.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  el.addEventListener('mouseleave', () => {
    cursor.style.transform = "translate(-50%, -50%) scale(0.5)";
    cursor.style.opacity = "0";
    el.style.cursor = "default";
  });
});