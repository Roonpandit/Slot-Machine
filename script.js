const symbols = {
    default: ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'],
    fruit: ['🍒', '🍋', '🍊', '🍉', '🍇', '🍓'],
    numbers: ['1', '2', '3', '4', '5', '6']
};

let points = 0;
let highScore = 0;
const maxPoints = 500;

document.getElementById('spinBtn').addEventListener('click', spinReels);
document.getElementById('resetBtn').addEventListener('click', resetGame);
document.getElementById('themeSelect').addEventListener('change', changeTheme);

function spinReels() {
    if (points >= maxPoints) {
        playSoundEffect('lose');
        displayMessage('😔 Game over! Maximum points reached.');
        return;
    }
    
    const theme = document.getElementById('themeSelect').value;
    const reelSymbols = symbols[theme];
    
    const result = [
        getRandomSymbol(reelSymbols),
        getRandomSymbol(reelSymbols),
        getRandomSymbol(reelSymbols)
    ];
    
    displayResult(result);
    playSpinAnimation();
    playSoundEffect('spin');
    updatePoints(result);
    updateHighScore();
}

function getRandomSymbol(symbols) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

function displayResult(result) {
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`reel${i}`).textContent = result[i - 1];
    }
}

function updatePoints(result) {
    const uniqueSymbols = [...new Set(result)];
    let newPoints = 0;
    let message = '';

    if (uniqueSymbols.length === 1) {
        newPoints = 10;
        message = 'You Win 🏆🎊';
        playSoundEffect('win');
    } else if (uniqueSymbols.length === 2) {
        newPoints = 5;
        message = 'Good 👍';
    } else {
        message = 'Try again 🤧';
    }

    points += newPoints;
    if (points > maxPoints) points = maxPoints;
    document.getElementById('points').textContent = points;

    displayMessage(message);
}

function updateHighScore() {
    if (points > highScore) {
        highScore = points;
        document.getElementById('highScore').textContent = highScore;
    }
}

function playSpinAnimation() {
    const reels = document.querySelectorAll('.reel');
    reels.forEach(reel => {
        reel.classList.add('spin');
        setTimeout(() => reel.classList.remove('spin'), 1000); // Match the animation duration
    });
}

function playSoundEffect(type) {
    let audio;
    switch (type) {
        case 'spin':
            audio = new Audio('spin.mp3'); // Path to your spin sound file
            break;
        case 'win':
            audio = new Audio('win.mp3'); // Path to your win sound file
            break;
        case 'lose':
            audio = new Audio('lose.mp3'); // Path to your lose sound file
            break;
        default:
            return;
    }
    audio.play();
}

function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    setTimeout(() => messageElement.style.display = 'none', 3000); // Hide message after 3 seconds
}

function resetGame() {
    points = 0;
    document.getElementById('points').textContent = points;
    displayMessage('🔄 Game Reset');
}

function changeTheme() {
    // Optional: Implement theme-specific changes if needed
}