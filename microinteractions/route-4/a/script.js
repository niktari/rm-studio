function handleViewMore() {
  console.log("handleViewMore: Function called.");

  const viewMore = document.querySelector("#view-more");
  if (!viewMore) {
    console.error("handleViewMore: #view-more element not found.");
    return;
  }

  if (viewMore.dataset.initialized) {
    console.log("handleViewMore: #view-more already initialized. Skipping.");
    return;
  }

  viewMore.dataset.initialized = "true";
  console.log("handleViewMore: #view-more initialized.");

  const parent = viewMore.parentElement;
  if (!parent) {
    console.error("handleViewMore: Parent container not found.");
    return;
  }
  console.log("handleViewMore: Parent container found:", parent);

  const addHoverEffect = (selector) => {
    console.log(`handleViewMore: Adding hover effect for ${selector}`);

    const elements = document.querySelectorAll(selector);
    if (!elements.length) {
      console.warn(`handleViewMore: No elements found for selector '${selector}'`);
      return;
    }

    elements.forEach((el) => {
      console.log(`handleViewMore: Attaching hover events to`, el);

      el.addEventListener("mouseenter", () => {
        console.log(`handleViewMore: Mouse entered ${selector}`);
        Object.assign(viewMore.style, {
          transform: "translate(-50%, -100%) scale(1)",
          opacity: "1",
        });
        el.style.cursor = "pointer";
      });

      el.addEventListener("mousemove", (e) => {
        const { left, top } = parent.getBoundingClientRect();
        Object.assign(viewMore.style, {
          left: `${e.clientX - left}px`,
          top: `${e.clientY - top}px`,
        });
      });

      el.addEventListener("mouseleave", () => {
        console.log(`handleViewMore: Mouse leave ${selector}`);
        Object.assign(viewMore.style, {
          transform: "translate(-50%, -100%) scale(0.5)",
          opacity: "0",
        });
        el.style.cursor = "default";
      });
    });
  };

  if (!viewMore.dataset.animated) {
    viewMore.dataset.animated = "true";
    console.log("handleViewMore: Animating text for #view-more");

    const text = viewMore.textContent.trim();
    viewMore.innerHTML = "";

    text.split("").forEach((char, i) => {
      let span = document.createElement("span");
      span.textContent = char;
      span.style.animationDelay = `${i * 0.3}s`;
      viewMore.appendChild(span);
    });

    console.log("handleViewMore: Text animation applied.");
  }

  addHoverEffect(".project-card");
  addHoverEffect(".thumbnail.linked");

  observeParent(parent);
}

function observeParent(parent) {
  if (!parent) {
    console.error("observeParent: No parent container found.");
    return;
  }

  console.log("observeParent: Observing parent container for mutations.");

  const observer = new MutationObserver(() => {
    console.warn("observeParent: Mutation detected. Re-initializing #view-more.");
    handleViewMore();
  });

  observer.observe(parent, { childList: true });
}

function initialize() {
  console.log("initialize: Running initialization...");

  const viewMore = document.querySelector("#view-more");
  if (viewMore) {
    console.log("initialize: Found #view-more. Running handleViewMore().");
    handleViewMore();
  } else {
    console.error("initialize: #view-more not found.");
  }
}

// Initial run
initialize();

// Attach to Cargo’s SPA event
document.addEventListener("afterPageLoad", () => {
  console.log("afterPageLoad: Cargo page updated. Re-initializing...");
  initialize();
});
