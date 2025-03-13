const debugSVH = document.querySelector(".debug-svh");
const debugScaling = document.querySelector(".debug-scaling");
const curDebugScaling = document.querySelector(".cur-debug-scaling");
const lastIndexEl = document.querySelector(".lastIndex");
const indexEl = document.querySelector(".index");

function updateDebug() {
  debugSVH.textContent = `svh: ${window.innerHeight}px`;
  debugScaling.textContent = `scaling: ${window.scaling}`;
  curDebugScaling.textContent = `cur-scaling: ${window.curScaling}`;
  indexEl.textContent = `cur-index: ${index}`;
  lastIndexEl.textContent = `last-index: ${lastIndex}`;
}

updateDebug();
window.addEventListener("resize", updateDebug);

document.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.lenght > 1) {
      e.preventDefault();
    }
  },
  {
    passive: false,
  },
);
