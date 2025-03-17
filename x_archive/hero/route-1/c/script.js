let imgH;
let letterPixels = [];
let curPixels = [];
let finalPixels = [];
let gridSize = 10;
let circleScaler = 1;
let mode = 0;
let speed = 50;

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
}

function draw() {
  circleScaler = map(width, 0, 2560, 0.15, 2.5);
  clear();
  for (let y = 0; y < letterPixels.length; y++) {
    for (let x = 0; x < letterPixels[y].length; x++) {
      const mappedGridSize = height / letterPixels.length;

      if (finalPixels[y][x] >= 0.1) {
        switch (mode) {
          case 0:
            finalPixels[y][x] =
              letterPixels[y][x] +
              map(
                sin(
                  frameCount / 10 +
                    x / 10 +
                    y / 10 +
                    mouseX / 100 +
                    mouseY / 100,
                ),
                -1,
                1,
                -1,
                2.5,
              );
            break;
          case 1:
            finalPixels[y][x] =
              letterPixels[y][x] +
              map(
                sin(frameCount / 10 + y * 0.2 + mouseX / 100 + mouseY / 100),
                -1,
                1,
                -1,
                2.5,
              );
            break;
          case 2:
            finalPixels[y][x] =
              letterPixels[y][x] +
              sin(
                frameCount / 10 + x * 0.1 + mouseX / 100 + mouseY / 100,
                -1,
                1,
                -1,
                2.5,
              );
            break;
        }
      }
      curPixels[y][x] = lerp(curPixels[y][x], finalPixels[y][x], 0.1);
      circle(
        x * mappedGridSize,
        y * mappedGridSize,
        curPixels[y][x] * circleScaler,
      );
    }
  }
}

function mousePressed() {
  mode = (mode + 1) % 3;
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
        255,
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
