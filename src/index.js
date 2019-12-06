// @ts-check

import "./index.css";

/** @type {HTMLCanvasElement} */
let canvas;
/** @type {CanvasRenderingContext2D} */
let ctx;

const scale = 1 / 3;

setup();

function draw(x, y, distance, iteration = 0) {
  const angle = (iteration * 0.15 + 1.5) * Math.PI; //+ (Math.random() - 0.5);
  const x2 = distance * Math.cos(angle) + x;
  const y2 = distance * Math.sin(angle) + y;

  ctx.lineTo(x2, y2);

  if (distance > 10) {
    draw(x2, y2, distance / 1.2, iteration + 1);
    ctx.moveTo(x2, y2);
    draw(x2, y2, distance / 1.2, iteration - 1);
  }
}

function run() {
  const background = ctx.createLinearGradient(0, 0, 0, canvas.height);
  background.addColorStop(0, "blue");
  background.addColorStop(0.5, "dodgerblue");
  background.addColorStop(1, "papayawhip");
  fill(background);

  ctx.strokeStyle = "#110";
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height);

  const startX = canvas.width / 2;
  const startY = canvas.height;

  draw(startX, startY, (canvas.height * scale) / 3);
  ctx.stroke();
}

function fill(color) {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setup() {
  const root = document.getElementById("root");
  canvas = document.createElement("canvas");

  // Style canvas to be fullscreen
  canvas.style.position = "absolute";
  canvas.style.height = "100vh";
  canvas.style.width = "100vw";

  // Add canvas to the DOM
  canvas = root.appendChild(canvas);
  ctx = canvas.getContext("2d");

  // Get actual size of canvas
  const handleResize = event => {
    const canvasDimensions = canvas.getBoundingClientRect();
    canvas.height = canvasDimensions.height;
    canvas.width = canvasDimensions.width;
    run();
  };

  // Set initial canvas size
  handleResize();

  // Set up resize handler
  window.addEventListener("resize", handleResize);
}
