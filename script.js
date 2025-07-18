const butterflies = [
  "img/butterfly-blue.png",
  "img/butterfly-colorful.png",
  "img/butterfly-multicolored.png",
  "img/butterfly-red.png",
  "img/butterfly-yellow.png",
];
const gameField = document.getElementById("game-field");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const difficultySelect = document.getElementById("difficulty");

let score = 0;
let countdown = 20;
let gameInterval;
let timerInterval;

startBtn.addEventListener("click", startGame);

function updateScore(val = score) {
  score = val;
  scoreEl.textContent = score;
}

function updateTimer(val) {
  timerEl.textContent = val;
}

function startGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  gameField.innerHTML = "";
  score = 0;
  updateScore();

  countdown = 20;
  updateTimer(countdown);

  startBtn.disabled = true;

  const speed =
    difficultySelect.value === "easy"
      ? 3000
      : difficultySelect.value === "medium"
      ? 2000
      : difficultySelect.value === "hard"
      ? 1000
      : 3000;

  gameInterval = setInterval(() => spawnButterfly(speed), speed);
  timerInterval = setInterval(() => {
    countdown--;
    updateTimer(countdown);

    if (countdown <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);
  startBtn.disabled = false;
  gameField.innerHTML = "";
  alert(`Time's up! You scored ${score} points.`);
}
function spawnButterfly(lifeTime) {
  const img = document.createElement("img");
  img.src = butterflies[Math.floor(Math.random() * butterflies.length)];
  img.className = "butterfly";

  const rect = gameField.getBoundingClientRect();
  img.style.left = `${Math.random() * (rect.width - 60)}px`;
  img.style.top = `${Math.random() * (rect.height - 60)}px`;

  img.onclick = () => {
    img.remove();
    updateScore(score + 1);
  };

  gameField.appendChild(img);

  setTimeout(() => {
    if (gameField.contains(img)) {
      img.remove();
    }
  }, lifeTime * 0.9);
}
