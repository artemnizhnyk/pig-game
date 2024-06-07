"use strict";
//modal
const modal = document.querySelector('.modal'),
    overlay = document.querySelector('.overlay'),
    btnCloseModal = document.querySelector('.close-modal'),
    wonTextEl = document.querySelector('.player--won-text');

function openModal(wonText) {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    wonTextEl.textContent = wonText;
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

//dice game
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
const totalScores = [0, 0];

startNewGame();

btnRoll.addEventListener('click', ev => {
    const rolledDice = Math.trunc(Math.random() * 6) + 1;

    diceEl.src = `dice-${rolledDice}.png`;
    diceEl.classList.remove('hidden');

    if (rolledDice !== 1) {
        currentScore += rolledDice;
        setCurrentScoreToActivePlayer();
    } else {
        switchPlayer();
    }
});

btnHold.addEventListener('click', ev => {
    const isZeroPlayerActive = playerZeroEl.classList.contains('player--active');
    if (currentScore) {
        if (isZeroPlayerActive) {
            totalScores[0] += currentScore;
            zeroScoreEl.textContent = totalScores[0];
        } else {
            totalScores[1] += currentScore;
            firstScoreEl.textContent = totalScores[1];
        }
        switchPlayer();
    }
    isZeroPlayerActive ? checkPlayerIsWinAndAlertIfItsTrue(0)
        : checkPlayerIsWinAndAlertIfItsTrue(1);
});

btnNew.addEventListener('click', startNewGame);

function checkPlayerIsWinAndAlertIfItsTrue(playerPosInTotalArray) {
    if (totalScores[playerPosInTotalArray] >= 100) {
        openModal(`Player ${playerPosInTotalArray + 1} won`);
        startNewGame();
    }
}

function switchPlayer() {
    currentScore = 0;
    setCurrentScoreToActivePlayer();
    toggleActiveClass();
}

function toggleActiveClass() {
    playerZeroEl.classList.toggle('player--active');
    playerFirstEl.classList.toggle('player--active');
}

function setCurrentScoreToActivePlayer() {
    playerZeroEl.classList.contains('player--active')
        ? zeroCurrentEl.textContent = currentScore
        : firstCurrentEL.textContent = currentScore;
}

function startNewGame() {
    if (!playerZeroEl.classList.contains('player--active')) {
        toggleActiveClass();
    }
    currentScore = 0;
    totalScores[0] = 0;
    totalScores[1] = 0;

    zeroScoreEl.textContent = 0;
    firstScoreEl.textContent = 0;
    zeroCurrentEl.textContent = currentScore;
    firstCurrentEL.textContent = currentScore;


    diceEl.classList.add('hidden');
}