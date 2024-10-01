let expenses = [];

// Function to add a new expense
function addExpense() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;

  if (description === '' || isNaN(amount) || amount <= 0) {
    alert('Please enter valid expense details.');
    return;
  }

  const expense = {
    description,
    amount,
    category
  };

  expenses.push(expense);
  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';

  updateExpenseTable();
  updateSummary();
}

// Function to update the expense table
function updateExpenseTable() {
  const tableBody = document.getElementById('expenseTableBody');
  tableBody.innerHTML = '';

  expenses.forEach(expense => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.description}</td>
      <td>$${expense.amount.toFixed(2)}</td>
      <td>${expense.category}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Function to update the spending summary
function updateSummary() {
  const summaryElement = document.getElementById('summary');
  summaryElement.innerHTML = '';

  const totals = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.amount;
    return acc;
  }, {});

  for (const category in totals) {
    const div = document.createElement('div');
    div.textContent = `${category}: $${totals[category].toFixed(2)}`;
    summaryElement.appendChild(div);
  }
}
