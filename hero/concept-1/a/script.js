const createSketch = (transitionDirection, containerId, letters) => {
  return (p) => {
    const breakpoint = 600;
    let canvasScaler;
    let imgM, imgR, imgAn;
    let gridSize = 5;
    let gridNum = 50;
    let pixelM = [];
    let pixelR = [];
    let pixelAn = [];
    let curPixel = [];
    let flag = true;

    p.preload = () => {
      imgM = p.loadImage("../../../assets/imgs/letter-m.jpg");
      imgR = p.loadImage("../../../assets/imgs/letter-r.jpg");
      imgAn = p.loadImage("../../../assets/imgs/letter-an.jpg");
    };

    p.setup = () => {
      breakPointCalc();
      const cnv = p.createCanvas(
        p.windowWidth / canvasScaler,
        (p.windowWidth / canvasScaler) * (imgM.height / imgM.width)
      );
      cnv.parent(containerId);

      if (letters) {
        cnv.mouseOver(changeFlag);
        cnv.mouseOut(changeFlag);
      }
      calculateGrid();
      p.noStroke();
      p.fill(0);
    };

    function breakPointCalc() {
      const breakpointFlag = p.windowWidth < breakpoint;
      canvasScaler = breakpointFlag ? 1 : 3;
    }

    function calculateGrid() {
      gridNum = p.floor(p.windowWidth / canvasScaler / 5.88);
      gridSize = p.floor(imgM.height / gridNum);

      if (letters) {
        pixelM = [];
        pixelR = [];
        generatePixelArray(imgM, pixelM);
        generatePixelArray(imgR, pixelR);
        curPixel =
          transitionDirection === "MtoR" ? deepCopy(pixelR) : deepCopy(pixelM);
      } else {
        pixelAn = [];
        generatePixelArray(imgAn, pixelAn);
        curPixel = deepCopy(pixelAn);
      }
    }

    function deepCopy(arr) {
      return JSON.parse(JSON.stringify(arr));
    }

    function generatePixelArray(myImg, arr) {
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
          const mappedBrightnessVal = p.constrain(
            p.map(brightnessVal, 0, 255, 0, 265),
            0,
            255
          );
          const radius = p.map(mappedBrightnessVal, 255, 0, 0, 10);
          arr[row][col] = radius;
          col++;
        }
        row++;
      }
    }

    p.draw = () => {
      p.push();
      p.translate((-p.height / gridNum) * 2.5, (-p.height / gridNum) * 2.5);
      p.clear();

      for (let y = 0; y < curPixel.length; y++) {
        for (let x = 0; x < curPixel[y].length; x++) {
          //   p.fill(p.map(curPixel[y][x], 0, 10, 255, 0));

          if (letters) {
            const finalValue = flag
              ? transitionDirection === "MtoR"
                ? pixelR[y][x]
                : pixelM[y][x]
              : transitionDirection === "MtoR"
              ? pixelM[y][x]
              : pixelR[y][x];

            curPixel[y][x] = p.lerp(curPixel[y][x], finalValue, 0.1);
            p.circle(
              (x * p.height) / gridNum,
              (y * p.height) / gridNum,
              curPixel[y][x]
            );
          }
          p.circle(
            (x * p.height) / gridNum,
            (y * p.height) / gridNum,
            curPixel[y][x]
          );
        }
      }
      p.pop();
    };

    p.windowResized = () => {
      breakPointCalc();
      p.resizeCanvas(
        p.windowWidth / canvasScaler,
        (p.windowWidth / canvasScaler) * (imgM.height / imgM.width)
      );
      calculateGrid();
    };

    function changeFlag() {
      flag = !flag;
    }
  };
};

window.onload = () => {
  new p5(createSketch("RtoM", "left", true));
  new p5(createSketch("MtoR", "right", true));
  new p5(createSketch("", "middle", false));
};
