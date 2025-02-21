document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector(".btn");
  const transactionNameInput = document.querySelector(".tn");
  const amountInput = document.querySelector(".a");
  const container = document.querySelector(".container");
  const balanceElement = document.querySelector(".two h3");
  const increaseButton = document.querySelector(".increase-btn");
  const decreaseButton = document.querySelector(".decrease-btn");
  let balance = 0;

  const updateBalance = (amount) => {
    balance += amount;
    balanceElement.textContent = `Balance: ${balance} KZT`;
  };

  const saveTransactions = () => {
    const transactions = Array.from(
      document.querySelectorAll(".transaction")
    ).map((transaction) => {
      const [name, amount] = transaction
        .querySelector("span")
        .textContent.split(": ");
      return { name, amount: parseFloat(amount) };
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));
    localStorage.setItem("balance", balance);
  };

  const loadTransactions = () => {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    balance = parseFloat(localStorage.getItem("balance")) || 0;
    balanceElement.textContent = `Balance: ${balance} KZT`;

    transactions.forEach(({ name, amount }) => {
      const transactionElement = document.createElement("div");
      transactionElement.classList.add("transaction");
      transactionElement.innerHTML = `
            <span>${name}: ${amount} KZT</span>
            <button class="delete-btn">Delete</button>
          `;

      container.appendChild(transactionElement);

      transactionElement
        .querySelector(".delete-btn")
        .addEventListener("click", () => {
          container.removeChild(transactionElement);
          updateBalance(-amount);
          saveTransactions();
        });
    });
  };

  addButton.addEventListener("click", () => {
    const name = transactionNameInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if (name && !isNaN(amount) && amount > 0) {
      const transactionElement = document.createElement("div");
      transactionElement.classList.add("transaction");
      transactionElement.innerHTML = `
            <span>${name}: ${amount} KZT</span>
            <button class="delete-btn">Delete</button>
          `;

      container.appendChild(transactionElement);

      updateBalance(amount);

      transactionElement
        .querySelector(".delete-btn")
        .addEventListener("click", () => {
          container.removeChild(transactionElement);
          updateBalance(-amount);
          saveTransactions();
        });

      saveTransactions();

      transactionNameInput.value = "";
      amountInput.value = "";
    } else {
      alert("Please enter valid details");
    }
  });

  increaseButton.addEventListener("click", () => {
    let amount = parseFloat(amountInput.value) || 0;
    amountInput.value = amount + 1;
  });

  decreaseButton.addEventListener("click", () => {
    let amount = parseFloat(amountInput.value) || 0;
    if (amount > 0) {
      amountInput.value = amount - 1;
    }
  });

  loadTransactions();
});
