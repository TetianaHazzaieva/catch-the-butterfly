const butterflies = ['img/butterfly-blue.png', 'img/butterfly-colorful.png', 'img/butterfly-multicolored.png', 'img/butterfly-red.png', 'img/butterfly-yellow.png'];
const gameField = document.getElementById('game-field');
const scoreEl = document.getElementById('score');
const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty');

let score = 0;
let gameInterval;
let butterflySpeed = 3000;

startBtn.addEventListener('click', startGame);

function startGame() {
    score = 0;
    updateScore(0);
    gameField.innerHTML = '';
}

const difficulty = difficultySelect.ariaValueMax;
switch(difficulty) {
    case 'easy':
        butterflySpeed = 3000;
        break;
        case 'medium':
            butterflySpeed = 2000;
            break;
            case 'hurd':
                butterflySpeed = 1000;
                break;
}

if (gameInterval) clearInterval(gameInterval);

gameInterval = setInterval(spawnButterfly, butterflySpeed);

function spawnButterfly() {
    const butterfly = document.createElement('img');
    butterfly.src = butterflies[Math.floor(Math.random() * butterflies.length)];
    butterfly.classList.add('butterfly');

    const fieldRect = gameField.getClientRect();
    const x = Math.random() * (gameField.clientWidth - 60);
    const y = Math.random() * (gameField.clientHeight - 60);

    butterfly.style.left = `${x}px`;
    butterfly.style.top = `${y}px`;

    butterfly.addEventListener('click', () => {
        butterfly.remove();
        updateScore(score + 1);
    });

    gameField.appendChild(butterfly);

    setTimeout(() => {
        butterfly.remove();
    }, butterflySpeed - 100);
}

function updateScore(newScore) {
    score = newScore;
    scoreEl.textContent = score;
}
