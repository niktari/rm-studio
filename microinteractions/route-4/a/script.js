if (!window.viewMore) {
  const viewMore = document.querySelector("#view-more");
  window.viewMore = viewMore;
}
const parentContainer = document.querySelector("#view-more").parentElement;

// Function to animate the text inside the viewMore button
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

// General function to handle hover effect for any class
function handleHoverEffect(selectors) {
  const elements = document.querySelectorAll(selectors);

  elements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      viewMore.style.transform = "translate(-50%, -100%) scale(1)";
      viewMore.style.opacity = "1";
      el.style.cursor = "pointer";
    });

    el.addEventListener("mousemove", (e) => {
      const rect = parentContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      viewMore.style.left = `${x}px`;
      viewMore.style.top = `${y}px`;
    });

    el.addEventListener("mouseleave", () => {
      viewMore.style.transform = "translate(-50%, -100%) scale(0.5)";
      viewMore.style.opacity = "0";
      el.style.cursor = "default";
    });
  });
}

handleHoverEffect(".project-card"); // For project cards
handleHoverEffect(".thumbnail.linked");
