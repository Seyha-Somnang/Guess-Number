"use strict";

// Cache DOM queries and use event delegation where possible
const elements = {
  number: document.querySelector(".number"),
  guess: document.querySelector(".guess"),
  message: document.querySelector(".message"),
  btnCheck: document.querySelector(".check"),
  btnAgain: document.querySelector(".again"),
  score: document.querySelector(".score"),
  highScore: document.querySelector(".highscore")
};

// Game state
let gameState = {
  secretNumber: Math.trunc(Math.random() * 20) + 1,
  score: 20,
  highScore: 0
};

// Initialize display
elements.highScore.textContent = gameState.highScore;

// Handle check button click
const handleCheck = function () {
  const inputNum = elements.guess.value;
  
  if (!inputNum) {
    elements.message.textContent = "Please Input the Number.";
    return;
  }
  
  const inputValue = Number(inputNum);
  
  if (inputValue === gameState.secretNumber) {
    // Win condition
    elements.message.textContent = "Correct Number.";
    elements.number.textContent = gameState.secretNumber;
    
    if (gameState.score > gameState.highScore) {
      gameState.highScore = gameState.score;
      elements.highScore.textContent = gameState.highScore;
    }
    
    document.body.style.backgroundColor = "#60b347";
  } else {
    // Wrong guess
    if (gameState.score > 1) {
      const status = inputValue > gameState.secretNumber ? "high" : "low";
      elements.message.textContent = `Your guess is too ${status}.`;
      gameState.score--;
      elements.score.textContent = gameState.score;
    } else {
      elements.score.textContent = 0;
      elements.message.textContent = "You lose!";
      document.body.style.backgroundColor = "#FF0000";
    }
  }
  
  // Clear input after each guess for better UX
  elements.guess.value = "";
  elements.guess.focus();
};

// Handle reset button click
const handleReset = function () {
  gameState = {
    secretNumber: Math.trunc(Math.random() * 20) + 1,
    score: 20,
    highScore: gameState.highScore
  };
  
  elements.number.textContent = "?";
  elements.message.textContent = "Start guessing...";
  elements.guess.value = "";
  elements.score.textContent = gameState.score;
  document.body.style.backgroundColor = "#222";
  elements.guess.focus();
};

// Event listeners
elements.btnCheck.addEventListener("click", handleCheck);
elements.btnAgain.addEventListener("click", handleReset);

// Add keyboard support for better UX (Enter key to check)
elements.guess.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    handleCheck();
  }
});
