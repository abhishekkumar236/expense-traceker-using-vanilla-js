document.addEventListener("DOMContentLoaded", function () {
  const expenseList = document.getElementById("expenseList");
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense, index) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${expense.category}</td>
          <td>${expense.amount}</td>
          <td>${expense.description}</td>
          <td><button class="btn btn-primary edit-btn" data-index="${index}">Edit</button></td>
          <td><button class="btn btn-danger delete-btn" data-index="${index}">Delete</button></td>
        `;
      expenseList.appendChild(newRow);
    });

    // Add event listeners for edit and delete buttons
    const editButtons = document.querySelectorAll(".edit-btn");
    const deleteButtons = document.querySelectorAll(".delete-btn");

    editButtons.forEach((button) => {
      button.addEventListener("click", handleEdit);
    });

    deleteButtons.forEach((button) => {
      button.addEventListener("click", handleDelete);
    });
  }

  renderExpenses();

  function handleEdit(e) {
    const index = e.target.dataset.index;
    const selectedExpense = expenses[index];

    document.getElementById("expense").value = selectedExpense.amount;
    document.getElementById("description").value = selectedExpense.description;
    document.getElementById("categories").value = selectedExpense.category;

    document.getElementById("expenseForm").classList.add("editing");
    document.getElementById("expenseForm").dataset.editIndex = index;
  }

  function handleDelete(e) {
    const index = e.target.dataset.index;
    expenses.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }

  document
    .getElementById("expenseForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const expense = document.getElementById("expense").value;
      const description = document.getElementById("description").value;
      const category = document.getElementById("categories").value;

      if (category !== "Select the category of expense") {
        const newExpense = {
          category,
          amount: expense,
          description,
        };

        if (
          document.getElementById("expenseForm").classList.contains("editing")
        ) {
          const editIndex =
            document.getElementById("expenseForm").dataset.editIndex;
          expenses[editIndex] = newExpense;
          document.getElementById("expenseForm").classList.remove("editing");
          delete document.getElementById("expenseForm").dataset.editIndex;
        } else {
          expenses.push(newExpense);
        }

        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();
        document.getElementById("expenseForm").reset();
      }
    });
});
