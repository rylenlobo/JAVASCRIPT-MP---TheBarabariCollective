// Defines the main game logic within a class
class RockPaperScissors {
  // Constructor initializes the game state and elements
  constructor() {
    // Available choices in the game
    this.choices = ["rock", "paper", "scissors"];
    // Player's score, starts at 0
    this.playerScore = 0;
    // Computer's score, starts at 0
    this.computerScore = 0;
    // DOM element to display player's choice
    this.playerChoiceDisplay = document.getElementById("player-choice");
    // DOM element to display computer's choice
    this.computerChoiceDisplay = document.getElementById("computer-choice");
    // DOM element to display the game result
    this.resultDisplay = document.getElementById("result");
    // DOM element to display player's score
    this.playerScoreDisplay = document.getElementById("player-score");
    // DOM element to display computer's score
    this.computerScoreDisplay = document.getElementById("computer-score");
    // Set up event listeners for buttons
    this.initializeGame();
  }

  // Sets up event listeners for the game buttons
  initializeGame() {
    // Add event listeners to choice buttons
    document
      .getElementById("rock")
      .addEventListener("click", () => this.play("rock")); // Play rock on click
    document
      .getElementById("paper")
      .addEventListener("click", () => this.play("paper")); // Play paper on click
    document
      .getElementById("scissors")
      .addEventListener("click", () => this.play("scissors")); // Play scissors on click
    // Add event listener to reset button
    document
      .getElementById("reset")
      .addEventListener("click", () => this.resetGame()); // Reset game on click
  }

  // Randomly selects the computer's choice
  getComputerChoice() {
    // Return a random choice from the choices array
    return this.choices[Math.floor(Math.random() * this.choices.length)];
  }

  // Determines the winner based on player and computer choices
  determineWinner(playerChoice, computerChoice) {
    // Check for a tie
    if (playerChoice === computerChoice) return "tie";
    // Check for player win conditions
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return "win"; // Player wins
    }
    // Otherwise, player loses
    return "lose";
  }

  // Updates the score based on the game result
  updateScore(result) {
    // Increment player score if they win
    if (result === "win") {
      this.playerScore++;
    }
    // Increment computer score if player loses
    else if (result === "lose") {
      this.computerScore++;
    }

    // Update the score display on the page
    this.playerScoreDisplay.textContent = `You: ${this.playerScore}`;
    this.computerScoreDisplay.textContent = `Computer: ${this.computerScore}`;
  }

  // Displays the result of the round
  displayResult(result) {
    // Update the class of the result display for styling
    this.resultDisplay.className = "result " + result;

    // Set the text content based on the result
    if (result === "tie") {
      this.resultDisplay.textContent = "It's a tie!";
    } else if (result === "win") {
      this.resultDisplay.textContent = "You win!";
    } else {
      this.resultDisplay.textContent = "Computer wins!";
    }
  }

  // Returns the emoji corresponding to a choice
  getEmojiForChoice(choice) {
    // Return the appropriate emoji based on the choice
    switch (choice) {
      case "rock":
        return "✊ Rock";
      case "paper":
        return "✋ Paper";
      case "scissors":
        return "✌️ Scissors";
      default:
        return choice; // Return the choice itself if no emoji matches
    }
  }

  // Executes a round of the game
  play(playerChoice) {
    // Get the computer's choice
    const computerChoice = this.getComputerChoice();
    // Display the player's choice with emoji
    this.playerChoiceDisplay.textContent = `Your choice: ${this.getEmojiForChoice(
      playerChoice
    )}`;
    // Display the computer's choice with emoji
    this.computerChoiceDisplay.textContent = `Computer chose: ${this.getEmojiForChoice(
      computerChoice
    )}`;

    // Determine the winner of the round
    const result = this.determineWinner(playerChoice, computerChoice);
    // Display the result
    this.displayResult(result);
    // Update the score
    this.updateScore(result);
  }

  // Resets the game state and display
  resetGame() {
    // Reset scores to 0
    this.playerScore = 0;
    this.computerScore = 0;
    // Update score display
    this.playerScoreDisplay.textContent = "You: 0";
    this.computerScoreDisplay.textContent = "Computer: 0";
    // Reset choice displays
    this.playerChoiceDisplay.textContent = "Your choice: ";
    this.computerChoiceDisplay.textContent = "Computer choice: ";
    // Reset result display
    this.resultDisplay.className = "result";
    this.resultDisplay.textContent = "Choose an option to start!";
  }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create a new instance of the RockPaperScissors game
  const game = new RockPaperScissors();
});
