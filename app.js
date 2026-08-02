const expenseRow = document.querySelector("#expenseRow");
const addBtn = document.querySelector("#addBtn");
const tbody1 = document.querySelector("#tbody1");
const deleteBtn = document.querySelectorAll(".deleteBtn")
const doneBtn = document.querySelectorAll(".doneBtn")
const expenseType = document.querySelectorAll(".expenseType");
const expenseValue = document.querySelectorAll(".expenseValue");
const thead = document.querySelector("#thead");

//adds row when Add button is clicked
addBtn.addEventListener("click", () => {
const clonedNode = expenseRow.cloneNode(true);
clonedNode.querySelectorAll(".expenseType, .expenseValue").forEach(input => {
   input.value = "";
});
tbody1.appendChild(clonedNode);
});


//deletes row that contains Delete button when clicked
tbody1.addEventListener("click", (event) => {
   if (event.target.classList.contains("deleteBtn")) {
    const row = event.target.closest('tr');
    row.remove();
    updateBudget();
   };
});

//updates total of expenses and remaining balance

function updateBudget(){
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
   };
});

thead.addEventListener("input", () => {
   if (event.target.classList.contains("incomeInput")) {
      updateBudget();
   };
});