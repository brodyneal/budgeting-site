const expenseRow = document.querySelector("#expenseRow");
const addBtn = document.querySelector("#addBtn");
const table1 = document.querySelector("#table1");
const deleteBtn = document.querySelectorAll(".deleteBtn")
console.log(deleteBtn.parentNode)

addBtn.addEventListener("click", () => {
const clonedNode = expenseRow.cloneNode(true);
table1.appendChild(clonedNode);
});

table1.addEventListener("click", (event) => {
   if (event.target.classList.contains("deleteBtn")) {
    const row = event.target.closest('tr');
    row.remove();
   };
});