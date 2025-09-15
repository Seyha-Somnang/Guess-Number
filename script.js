"use strict";

const number = document.querySelector(".number");
const guess = document.querySelector(".guess");
const message = document.querySelector(".message");
const btnCheck = document.querySelector(".check");
const btnAgain = document.querySelector(".again");
const score = document.querySelector(".score");
const highScore = document.querySelector(".highscore");

// start the game
const guestNum = Math.trunc(Math.random() * 20) + 1;
// number.textContent = guestNum;
let fullScore = 20;
let highScoreOfAllTime = 0;

// condtion of game

const wrongGuess = function () {
  if (fullScore > 1) {
    let status = guess.value > guestNum ? "high" : "low";
    message.textContent = `Your guess is too ${status}.`;
    fullScore--;
    score.textContent = fullScore;
  } else {
    score.textContent = 0;
    message.textContent = "You lose!";
    document.body.style.backgroundColor = "#FF0000";
  }
};

btnCheck.addEventListener("click", function () {
  const inputNum = guess.value;
  if (!inputNum) {
    message.textContent = "Please Input the Number.";
  } else if (inputNum == guestNum) {
    message.textContent = "Correct Number.";
    if (fullScore > highScoreOfAllTime) {
      highScoreOfAllTime = fullScore;
      highScore.textContent = highScoreOfAllTime;
    }
    document.body.style.backgroundColor = "#60b347";
  } else if (inputNum !== guestNum) {
    wrongGuess();
  }
});

btnAgain.addEventListener("click", function () {
  number.textContent = "?";
  message.textContent = "Start guessing...";
  guess.value = "";
  fullScore = 20;
  score.textContent = fullScore;
  document.body.style.backgroundColor = "#000";
});
