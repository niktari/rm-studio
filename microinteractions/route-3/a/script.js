function wrapWordsInDivs() {
  const allText = document.querySelectorAll(".effect");



  for(let text of allText) {
    const content = text.textContent;
    const words = content.split(' ');
  
    const wordsWrapped = words.map(word => `<div class="effect--div">${word}</div>`).join(' ');
  
    text.innerHTML = wordsWrapped;
  }

}

wrapWordsInDivs();

let wordsDiv = document.querySelectorAll(".effect--div");

function applyTextEffect() {
  wordsDiv.forEach(word => {
    word.onmouseover = function() {
      if(word.classList.contains("blackletter")) {
          word.classList.remove("blackletter")
            } else {
              word.classList.add("blackletter")
      }

          

      setTimeout(()=> {
        if(word.classList.contains("blackletter")) {
          word.classList.remove("blackletter")
          }

      }, 1000)
    }
  })
}

applyTextEffect();


// BALL

const container = document.getElementById("container");
const content = ["R", "&", "M"];
const numBalls = 3;
const ballSize = 80;
const maxBallNum = 12;
const speed = 5;
const balls = [];

class Ball {
  constructor(index) {
    this.el = document.createElement("div");
    this.el.classList.add("ball");
    this.el.innerHTML = content[index % 3];
    container.appendChild(this.el);

    this.x = Math.random() * (container.clientWidth - ballSize);
    this.y = Math.random() * (container.clientHeight - ballSize);
    this.dx = (Math.random() - 0.5) * speed;
    this.dy = (Math.random() - 0.5) * speed;
    this.angle = 0;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.angle += speed / 8;

    if (this.x <= 0) {
      this.x = 0;
      this.dx *= -1;
    }
    if (this.x + ballSize >= container.clientWidth) {
      this.dx *= -1;
    }
    if (this.y <= 0) {
      this.y = 0;
      this.dy *= -1;
    }
    if (this.y + ballSize >= container.clientHeight) {
      this.dy *= -1;
    }

    this.el.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.angle}deg)`;
  }
}

function checkCollisions() {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      let ball1 = balls[i];
      let ball2 = balls[j];

      let dx = ball1.x - ball2.x;
      let dy = ball1.y - ball2.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < ballSize) {
        [ball1.dx, ball2.dx] = [ball2.dx, ball1.dx];
        [ball1.dy, ball2.dy] = [ball2.dy, ball1.dy];

        let overlap = ballSize - distance;
        let angle = Math.atan2(dy, dx);
        ball1.x += Math.cos(angle) * (overlap / 2);
        ball1.y += Math.sin(angle) * (overlap / 2);
        ball2.x -= Math.cos(angle) * (overlap / 2);
        ball2.y -= Math.sin(angle) * (overlap / 2);
      }
    }
  }
}

function addNewBall() {
  for(let i = 0; i < maxBallNum; i++) {
    balls.push(new Ball(i));
  }
}

addNewBall();


function animate() {
  balls.forEach((ball) => ball.move());
  checkCollisions();
  requestAnimationFrame(animate);
}

animate();