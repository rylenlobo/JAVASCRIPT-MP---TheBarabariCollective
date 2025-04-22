class RockPaperScissors {
  constructor() {
    this.choices = ["rock", "paper", "scissors"];
    this.playerScore = 0;
    this.computerScore = 0;
    this.playerChoiceDisplay = document.getElementById("player-choice");
    this.computerChoiceDisplay = document.getElementById("computer-choice");
    this.resultDisplay = document.getElementById("result");
    this.playerScoreDisplay = document.getElementById("player-score");
    this.computerScoreDisplay = document.getElementById("computer-score");
    this.initializeGame();
  }

  initializeGame() {
    // Add event listeners to buttons
    document
      .getElementById("rock")
      .addEventListener("click", () => this.play("rock"));
    document
      .getElementById("paper")
      .addEventListener("click", () => this.play("paper"));
    document
      .getElementById("scissors")
      .addEventListener("click", () => this.play("scissors"));
    document
      .getElementById("reset")
      .addEventListener("click", () => this.resetGame());
  }

  getComputerChoice() {
    return this.choices[Math.floor(Math.random() * this.choices.length)];
  }

  determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return "tie";
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return "win";
    }
    return "lose";
  }

  updateScore(result) {
    if (result === "win") {
      this.playerScore++;
    } else if (result === "lose") {
      this.computerScore++;
    }

    this.playerScoreDisplay.textContent = `You: ${this.playerScore}`;
    this.computerScoreDisplay.textContent = `Computer: ${this.computerScore}`;
  }

  displayResult(result) {
    this.resultDisplay.className = "result " + result;

    if (result === "tie") {
      this.resultDisplay.textContent = "It's a tie!";
    } else if (result === "win") {
      this.resultDisplay.textContent = "You win!";
    } else {
      this.resultDisplay.textContent = "Computer wins!";
    }
  }

  getEmojiForChoice(choice) {
    switch (choice) {
      case "rock":
        return "✊ Rock";
      case "paper":
        return "✋ Paper";
      case "scissors":
        return "✌️ Scissors";
      default:
        return choice;
    }
  }

  play(playerChoice) {
    const computerChoice = this.getComputerChoice();
    this.playerChoiceDisplay.textContent = `Your choice: ${this.getEmojiForChoice(
      playerChoice
    )}`;
    this.computerChoiceDisplay.textContent = `Computer chose: ${this.getEmojiForChoice(
      computerChoice
    )}`;

    const result = this.determineWinner(playerChoice, computerChoice);
    this.displayResult(result);
    this.updateScore(result);
  }

  resetGame() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.playerScoreDisplay.textContent = "You: 0";
    this.computerScoreDisplay.textContent = "Computer: 0";
    this.playerChoiceDisplay.textContent = "Your choice: ";
    this.computerChoiceDisplay.textContent = "Computer choice: ";
    this.resultDisplay.className = "result";
    this.resultDisplay.textContent = "Choose an option to start!";
  }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const game = new RockPaperScissors();
});
