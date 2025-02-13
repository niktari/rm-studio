let imgH;
let letterPixels = [];
let curPixels = [];
let finalPixels = [];
let gridSize = 10;
let circleScaler = 1;
let flag;
let speed;

function preload() {
  imgH = loadImage("../../../assets/imgs/letters-horizontal.jpg");
}

function setup() {
  cnv = createCanvas(windowWidth, windowWidth * (imgH.height / imgH.width));
  cnv.parent("p5-sketch");
  fill(0);
  noStroke();
  generatePixels(imgH, letterPixels);
  curPixels = deepCopy(letterPixels);
  finalPixels = deepCopy(letterPixels);

  cnv.mouseOver(changeFlag);
  cnv.mouseOut(changeFlag);
}

function draw() {
  circleScaler = map(width, 0, 2560, 0.15, 2.5);
  speed = map(mouseX, 0, width, 51, 1);
  clear();
  for (let y = 0; y < letterPixels.length; y++) {
    for (let x = 0; x < letterPixels[y].length; x++) {
      const mappedGridSize = height / letterPixels.length;
      if (finalPixels[y][x] >= 0.1 && flag) {
        finalPixels[y][x] =
          letterPixels[y][x] +
          sin(frameCount / speed + x * 0.1 + y * 0.2) * 100 +
          random(-0.1, 0.1);
      } else {
        finalPixels[y][x] = letterPixels[y][x];
      }
      curPixels[y][x] = lerp(curPixels[y][x], finalPixels[y][x], 0.05);
      circle(
        x * mappedGridSize,
        y * mappedGridSize,
        curPixels[y][x] * circleScaler
      );
    }
  }
}

function changeFlag() {
  flag = !flag;
}

function deepCopy(arr) {
  return JSON.parse(JSON.stringify(arr));
}

function generatePixels(myImg, arr) {
  myImg.loadPixels();
  let row = 0;
  for (let y = 0; y < myImg.height; y += gridSize) {
    arr[row] = [];
    let col = 0;
    for (let x = 0; x < myImg.width; x += gridSize) {
      const index = (x + y * myImg.width) * 4;
      const r = myImg.pixels[index];
      const g = myImg.pixels[index + 1];
      const b = myImg.pixels[index + 2];
      const brightnessVal = (r + g + b) / 3;
      const mappedBrightnessVal = constrain(
        map(brightnessVal, 0, 255, 0, 265),
        0,
        255
      );
      const radius = map(mappedBrightnessVal, 255, 0, 0, 10);
      arr[row][col] = radius;
      col++;
    }
    row++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth * (imgH.height / imgH.width));
}

// const createSketch = (containerId) => {
//   return (p) => {
//     const breakpoint = 600;
//     let canvasScaler;
//     let letterScaler;
//     let graphics;
//     let imgH;
//     let pixelLetters = [];
//     let gridSize = 5;
//     let gridNum = 50;
//     let curPixel = [];

//     p.preload = () => {
//       imgH = p.loadImage("../../../assets/imgs/letters-horizontal.jpg");
//     };

//     p.setup = () => {
//       const cnv = p.createCanvas(
//         p.windowWidth,
//         p.windowWidth * (imgH.height / imgH.width)
//       );
//       cnv.parent(containerId);
//       calculateGrid();
//       p.noStroke();
//       p.fill(0);
//     };

//     function calculateGrid() {
//       gridSize = parseInt(p.height / gridNum);
//       pixelLetters = [];
//       generatePixelArray(imgH, pixelLetters);
//       curPixel = deepCopy(pixelLetters);
//       finalPixel = deepCopy(pixelLetters);
//     }

//     function deepCopy(arr) {
//       return JSON.parse(JSON.stringify(arr));
//     }

//     function generatePixelArray(myImg, arr) {
//       myImg.loadPixels();
//       let row = 0;
//       for (let y = 0; y <= myImg.height; y += gridSize) {
//         arr[row] = [];
//         let col = 0;
//         for (let x = 0; x <= myImg.width; x += gridSize) {
//           const index = (x + y * myImg.width) * 4;
//           const r = myImg.pixels[index];
//           const g = myImg.pixels[index + 1];
//           const b = myImg.pixels[index + 2];
//           const brightnessVal = (r + g + b) / 3;
//           const mappedBrightnessVal = p.constrain(
//             p.map(brightnessVal, 0, 255, 0, 265),
//             0,
//             255
//           );
//           const radius = p.map(mappedBrightnessVal, 255, 0, 0, 10);
//           arr[row][col] = radius;
//           col++;
//         }
//         row++;
//       }
//     }

//     p.draw = () => {
//       drawGrid();
//     };

//     function drawGrid() {
//       // gridNum = parseInt(p.map(p.mouseX, 0, p.width, 50, 200));
//       calculateGrid();

//       p.push();
//       p.translate((-p.height / gridNum) * 1, (-p.height / gridNum) * 0.5);
//       p.clear();

//       for (let y = 0; y < curPixel.length; y++) {
//         for (let x = 0; x < curPixel[y].length; x++) {
//           // curPixel[y][x] = p.lerp(curPixel[y][x], finalValue, 0.1);
//           p.circle(
//             (x * gridSize),
//             (y * gridSize),
//             curPixel[y][x]
//           );
//         }
//       }
//       p.pop();
//     }

//     p.windowResized = () => {
//       calculateGrid();
//       p.resizeCanvas(
//         p.windowWidth,
//         p.windowWidth * (imgH.height / imgH.width)
//       );
//     };
//   };
// };

// window.onload = () => {
//   new p5(createSketch("p5-sketch"));
// };
