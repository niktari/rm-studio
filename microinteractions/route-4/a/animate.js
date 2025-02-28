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
