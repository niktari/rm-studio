const viewMore = document.querySelector("#view-more");
let timeout;

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

  elements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      viewMore.style.transform = "translate(-50%, -50%) scale(1)";
      viewMore.style.opacity = "1";
      el.style.cursor = "pointer";
    });

    el.addEventListener('mousemove', (e) => {
      viewMore.style.left = `${e.pageX}px`;
      viewMore.style.top = `${e.pageY}px`;
    });

    el.addEventListener('mouseleave', () => {
      viewMore.style.transform = "translate(-50%, -50%) scale(0.5)";
      viewMore.style.opacity = "0";
      el.style.cursor = "default";
    });
  });
}

handleHoverEffect('.project-card'); // For project cards
handleHoverEffect('.thumbnail.linked');
