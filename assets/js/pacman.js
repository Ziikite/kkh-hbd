const canvas = document.getElementById("pacman");
const ctx = canvas.getContext("2d");

// 캔버스 크기 설정
canvas.width = 400;
canvas.height = 400;

const pacman = { x: 200, y: 200, radius: 20, speed: 2, direction: "right" };
const pellet = { x: Math.random() * (canvas.width - 20) + 10, y: Math.random() * (canvas.height - 20) + 10, radius: 5 };
let score = 0;

function drawPacman() {
  ctx.beginPath();
  ctx.arc(
    pacman.x,
    pacman.y,
    pacman.radius,
    Math.PI / 4,
    (7 * Math.PI) / 4
  );
  ctx.lineTo(pacman.x, pacman.y);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function drawPellet() {
  ctx.beginPath();
  ctx.arc(pellet.x, pellet.y, pellet.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function movePacman() {
  if (pacman.direction === "right") pacman.x += pacman.speed;
  if (pacman.direction === "left") pacman.x -= pacman.speed;
  if (pacman.direction === "up") pacman.y -= pacman.speed;
  if (pacman.direction === "down") pacman.y += pacman.speed;

  // 화면 벽 충돌 처리
  if (pacman.x - pacman.radius < 0) pacman.x = pacman.radius;
  if (pacman.x + pacman.radius > canvas.width) pacman.x = canvas.width - pacman.radius;
  if (pacman.y - pacman.radius < 0) pacman.y = pacman.radius;
  if (pacman.y + pacman.radius > canvas.height) pacman.y = canvas.height - pacman.radius;
}

function detectCollision() {
  const dx = pacman.x - pellet.x;
  const dy = pacman.y - pellet.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < pacman.radius + pellet.radius) {
    score += 1;
    pellet.x = Math.random() * (canvas.width - 20) + 10;
    pellet.y = Math.random() * (canvas.height - 20) + 10;
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("hidden");
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPacman();
  drawPellet();
  drawScore();
  movePacman();
  detectCollision();

  if (score >= 28) {
    showPopup();
    return; // 팝업 표시 후 게임 루프 중단
  }

  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") pacman.direction = "right";
  if (event.key === "ArrowLeft") pacman.direction = "left";
  if (event.key === "ArrowUp") pacman.direction = "up";
  if (event.key === "ArrowDown") pacman.direction = "down";
});

gameLoop();
