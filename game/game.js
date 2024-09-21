const pitches = {
  '1': 261.63,
  '2': 293.66,
  '3': 329.63,
  '4': 392.00,
  '5': 440.00,
  '6': 493.88
};

const buttons = {
  '1': document.getElementById('one'),
  '2': document.getElementById('two'),
  '3': document.getElementById('three'),
  '4': document.getElementById('four'),
  '5': document.getElementById('five'),
  '6': document.getElementById('six')
};

let gameSequence = [];
let playerSequence = [];
let round = 0;
let isGameRunning = false;

const context = new (window.AudioContext || window.webkitAudioContext)();

function playTone(pitch, duration = 500) {
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(pitches[pitch], context.currentTime);
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), duration);
}

function highlightButton(pitch) {
  const button = buttons[pitch];
  button.classList.add('highlight');
  setTimeout(() => button.classList.remove('highlight'), 300);
}

function playSequence(sequence) {
  let delay = 500;
  sequence.forEach(pitch => {
    setTimeout(() => {
      playTone(pitch);
      highlightButton(pitch);
    }, delay);
    delay += 1000;
  });
}

function disableButtons() {
  if (isGameRunning) {
    Object.values(buttons).forEach(button => button.classList.add('disabled'));
  }
}

function enableButtons() {
  Object.values(buttons).forEach(button => button.classList.remove('disabled'));
}

function nextRound() {
  disableButtons();
  playerSequence = [];
  gameSequence.push(getRandomPitch());
  round++;
  document.getElementById('message').textContent = `Round ${round}`;

  setTimeout(() => playSequence(gameSequence), 500);
  setTimeout(() => enableButtons(), gameSequence.length * 1000 + 500);
}

function handlePlayerInput(pitch) {
  if (isGameRunning) {
    disableButtons();
    playTone(pitch);
    highlightButton(pitch);
    playerSequence.push(pitch);

    const currentMoveIndex = playerSequence.length - 1;

    if (playerSequence[currentMoveIndex] !== gameSequence[currentMoveIndex]) {
      gameOver();
      return;
    }

    if (playerSequence.length === gameSequence.length) {
      setTimeout(nextRound, 1000);
    } else {
      setTimeout(enableButtons, 500);
    }
  } else {
    playTone(pitch);
    highlightButton(pitch);
    disableButtons();
    setTimeout(enableButtons, 500);
  }
}

function gameOver() {
  document.getElementById('message').textContent = `Game Over! You reached round ${round}. Press "Start Game" to play again.`;
  resetGame();
}

function resetGame() {
  gameSequence = [];
  playerSequence = [];
  round = 0;
  isGameRunning = false;
  enableButtons();
  document.getElementById('start-btn').disabled = false;
}

function getRandomPitch() {
  const pitchKeys = Object.keys(pitches);
  const randomIndex = Math.floor(Math.random() * pitchKeys.length);
  return pitchKeys[randomIndex];
}

function disableAllButtonsTemporarily() {

  Object.values(buttons).forEach(button => {
    button.classList.add('disabled');
  });


  setTimeout(() => {
    Object.values(buttons).forEach(button => {
      button.classList.remove('disabled');
    });
  }, 1000);
}

function init() {
  Object.keys(buttons).forEach(pitch => {
    buttons[pitch].addEventListener('click', () => {
      if (!buttons[pitch].classList.contains('disabled')) {
        handlePlayerInput(pitch);
        disableAllButtonsTemporarily();
      }
    });
  });
  const startButton = document.getElementById('start-btn');
  startButton.addEventListener('click', () => {
    startButton.disabled = true;
    isGameRunning = true;
    nextRound();
  });

  enableButtons();
  document.getElementById('message').textContent = 'Click "Start Game" to begin!';
}

init();