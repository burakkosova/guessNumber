'use strict';

const checkButton = document.querySelector('.check');
const againButton = document.querySelector('.again');
const guessInput = document.querySelector('.guess');
const numberField = document.querySelector('.number');

let highScore = 0;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;

const printMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const printScore = function () {
  document.querySelector('.label-score').textContent = `💯 Score: ${score}`;
};

checkButton.addEventListener('click', () => {
  const guess = Number(guessInput.value);
  console.log(guess, typeof guess);

  //When there is no input
  if (!guess) {
    printMessage('⛔ No number!');

    //When player wins
  } else if (guess === secretNumber) {
    printMessage('🎉 Correct Number!');
    numberField.textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    numberField.style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else {
    if (score > 1) {
      const message = guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      printMessage(message);
      score--;
      printScore();
      guessInput.value = '';
    } else {
      printMessage('🔥 You lost the game!');
      score = 0;
      printScore();
      document.querySelector('body').style.backgroundColor = 'red';
    }
  }
});

guessInput.addEventListener('keyup', () => {
  if (event.keyCode === 13) {
    event.preventDefault();
    checkButton.click();
  } else if (event.keyCode === 32) {
    event.preventDefault();
    againButton.click();
  }
});

againButton.addEventListener('click', () => {
  console.log('Clicked the again button!');
  numberField.textContent = '?';
  document.querySelector('body').style.backgroundColor = '#222';
  numberField.style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  printScore();
  guessInput.value = '';
  printMessage('Start guessing...');
});
