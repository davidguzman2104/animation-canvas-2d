const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ==============================
// CONFIGURACIÓN DEL CANVAS
// ==============================
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;
canvas.style.background = "#ff8";

// ==============================
// CLASE CIRCLE
// ==============================
class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = speed;
    this.dy = speed;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${this.radius / 2}px Arial`;
    ctx.fillText(this.text, this.x, this.y);
    ctx.closePath();
  }

  move() {
    // Rebote solo con el canvas
    if (this.x + this.radius >= canvas.width || this.x - this.radius <= 0) {
      this.dx *= -1;
    }

    if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
      this.dy *= -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }
}

// ==============================
// UTILIDADES
// ==============================
function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomPosition(radius, max) {
  return randomBetween(radius, max - radius);
}

// ==============================
// VALIDACIÓN INICIAL (NO JUNTOS)
// ==============================
function isOverlapping(newCircle, circles) {
  for (let c of circles) {
    const dx = newCircle.x - c.x;
    const dy = newCircle.y - c.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < newCircle.radius + c.radius) {
      return true;
    }
  }
  return false;
}

// ==============================
// CREACIÓN SEGURA DE CÍRCULOS
// ==============================
const circles = [];

function createCircleSafe(color, text) {
  let circle;
  let safe = false;

  while (!safe) {
    const radius = randomBetween(25, 60);
    const x = randomPosition(radius, canvas.width);
    const y = randomPosition(radius, canvas.height);
    const speed = randomBetween(1, 4);

    circle = new Circle(x, y, radius, color, text, speed);
    safe = !isOverlapping(circle, circles);
  }

  return circle;
}

// ==============================
// CÍRCULOS
// ==============================
circles.push(createCircleSafe("blue", "Tec1"));
circles.push(createCircleSafe("red", "Tec2"));

// ==============================
// ANIMACIÓN
// ==============================
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let circle of circles) {
    circle.move();
    circle.draw(ctx);
  }

  requestAnimationFrame(animate);
}

animate();
