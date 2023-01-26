'use strict';

const rollDiceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
let dice = document.querySelector('.dice');

const player0Container = document.querySelector('.player--0');
const player1Container = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// Startstate
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  dice.classList.add('hidden');
  player0Container.classList.remove('player--winner');
  player1Container.classList.remove('player--winner');
  player0Container.classList.add('player--active');
  player1Container.classList.remove('player--active');
};

init();

rollDiceBtn.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.floor(Math.random() * 6 + 1);
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  //cs optelt
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#name--${activePlayer}`).textContent = 'You win!';
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Container.classList.toggle('player--active');
  player1Container.classList.toggle('player--active');
}

newGameBtn.addEventListener('click', init);
