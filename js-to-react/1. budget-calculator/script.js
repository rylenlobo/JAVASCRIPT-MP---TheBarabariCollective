// Using const for fixed structures
// const is used to declare variables that are constant and cannot be reassigned. However, the properties of objects declared with const can still be modified.
const predefinedCategories = [
  "Salary",
  "Rent",
  "Food",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Other"
];

// Using let for variables that will be reassigned
// let is used to declare variables that can be reassigned. It has block scope, meaning it is only accessible within the block it is defined in.
let transactions = []; // Will store all transactions
let loans = []; // Will store all loan records
let totalIncome = 0;
let totalExpense = 0;
let balance = 0;

// Using const for objects that won't be reassigned (but their properties can change)
// Objects declared with const cannot be reassigned, but their internal properties can be modified.
const totals = {
  income: 0,
  expense: 0
};

// Budget limit using let since it can be modified by user
// let is used here because the budget limit can change based on user input.
let budgetLimit = 0;

// LocalStorage keys
// These constants store the keys used to save and retrieve data from localStorage.
const TRANSACTIONS_STORAGE_KEY = "budgetCalculator_transactions";
const LOANS_STORAGE_KEY = "budgetCalculator_loans";
const BUDGET_LIMIT_STORAGE_KEY = "budgetCalculator_budgetLimit";

// LocalStorage functions
function saveToLocalStorage() {
  localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loans));
  localStorage.setItem(BUDGET_LIMIT_STORAGE_KEY, budgetLimit.toString());
}

function loadFromLocalStorage() {
  try {
    // Load transactions
    const storedTransactions = localStorage.getItem(TRANSACTIONS_STORAGE_KEY);
    if (storedTransactions) {
      transactions = JSON.parse(storedTransactions);
    }

    // Load loans
    const storedLoans = localStorage.getItem(LOANS_STORAGE_KEY);
    if (storedLoans) {
      loans = JSON.parse(storedLoans);
    }

    // Load budget limit
    const storedBudgetLimit = localStorage.getItem(BUDGET_LIMIT_STORAGE_KEY);
    if (storedBudgetLimit) {
      budgetLimit = parseFloat(storedBudgetLimit);
    }

    // Update UI
    calculateTotals();
    updateUI();
    updateLoanList();
    updateBudgetWarning();
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    alert("Couldn't load your saved data. Starting with a clean slate.");
  }
}

// Function to validate amount using comparison operators
// Comparison operators (e.g., >, <, >=, <=) are used to compare values and return a boolean result.
function isValidAmount(amount) {
  // Check if amount is a number and greater than zero
  return !isNaN(amount) && amount > 0;
}

// Function to check if budget is exceeded using logical operators
// Logical operators (e.g., &&, ||, !) are used to combine or invert boolean expressions.
function isBudgetExceeded() {
  // Using logical operators: > for comparison and && to ensure we have a budget set
  return budgetLimit > 0 && totalExpense > budgetLimit;
}

// Arithmetic operators for calculations
// Arithmetic operators (e.g., +, -, *, /) are used to perform mathematical operations.
function calculateBalance() {
  // Using +, -, to calculate balance
  balance = totalIncome - totalExpense;
  return balance;
}

// Calculate totals using for loop
// A for loop is used to iterate over a sequence (e.g., an array) a specific number of times.
function calculateTotals() {
  // Reset totals to 0
  totals.income = 0;
  totals.expense = 0;

  // Using a standard for loop
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      totals.income += transactions[i].amount;
    } else {
      totals.expense += transactions[i].amount;
    }
  }

  totalIncome = totals.income;
  totalExpense = totals.expense;

  return calculateBalance();
}

// Get transactions by category using for...of loop
// The for...of loop is used to iterate over iterable objects like arrays, providing the value of each element.
function getTransactionsByCategory(category) {
  const categoryTransactions = [];

  // Using for...of loop to iterate through array elements
  for (const transaction of transactions) {
    if (transaction.category === category) {
      categoryTransactions.push(transaction);
    }
  }

  return categoryTransactions;
}

// Get statistics per category using for...in loop
// The for...in loop is used to iterate over the keys of an object.
function getCategoryStats() {
  const categoryStats = {};

  // Add all categories to stats with zero values
  predefinedCategories.forEach((category) => {
    categoryStats[category] = { income: 0, expense: 0 };
  });

  // Update with actual transactions
  transactions.forEach((transaction) => {
    if (!categoryStats[transaction.category]) {
      categoryStats[transaction.category] = { income: 0, expense: 0 };
    }

    categoryStats[transaction.category][transaction.type] += transaction.amount;
  });

  // Using for...in loop to iterate through object keys
  for (const category in categoryStats) {
    categoryStats[category].net =
      categoryStats[category].income - categoryStats[category].expense;
  }

  return categoryStats;
}

// Try-catch block for error handling
// Error handling is used to catch and handle errors gracefully, preventing the application from crashing.
function addTransaction(category, type, amount) {
  // Try-catch block for error handling
  try {
    // Validate inputs
    if (!category || category.trim() === "") {
      throw new Error("Please enter a valid category");
    }

    if (!isValidAmount(amount)) {
      throw new Error("Please enter a valid positive amount");
    }

    // Convert amount to number
    const numAmount = parseFloat(amount);

    // Create transaction object
    const transaction = {
      id: generateID(),
      category: category,
      type: type,
      amount: numAmount,
      date: new Date().toISOString()
    };

    // Add to transaction list
    transactions.push(transaction);

    // Update totals
    calculateTotals();

    // Check budget limit
    updateBudgetWarning();

    // Update UI
    updateUI();

    // Save to localStorage
    saveToLocalStorage();

    return transaction;
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
    return null;
  } finally {
    // Clean up the form regardless of success or failure
    document.getElementById("form").reset();
  }
}

// Function for adding loan records
function addLoanRecord(person, type, amount) {
  try {
    // Validate inputs
    if (!person || person.trim() === "") {
      throw new Error("Please enter a valid person name");
    }

    if (!isValidAmount(amount)) {
      throw new Error("Please enter a valid positive amount");
    }

    // Convert amount to number
    const numAmount = parseFloat(amount);

    // Create loan record object
    const loan = {
      id: generateID(),
      person: person,
      type: type,
      amount: numAmount,
      date: new Date().toISOString()
    };

    // Add to loan records list
    loans.push(loan);

    // Update UI
    updateLoanList();

    // Save to localStorage
    saveToLocalStorage();

    return loan;
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
    return null;
  } finally {
    // Clean up the form regardless of success or failure
    document.getElementById("loan-form").reset();
  }
}

// Function expression
const removeTransaction = function (id) {
  try {
    const index = transactions.findIndex(
      (transaction) => transaction.id === id
    );

    if (index === -1) {
      throw new Error("Transaction not found");
    }

    transactions = transactions.filter((transaction) => transaction.id !== id);

    // Update totals
    calculateTotals();

    // Check budget limit
    updateBudgetWarning();

    // Update UI
    updateUI();

    // Save to localStorage
    saveToLocalStorage();

    return true;
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
    return false;
  }
};

// Function for removing loan records
const removeLoanRecord = function (id) {
  try {
    const index = loans.findIndex((loan) => loan.id === id);

    if (index === -1) {
      throw new Error("Loan record not found");
    }

    loans = loans.filter((loan) => loan.id !== id);

    // Update UI
    updateLoanList();

    // Save to localStorage
    saveToLocalStorage();

    return true;
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
    return false;
  }
};

// Arrow function for ID generation
const generateID = () => {
  return Math.floor(Math.random() * 1000000000);
};

// Function to set budget limit
function setBudgetLimit(limit) {
  try {
    if (!isValidAmount(limit)) {
      throw new Error("Please enter a valid positive budget limit");
    }

    budgetLimit = parseFloat(limit);

    // Check if budget is exceeded
    updateBudgetWarning();

    // Display alert with the budget limit
    alert(`Budget limit set to ${formatMoney(budgetLimit)}`);

    // Save to localStorage
    saveToLocalStorage();

    return budgetLimit;
  } catch (error) {
    console.error("Error:", error.message);
    alert(error.message);
    return 0;
  }
}

// DOM Interactions
function updateUI() {
  updateBalance();
  updateTransactionList();
}

function updateBalance() {
  document.getElementById("balance").textContent = formatMoney(balance);
  document.getElementById("money-plus").textContent = `+${formatMoney(
    totals.income
  )}`;
  document.getElementById("money-minus").textContent = `-${formatMoney(
    totals.expense
  )}`;
}

function updateTransactionList() {
  const list = document.getElementById("list");

  // Clear existing list
  list.innerHTML = "";

  // Add all transactions using for...of loop
  for (const transaction of transactions) {
    addTransactionDOM(transaction);
  }
}

function updateLoanList() {
  const loanList = document.getElementById("loan-list");

  // Clear existing list
  loanList.innerHTML = "";

  // Add all loan records
  for (const loan of loans) {
    addLoanRecordDOM(loan);
  }
}

function addTransactionDOM(transaction) {
  // Create list item
  const item = document.createElement("li");

  // Set class based on transaction type
  item.classList.add(transaction.type);

  // Format transaction content with template literals
  item.innerHTML = `
        <span class="category-tag">${transaction.category}</span>
        <span>${formatMoney(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransactionDOM(${
          transaction.id
        })">×</button>
    `;

  document.getElementById("list").appendChild(item);
}

function addLoanRecordDOM(loan) {
  // Create list item
  const item = document.createElement("li");

  // Set class based on loan type
  if (loan.type === "lent" || loan.type === "returned") {
    item.classList.add("income");
  } else {
    item.classList.add("expense");
  }

  // Get descriptive text based on loan type
  let typeText = "";
  switch (loan.type) {
    case "lent":
      typeText = "Lent to";
      break;
    case "borrowed":
      typeText = "Borrowed from";
      break;
    case "returned":
      typeText = "Returned by";
      break;
    case "repaid":
      typeText = "Repaid to";
      break;
  }

  // Format loan content
  item.innerHTML = `
        <span class="loan-details">${typeText} <strong>${
    loan.person
  }</strong></span>
        <span>${formatMoney(loan.amount)}</span>
        <button class="delete-btn" onclick="removeLoanRecordDOM(${
          loan.id
        })">×</button>
    `;

  document.getElementById("loan-list").appendChild(item);
}

// Wrapper functions for DOM event handling
function removeTransactionDOM(id) {
  removeTransaction(id);
}

function removeLoanRecordDOM(id) {
  removeLoanRecord(id);
}

function updateBudgetWarning() {
  const warningElement = document.getElementById("budget-warning");

  if (isBudgetExceeded()) {
    warningElement.classList.remove("hidden");
    // Alert the user if they go over budget
    if (budgetLimit > 0) {
      alert(
        `Warning: You are over your budget limit of ${formatMoney(
          budgetLimit
        )}!`
      );
    }
  } else {
    warningElement.classList.add("hidden");
  }
}

// Utility function to format money
function formatMoney(amount) {
  return `$${amount.toFixed(2)}`;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  // Load data from localStorage first
  loadFromLocalStorage();

  // Form submission event for transactions
  document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const type = document.getElementById("type").value;

    // Add transaction
    addTransaction(category, type, amount);
  });

  // Form submission event for loans
  document.getElementById("loan-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const person = document.getElementById("person-name").value;
    const amount = document.getElementById("loan-amount").value;
    const type = document.getElementById("loan-type").value;

    // Add loan record
    addLoanRecord(person, type, amount);
  });

  // Set budget event
  document.getElementById("set-budget").addEventListener("click", function () {
    const budgetAmount = document.getElementById("budget-amount").value;
    setBudgetLimit(budgetAmount);
  });

  // Only add sample transactions if there's no data already
  if (transactions.length === 0) {
    // Add sample transactions
    addTransaction("Salary", "income", 3000);
    addTransaction("Rent", "expense", 1000);
    addTransaction("Food", "expense", 300);
    addTransaction("Utilities", "expense", 150);
    addTransaction("Freelance", "income", 500);
  }

  // Only add sample loan records if there's no data already
  if (loans.length === 0) {
    // Add sample loan records
    addLoanRecord("John", "lent", 200);
    addLoanRecord("Sarah", "borrowed", 100);
  }
});
