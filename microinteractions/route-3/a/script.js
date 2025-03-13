// BALL

const container = document.getElementById("container");
const content = ["R", "&", "M"];
const numBalls = 3;
let ballSize = window.innerWidth < 480 ? 50 : 80;
const maxBallNum = 3;
const speed = 0.25;
const balls = [];

window.addEventListener("resize", () => {
  ballSize = window.innerWidth < 480 ? 50 : 80;
});
class Ball {
  constructor(index) {
    this.el = document.createElement("div");
    this.el.classList.add("ball");
    this.el.innerHTML = content[index % 3];
    container.appendChild(this.el);

    this.x =
      Math.random() *
      ((container?.clientWidth || window.innerWidth) - ballSize);
    this.y =
      Math.random() *
      ((container?.clientHeight || window.innerHeight) - ballSize);
    this.dx = speed;
    this.dy = speed;
    this.angle = 0;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
    let speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.angle += speed / 8;

    if (this.x <= 0) {
      this.x = 1;
      this.dx *= -1;
    }
    if (this.x + ballSize >= container.clientWidth) {
      this.x = container.clientWidth - ballSize - 1;
      this.dx *= -1;
    }
    if (this.y <= 0) {
      this.y = 1;
      this.dy *= -1;
    }
    if (this.y + ballSize >= container.clientHeight) {
      this.y = container.clientHeight - ballSize - 1;
      this.dy *= -1;
    }

    const minSpeed = 0.25;
    if (Math.abs(this.dx) < minSpeed) this.dx = minSpeed * Math.sign(this.dx);
    if (Math.abs(this.dy) < minSpeed) this.dy = minSpeed * Math.sign(this.dy);

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
        let overlap = ballSize - distance;
        let angle = Math.atan2(dy, dx);

        let separationX = Math.cos(angle) * (overlap / 2);
        let separationY = Math.sin(angle) * (overlap / 2);

        ball1.x += separationX;
        ball1.y += separationY;
        ball2.x -= separationX;
        ball2.y -= separationY;

        // Swap velocities
        [ball1.dx, ball2.dx] = [ball2.dx, ball1.dx];
        [ball1.dy, ball2.dy] = [ball2.dy, ball1.dy];
      }
    }
  }
}

function addNewBall() {
  for (let i = 0; i < maxBallNum; i++) {
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
