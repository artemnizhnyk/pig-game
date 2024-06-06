"use strict";

const diceEl = document.querySelector('.dice'),
    playerZeroEl = document.querySelector('.player--0'),
    playerFirstEl = document.querySelector('.player--1'),
    zeroScoreEl = document.querySelector('#score--0'),
    firstScoreEl = document.querySelector('#score--1'),
    zeroCurrentEl = document.querySelector('#current--0'),
    firstCurrentEL = document.querySelector('#current--1');

const btnNew = document.querySelector('.btn--new'),
    btnRoll = document.querySelector('.btn--roll'),
    btnHold = document.querySelector('.btn--hold');

let currentScore = 0;

zeroScoreEl.textContent = 0;
firstScoreEl.textContent = 0;
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', ev => {
    const rolledDice = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `dice-${rolledDice}.png`;
    diceEl.classList.remove('hidden');

    if (rolledDice !== 1) {
        currentScore += rolledDice;
        playerZeroEl.classList.contains('player--active')
            ? zeroCurrentEl.textContent = currentScore
            : firstCurrentEL.textContent = currentScore;
    } else {
        currentScore = 0;
        playerZeroEl.classList.contains('player--active')
            ? zeroCurrentEl.textContent = currentScore
            : firstCurrentEL.textContent = currentScore;
        playerZeroEl.classList.toggle('player--active')
        playerFirstEl.classList.toggle('player--active')
    }
});