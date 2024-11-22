const birthday = new Date("December 28, 2024 00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = birthday - now;

  if (timeLeft <= 0) {
    document.getElementById("countdown").innerHTML = "🎉 Happy Birthday! 🎉";
    startConfetti(); // 생일 축하 컨페티
    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = `
    ${days}일 ${hours}시간 ${minutes}분 ${seconds}초
  `;
}

function startConfetti() {
  const canvas = document.getElementById("confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD433"];

  for (let i = 0; i < 300; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 3 + 1,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

setInterval(updateCountdown, 1000);
updateCountdown();
