// Represents a bank account with owner and balance.
class BankAccount {
  #balance; // Private property to store the account balance.

  // Constructor to initialize the account with owner and initial balance.
  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  // Method to deposit money into the account.
  deposit(amount) {
    amount = parseFloat(amount); // Ensure amount is a number.
    if (amount > 0) {
      this.#balance += amount;
      this.#addTransaction(`Deposited $${amount}`); // Log the transaction.
      return true; // Indicate successful deposit.
    }
    return false; // Indicate failed deposit (invalid amount).
  }

  // Method to withdraw money from the account.
  withdraw(amount) {
    amount = parseFloat(amount); // Ensure amount is a number.
    if (amount <= 0) return false; // Cannot withdraw zero or negative amount.
    if (amount > this.#balance) {
      this.#addTransaction("Insufficient funds"); // Log insufficient funds.
      return false; // Indicate failed withdrawal (insufficient funds).
    }
    this.#balance -= amount;
    this.#addTransaction(`Withdrawn $${amount}`); // Log the transaction.
    return true; // Indicate successful withdrawal.
  }

  // Method to get the current balance.
  getBalance() {
    return this.#balance;
  }

  // Private helper method to add a transaction message to the UI.
  #addTransaction(message) {
    // Get the transaction list element from the DOM.
    const transactionList = document.getElementById("transaction-list");
    // Create a new list item for the transaction.
    const transaction = document.createElement("li");
    // Set the text content with timestamp and message.
    transaction.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    // Add the new transaction to the beginning of the list.
    transactionList.prepend(transaction);
  }
}

// Global variable to store the currently active bank account object.
let currentAccount = null;

// Event listeners setup after the DOM is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for the create account form submission.
  document
    .getElementById("create-account-form")
    .addEventListener("submit", createAccount);
  // Add event listener for the deposit form submission.
  document
    .getElementById("deposit-form")
    .addEventListener("submit", makeDeposit);
  // Add event listener for the withdrawal form submission.
  document
    .getElementById("withdraw-form")
    .addEventListener("submit", makeWithdrawal);
  // Add event listener for the check balance button click.
  document
    .getElementById("balance-btn")
    .addEventListener("click", checkBalance);

  // Initially disable transaction forms until an account is created.
  toggleForms(false);
});

// Function to handle the creation of a new bank account.
function createAccount(e) {
  e.preventDefault(); // Prevent default form submission behavior.
  // Get owner name and initial balance from the form inputs.
  const owner = document.getElementById("owner-name").value;
  const initialBalance = document.getElementById("initial-balance").value;

  // Validate inputs before creating the account.
  if (
    owner &&
    initialBalance &&
    !isNaN(initialBalance) &&
    parseFloat(initialBalance) >= 0
  ) {
    // Create a new BankAccount instance.
    currentAccount = new BankAccount(owner, parseFloat(initialBalance));

    // Update the UI to display the account owner's name.
    document.getElementById("account-owner").textContent = owner;
    // Reset the create account form.
    document.getElementById("create-account-form").reset();

    // Enable the transaction forms and account section.
    toggleForms(true);
    // Update the balance display.
    updateBalanceDisplay();

    // Clear previous transactions and add the initial account creation message.
    document.getElementById("transaction-list").innerHTML = "";
    const welcomeMsg = document.createElement("li");
    welcomeMsg.textContent = `Account created with initial balance: $${initialBalance}`;
    welcomeMsg.className = "success-text"; // Style the message.
    document.getElementById("transaction-list").appendChild(welcomeMsg);
  }
}

// Function to handle depositing money into the account.
function makeDeposit(e) {
  e.preventDefault(); // Prevent default form submission behavior.
  if (!currentAccount) return; // Do nothing if no account exists.

  // Get the deposit amount from the form input.
  const amount = document.getElementById("deposit-amount").value;
  // Attempt to deposit the amount using the BankAccount method.
  if (currentAccount.deposit(amount)) {
    // If deposit is successful, reset the form and update the balance display.
    document.getElementById("deposit-form").reset();
    updateBalanceDisplay();
  }
}

// Function to handle withdrawing money from the account.
function makeWithdrawal(e) {
  e.preventDefault(); // Prevent default form submission behavior.
  if (!currentAccount) return; // Do nothing if no account exists.

  // Get the withdrawal amount from the form input.
  const amount = document.getElementById("withdraw-amount").value;
  // Attempt to withdraw the amount using the BankAccount method.
  if (currentAccount.withdraw(amount)) {
    // If withdrawal is successful, reset the form and update the balance display.
    document.getElementById("withdraw-form").reset();
    updateBalanceDisplay();
  }
}

// Function to display the current account balance in an alert.
function checkBalance() {
  if (currentAccount) {
    // Show an alert with the current balance if an account exists.
    alert(`Current Balance: $${currentAccount.getBalance()}`);
  }
}

// Function to update the balance displayed on the page.
function updateBalanceDisplay() {
  if (currentAccount) {
    // Get the balance display element from the DOM.
    // Update its text content with the formatted current balance.
    document.getElementById(
      "balance-display"
    ).textContent = `$${currentAccount.getBalance()}`;
  }
}

// Function to enable or disable transaction forms and the account section.
function toggleForms(enable) {
  // Select all transaction forms.
  const forms = document.querySelectorAll(".transaction-form");
  // Enable/disable all input and button elements within each form.
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, button");
    inputs.forEach((input) => (input.disabled = !enable));
  });

  // Show or hide the entire account section based on the 'enable' flag.
  document.getElementById("account-section").style.display = enable
    ? "block"
    : "none";
}
