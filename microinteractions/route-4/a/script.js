function handleViewMore() {
  const viewMore = document.querySelector("#view-more");
  if (!viewMore || viewMore.dataset.initialized) return;

  viewMore.dataset.initialized = "true";
  const parent = viewMore.parentElement;
  if (!parent) return console.error("Parent container not found.");

  const addHoverEffect = (selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        Object.assign(viewMore.style, {
          transform: "translate(-50%, -100%)",
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
        Object.assign(viewMore.style, {
          transform: "translate(-50%, -100%)",
          opacity: "0",
        });
        el.style.cursor = "default";
      });
    });
  };

  if (!viewMore.dataset.animated) {
    viewMore.dataset.animated = "true";

    const originalText = viewMore.textContent;
    viewMore.innerHTML = "";
  
    let words = originalText.split(' ');
  
    let wordWrapper = '';
  
    wordWrapper = words.map(word => `<span class="word">${word}</span>`).join(`<span>&nbsp;</span>`);
  
    viewMore.innerHTML = wordWrapper;
  
    let wordSpans = document.querySelectorAll(".word");
  
    wordSpans.forEach(wordSpan => {
      let text = wordSpan.innerText;
      let letterWrapper = '';
  
      for(let i = 0; i < text.length; i++) {
        letterWrapper += `<span class="letter">${text.charAt(i)}</span>`
      }
  
      wordSpan.innerHTML = letterWrapper;
  
      let letterSpans = document.querySelectorAll(".letter");
  
      letterSpans.forEach((letterSpan, index) => {
        letterSpan.style.animationDelay = `${index * 0.3}s`;
      })
  
  
    })
    
    // MS Original Code
    // const text = viewMore.textContent.trim();
    // viewMore.innerHTML = "";
    // text.split("").forEach((char, i) => {
    //   let span = document.createElement("span");
    //   span.textContent = char;
    //   span.style.animationDelay = `${i * 0.3}s`;
    //   viewMore.appendChild(span);
    // });
  }

  addHoverEffect(".project-card");
  addHoverEffect(".thumbnail.linked");

  observeParent(parent);
}

function observeParent(parent) {
  if (!parent) return;

  const observer = new MutationObserver(() => {
    console.log(
      "Mutation detected in parent container. Re-initializing #view-more."
    );
    handleViewMore();
  });

  observer.observe(parent, { childList: true });
}

function initialize() {
  console.log("initialize: Running...");
  const viewMore = document.querySelector("#view-more");
  if (viewMore) {
    console.log("initialize: run handleViewMore()");
    handleViewMore();
  } else {
    console.error("initialize: #view-more not found.");
  }
}

initialize();
