
const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");
const emptyMessage = document.getElementById("emptyMessage");

let expenses = [];
let nextId = 1;

function formatRupees(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR"
    });
}

function renderExpenses() {
    expenseList.replaceChildren();

    const total = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    totalDisplay.textContent = formatRupees(total);
    emptyMessage.hidden = expenses.length > 0;

    expenses.forEach((expense) => {
        const item = document.createElement("li");
        item.className = "expense-item";

        const details = document.createElement("div");
        details.className = "expense-details";

        const name = document.createElement("strong");
        name.textContent = expense.name;

        const category = document.createElement("small");
        category.textContent = expense.category;

        details.append(name, category);

        const right = document.createElement("div");
        right.className = "expense-right";

        const amount = document.createElement("strong");
        amount.textContent = formatRupees(expense.amount);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", () => {
            expenses = expenses.filter(
                (entry) => entry.id !== expense.id
            );
            renderExpenses();
        });

        right.append(amount, deleteButton);
        item.append(details, right);
        expenseList.appendChild(item);
    });
}

expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(amountInput.value);
    const category = categoryInput.value;

    if (!name || !Number.isFinite(amount) || amount <= 0 || !category) {
        alert("Please enter a valid name, amount, and category.");
        return;
    }

    expenses.push({
        id: nextId++,
        name,
        amount,
        category
    });

    expenseForm.reset();
    renderExpenses();
});

renderExpenses();
