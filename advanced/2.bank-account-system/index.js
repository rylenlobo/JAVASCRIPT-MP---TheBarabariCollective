class BankAccount {
  #balance; // Private property

  constructor(owner, balance) {
    this.owner = owner;
    this.#balance = balance;
  }

  deposit(amount) {
    amount = parseFloat(amount);
    if (amount > 0) {
      this.#balance += amount;
      this.#addTransaction(`Deposited $${amount}`);
      return true;
    }
    return false;
  }

  withdraw(amount) {
    amount = parseFloat(amount);
    if (amount <= 0) return false;
    if (amount > this.#balance) {
      this.#addTransaction("Insufficient funds");
      return false;
    }
    this.#balance -= amount;
    this.#addTransaction(`Withdrawn $${amount}`);
    return true;
  }

  getBalance() {
    return this.#balance;
  }

  #addTransaction(message) {
    const transactionList = document.getElementById("transaction-list");
    const transaction = document.createElement("li");
    transaction.textContent = `${new Date().toLocaleTimeString()}: ${message}`;
    transactionList.prepend(transaction);
  }
}

// Global variable to store the current account
let currentAccount = null;

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("create-account-form")
    .addEventListener("submit", createAccount);
  document
    .getElementById("deposit-form")
    .addEventListener("submit", makeDeposit);
  document
    .getElementById("withdraw-form")
    .addEventListener("submit", makeWithdrawal);
  document
    .getElementById("balance-btn")
    .addEventListener("click", checkBalance);

  // Initially disable transaction forms
  toggleForms(false);
});

function createAccount(e) {
  e.preventDefault();
  const owner = document.getElementById("owner-name").value;
  const initialBalance = document.getElementById("initial-balance").value;

  if (
    owner &&
    initialBalance &&
    !isNaN(initialBalance) &&
    parseFloat(initialBalance) >= 0
  ) {
    currentAccount = new BankAccount(owner, parseFloat(initialBalance));

    document.getElementById("account-owner").textContent = owner;
    document.getElementById("create-account-form").reset();

    toggleForms(true);
    updateBalanceDisplay();

    // Add first transaction
    document.getElementById("transaction-list").innerHTML = "";
    const welcomeMsg = document.createElement("li");
    welcomeMsg.textContent = `Account created with initial balance: $${initialBalance}`;
    welcomeMsg.className = "success-text";
    document.getElementById("transaction-list").appendChild(welcomeMsg);
  }
}

function makeDeposit(e) {
  e.preventDefault();
  if (!currentAccount) return;

  const amount = document.getElementById("deposit-amount").value;
  if (currentAccount.deposit(amount)) {
    document.getElementById("deposit-form").reset();
    updateBalanceDisplay();
  }
}

function makeWithdrawal(e) {
  e.preventDefault();
  if (!currentAccount) return;

  const amount = document.getElementById("withdraw-amount").value;
  if (currentAccount.withdraw(amount)) {
    document.getElementById("withdraw-form").reset();
    updateBalanceDisplay();
  }
}

function checkBalance() {
  if (currentAccount) {
    alert(`Current Balance: $${currentAccount.getBalance()}`);
  }
}

function updateBalanceDisplay() {
  if (currentAccount) {
    document.getElementById(
      "balance-display"
    ).textContent = `$${currentAccount.getBalance()}`;
  }
}

function toggleForms(enable) {
  const forms = document.querySelectorAll(".transaction-form");
  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, button");
    inputs.forEach((input) => (input.disabled = !enable));
  });

  document.getElementById("account-section").style.display = enable
    ? "block"
    : "none";
}
