const expenseRow = document.querySelector(".expenseRow");
const addBtn = document.querySelector("#addBtn");
const tbody1 = document.querySelector("#tbody1");
const deleteBtn = document.querySelectorAll(".deleteBtn")
const doneBtn = document.querySelectorAll(".doneBtn")
const expenseType = document.querySelector(".expenseType");
const expenseValue = document.querySelector(".expenseValue");
const thead = document.querySelector("#thead");

//adds row when Add button is clicked
addBtn.addEventListener("click", () => {
const clonedNode = expenseRow.cloneNode(true);
clonedNode.querySelectorAll(".expenseType, .expenseValue").forEach(input => {
   input.value = "";
});
tbody1.appendChild(clonedNode);
saveExpenses();
});


//deletes row that contains Delete button when clicked
tbody1.addEventListener("click", (event) => {
   if (event.target.classList.contains("deleteBtn")) {
    const row = event.target.closest('tr');
    row.remove();
    updateBudget();
    saveExpenses();
   };
});

//updates total of expenses and remaining balance

function updateBudget () {
   const income = Number(document.querySelector(".incomeInput").value) || 0;
   let total = 0;
   document.querySelectorAll(".expenseValue").forEach(input => {
     total += Number(input.value) || 0;
   });
      const balance = income - total;
   document.querySelector("#totalAmount").textContent = total.toFixed(2);
   document.querySelector("#balance").textContent = balance.toFixed(2);
}

tbody1.addEventListener("input", () => {
   if (event.target.classList.contains("expenseValue")) {
      updateBudget();
      saveExpenses();
      };
      if (event.target.classList.contains("incomeInput")) {
      updateBudget();
   };
});

//saves all input fields on refresh in some frustrating way

function saveIncome () {
   const income = document.querySelector(".incomeInput").value;
   sessionStorage.setItem("income", income);
};

document.querySelector(".incomeInput").addEventListener("input", () => {
   saveIncome();
   updateBudget();
})


function saveExpenses () {
   const expenses = [];
   document.querySelectorAll(".expenseRow").forEach(row => {
      expenses.push({
         type: row.querySelector(".expenseType").value,
         amount: row.querySelector(".expenseValue").value
      });
   });
   sessionStorage.setItem("expenses", JSON.stringify(expenses));
};


function loadIncome () {
const savedIncome = sessionStorage.getItem("income");

if (savedIncome !== null){
   document.querySelector(".incomeInput").value = savedIncome;
};
};
const savedExpense = JSON.parse(sessionStorage.getItem("expenses"));

function loadExpenses () {
   const savedExpenses = JSON.parse(sessionStorage.getItem("expenses")) || [];

   expenseRow.querySelector(".expenseType").value = savedExpenses[0].type;
   expenseRow.querySelector(".expenseValue").value = savedExpenses[0].amount;
   
   for (let i = 1; i < savedExpenses.length; i++) {
      const clonedNode = expenseRow.cloneNode(true);

      clonedNode.querySelector(".expenseType").value = savedExpenses[i].type;
      clonedNode.querySelector(".expenseValue").value = savedExpenses[i].amount;

      tbody1.appendChild(clonedNode);
   };
   updateBudget();
};

loadIncome();
loadExpenses();
updateBudget();