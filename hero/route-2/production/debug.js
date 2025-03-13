const debugSVH = document.querySelector(".debug-svh");
const debugScaling = document.querySelector(".debug-scaling");

function updateDebug() {
  debugSVH.textContent = `svh: ${window.innerHeight}px`;
  debugScaling.textContent = `scaling: ${window.scaling}`;
}

updateDebug();
window.addEventListener("resize", updateDebug);
