class Shape {
  constructor(x, y) {
    this.angle = (Math.PI / 2)  +
        ((Math.random() * Math.PI * .6) - (Math.PI * .3));
    this.color = `hsla(${21 + Math.random() * 20}, 68%, 57%,
        ${Math.random() * .5 + .2})`;
    this.speed = (Math.random() * 1.7) + .8;
    this.twist = Math.random() * 180;
    this.reset();
    this.y = Math.random() * -200;
  }

  reset() {
    this.size = (Math.random() * 50) + 20;
    this.x = Math.random() * canvas.width;
    this.y = -this.size;
  }
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  try {
    shapes.forEach((shape) => {
      ctx.beginPath();
      ctx.fillStyle = shape.color;
      ctx.arc(shape.x, shape.y, shape.size,
          shape.twist, shape.twist + Math.PI);
      ctx.fill();
    });
  }
  catch (err) {
    console.warn(err);
  }
}

function init() {
  const count = Math.min(canvas.width * .5, 1100);

  reset();

  for (let i = 0; i < count; i ++) {
    shapes.push(new Shape());
  }

  window.requestAnimationFrame(tick);
  window.addEventListener("resize", reset);
}

function reset() {
  canvas.width = social.offsetWidth;
  canvas.height = social.offsetHeight;
}

function tick() {
  frame = !frame;

  if (frame) {
    draw();
  }
  else {
    shapes.forEach((shape) => {
      shape.x += Math.cos(shape.angle) * shape.speed;
      shape.y += Math.sin(shape.angle) * shape.speed;
      shape.size -= shape.speed * .08;
      shape.twist += (Math.PI / 200 * shape.speed);

      if (shape.size < 1 || shape.y > canvas.height + shape.size) {
        shape.reset();
      }
    });
  }

  window.requestAnimationFrame(tick);
}


const social = document.querySelector(".social"),
      canvas = social.querySelector("#social-canvas"),
      ctx = canvas.getContext("2d");

let frame = true;
let shapes = [];

window.addEventListener("load", (e) => init(), { once: true });
