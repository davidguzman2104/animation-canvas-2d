// ==============================
// CANVAS + CONTEXTO
// ==============================
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ==============================
// CONTROLES
// ==============================
const widthSlider = document.getElementById("widthSlider");
const heightSlider = document.getElementById("heightSlider");
const countSlider = document.getElementById("countSlider");

const widthValue = document.getElementById("widthValue");
const heightValue = document.getElementById("heightValue");
const countValue = document.getElementById("countValue");

// ==============================
// CONFIGURACIÓN (UI)
// ==============================
canvas.style.background = "#ffffff";

/**
 * Ajusta el tamaño visible del canvas (CSS) y el tamaño real (pixeles internos)
 * para que:
 * 1) Se vea crecer/disminuir visualmente con sliders
 * 2) Se mantenga nítido en pantallas HiDPI (devicePixelRatio)
 */
function resizeCanvas() {
  const frame = canvas.parentElement; // .card-canvas__frame
  const frameW = frame.clientWidth;
  const frameH = frame.clientHeight;

  // Tamaño visible (en pixeles CSS) en función de sliders
  const cssW = Math.floor(frameW * (widthSlider.value / 100));
  const cssH = Math.floor(frameH * (heightSlider.value / 100));

  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";

  // Tamaño real (en pixeles físicos) para nitidez
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(cssW * dpr);
  canvas.height = Math.floor(cssH * dpr);

  // Normaliza el sistema de coordenadas para dibujar en "pixeles CSS"
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

// Inicializa valores del UI
widthValue.textContent = widthSlider.value + "%";
heightValue.textContent = heightSlider.value + "%";
countValue.textContent = countSlider.value;

// Primera medida
resizeCanvas();

// Recalcula si cambia el tamaño de la ventana (mantiene el % seleccionado)
window.addEventListener("resize", () => {
  resizeCanvas();
  generateCircles(+countSlider.value);
});

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

    this.dx = Math.random() < 0.5 ? speed : -speed;
    this.dy = Math.random() < 0.5 ? speed : -speed;
  }

  draw() {
    // Contorno
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    // Texto centrado
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${Math.max(12, this.radius / 2)}px Arial`;
    ctx.fillStyle = "#0b1630";
    ctx.fillText(this.text, this.x, this.y);

    ctx.closePath();
  }

  move() {
    // Rebotar en los bordes (usa tamaño en CSS px: canvas.style.width/height no sirve aquí)
    // Como el ctx está normalizado a CSS px, usamos el tamaño CSS: canvas.clientWidth/Height
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (this.x + this.radius >= w || this.x - this.radius <= 0) {
      this.dx *= -1;
    }
    if (this.y + this.radius >= h || this.y - this.radius <= 0) {
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

function isOverlapping(newCircle, circles) {
  return circles.some(c => {
    const dx = newCircle.x - c.x;
    const dy = newCircle.y - c.y;
    return Math.sqrt(dx * dx + dy * dy) < newCircle.radius + c.radius;
  });
}

// ==============================
// CREAR CÍRCULOS
// ==============================
let circles = [];

function generateCircles(amount) {
  circles = [];

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  for (let i = 1; i <= amount; i++) {
    let circle;
    let safe = false;
    let attempts = 0;

    // Evita bucles infinitos cuando el canvas está muy pequeño
    while (!safe && attempts < 800) {
      attempts++;

      const radius = randomBetween(20, 50);

      // si el canvas es demasiado pequeño para este radio, reduce radio
      if (radius * 2 > w || radius * 2 > h) continue;

      const x = randomPosition(radius, w);
      const y = randomPosition(radius, h);
      const speed = randomBetween(1, 4);
      const color = `hsl(${Math.random() * 360}, 70%, 50%)`;

      circle = new Circle(x, y, radius, color, i.toString(), speed);
      safe = !isOverlapping(circle, circles);
    }

    // Si no encontró espacio, crea uno pequeño para no romper
    if (!safe) {
      const radius = Math.max(10, Math.min(w, h) / 12);
      const x = randomBetween(radius, Math.max(radius, w - radius));
      const y = randomBetween(radius, Math.max(radius, h - radius));
      circle = new Circle(x, y, radius, "#2563eb", i.toString(), 1.5);
    }

    circles.push(circle);
  }
}

// Inicial
generateCircles(+countSlider.value);

// ==============================
// EVENTOS SLIDERS
// ==============================
widthSlider.oninput = () => {
  widthValue.textContent = widthSlider.value + "%";
  resizeCanvas();
  generateCircles(+countSlider.value);
};

heightSlider.oninput = () => {
  heightValue.textContent = heightSlider.value + "%";
  resizeCanvas();
  generateCircles(+countSlider.value);
};

countSlider.oninput = () => {
  countValue.textContent = countSlider.value;
  generateCircles(+countSlider.value);
};

// ==============================
// ANIMACIÓN
// ==============================
function animate() {
  // Limpieza usando tamaño CSS (porque ctx está normalizado a CSS px)
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  circles.forEach(circle => {
    circle.move();
    circle.draw();
  });

  requestAnimationFrame(animate);
}

animate();
