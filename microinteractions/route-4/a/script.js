const viewMore = document.querySelector("#view-more");
const selectDivClass = document.querySelectorAll(".project-card");
let timeout;

function animateText() {
  const originalText = viewMore.innerHTML.trim();
  viewMore.innerHTML = "";

  originalText.split("").forEach((char, index) => {
    let span = document.createElement("span");
    span.textContent = char;
    viewMore.appendChild(span);

    span.style.animationDelay = `${index * 0.3}s`;
  });
}

animateText();

// Show cursor only on hover of viewmore elements
selectDivClass.forEach(el => {
  el.addEventListener('mouseenter', () => {
    viewMore.style.transform = "translate(-50%, -50%) scale(1)";
    viewMore.style.opacity = "1";
    el.style.cursor = "pointer";
  });

  el.addEventListener('mousemove', (e) => {
    viewMore.style.left = `${e.clientX}px`;
    viewMore.style.top = `${e.clientY}px`;
  });

  el.addEventListener('mouseleave', () => {
    viewMore.style.transform = "translate(-50%, -50%) scale(0.5)";
    viewMore.style.opacity = "0";
    el.style.cursor = "default";
  });
});