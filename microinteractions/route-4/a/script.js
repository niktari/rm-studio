function handleViewMore() {
  const viewMore = document.querySelector("#view-more");
  if (!viewMore) {
      console.log("handleViewMore: #view-more not found.");
      return;
  }

  const parentContainer = viewMore.parentElement;
  if (!parentContainer) {
      console.log("handleViewMore: Parent container not found.");
      return;
  }

  console.log("handleViewMore: Initialized. Adding hover effects.");

  // Handles hover effects for specified elements
  function addHoverEffect(selector) {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
          console.log(`addHoverEffect: No elements found for selector '${selector}'.`);
          return;
      }

      console.log(`addHoverEffect: Adding hover effects to ${elements.length} elements matching '${selector}'.`);

      elements.forEach((element) => {
          element.addEventListener("mouseenter", () => {
              console.log(`Mouse entered ${selector}`);
              Object.assign(viewMore.style, {
                  transform: "translate(-50%, -100%) scale(1)",
                  opacity: "1"
              });
              element.style.cursor = "pointer";
          });

          element.addEventListener("mousemove", (e) => {
              const { left, top } = parentContainer.getBoundingClientRect();
              Object.assign(viewMore.style, {
                  left: `${e.clientX - left}px`,
                  top: `${e.clientY - top}px`
              });
              console.log(`Mouse moved over ${selector}: x=${e.clientX - left}, y=${e.clientY - top}`);
          });

          element.addEventListener("mouseleave", () => {
              console.log(`Mouse left ${selector}`);
              Object.assign(viewMore.style, {
                  transform: "translate(-50%, -100%) scale(0.5)",
                  opacity: "0"
              });
              element.style.cursor = "default";
          });
      });
  }

  addHoverEffect(".project-card"); // Apply to project cards
  addHoverEffect(".thumbnail.linked"); // Apply to linked thumbnails
}

function initializeViewMore() {
  const viewMore = document.querySelector("#view-more");
  if (viewMore) {
      console.log("initializeViewMore: #view-more found. Running handleViewMore().");
      handleViewMore();
  } else {
      console.log("initializeViewMore: #view-more not found.");
  }
}

// Observe DOM changes to reinitialize when necessary
const observer = new MutationObserver(() => {
  console.log("MutationObserver: DOM changed. Checking for #view-more.");
  initializeViewMore();
});

observer.observe(document.body, { childList: true, subtree: true });

console.log("MutationObserver started. Watching for DOM changes...");

// Run on initial load
initializeViewMore();
