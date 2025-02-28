function handleViewMore() {
  const viewMore = document.querySelector("#view-more");
  if (!viewMore) {
    console.error("handleViewMore: #view-more not found.");
    return;
  }

  const parentContainer = viewMore.parentElement;
  if (!parentContainer) {
    console.error("handleViewMore: Parent container not found.");
    return;
  }

  function addHoverEffect(selector) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      console.error(
        `addHoverEffect: No elements found for selector '${selector}'.`
      );
      return;
    }

    elements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        Object.assign(viewMore.style, {
          transform: "translate(-50%, -100%) scale(1)",
          opacity: "1",
        });
        element.style.cursor = "pointer";
      });

      element.addEventListener("mousemove", (e) => {
        const { left, top } = parentContainer.getBoundingClientRect();
        Object.assign(viewMore.style, {
          left: `${e.clientX - left}px`,
          top: `${e.clientY - top}px`,
        });
      });

      element.addEventListener("mouseleave", () => {
        Object.assign(viewMore.style, {
          transform: "translate(-50%, -100%) scale(0.5)",
          opacity: "0",
        });
        element.style.cursor = "default";
      });
    });
  }

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
  addHoverEffect(".project-card");
}

function initializeViewMore() {
  const viewMore = document.querySelector("#view-more");
  if (viewMore) {
    handleViewMore();
  } else {
    console.error("initializeViewMore: #view-more not found.");
  }
}

// Observe DOM changes to reinitialize when necessary
const observer = new MutationObserver(() => {
  console.log("MutationObserver: DOM changed. Checking for #view-more.");
  initializeViewMore();
});

observer.observe(document.body, { childList: true, subtree: true });

initializeViewMore();
