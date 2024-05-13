// Part-A : For Retrieving and display expenses when the page loads we use addEventListener with 'DOMContentLoaded'
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < localStorage.length; i++) { //iterating through local Storage array
        const key = localStorage.key(i);
        const expenseDetails = JSON.parse(localStorage.getItem(key));
        showExpenses(expenseDetails);
    }
});




function handleFormSubmition(event){
    event.preventDefault();

//Part-A--->storing all values in local storage
    //pushing resference of id in a variable
    const expense = document.getElementById('expenses');
    const desc = document.getElementById('description');
    const category = document.getElementById('category');
    
    //storing values of these in object
    const expenseDetails = {
        expense : expense.value,
        desc : desc.value,
        cat : category.value,
    };

    //moving all the values from object to localStorage
    localStorage.setItem(expenseDetails.cat , JSON.stringify(expenseDetails)); //showing item by category

    //calling a function in order to print the data stored in local storage on front page
    showExpenses(expenseDetails);
}



//Part-B ---> Function for showing data of local storage on main page
function showExpenses(expenseDetails){
    
    
       const tableBody = document.querySelector('tbody');

       // Created a new table row
       const row = document.createElement('tr');

       // Created table data cells
       const serialNumberCell = document.createElement('td');
       const amountCell = document.createElement('td');
       const descriptionCell = document.createElement('td');
       const categoryCell = document.createElement('td');
       const actionCell = document.createElement('td');

       //Part-B(1)--->Added content to table data cells whch will be pushed on adding item
       serialNumberCell.textContent = tableBody.childElementCount + 1;
       amountCell.textContent = expenseDetails.expense + ' Rs';
       descriptionCell.textContent = expenseDetails.desc;
       categoryCell.textContent = expenseDetails.cat;

       //Part-B(2)--->Adding Delete button to the list to be printed and then will append final list after deleting also
       const deleteButton = document.createElement('button');
       deleteButton.textContent = 'Delete Expense';
       deleteButton.classList.add('btn', 'btn-danger');
       deleteButton.onclick = () => {
           localStorage.removeItem(expenseDetails.cat);
           row.remove();
        //re initializing number of expenses on editing as it gets removed from list
           renumberExpenses();
       };

       //Part-B(2)--->Adding Edit button to the list to be printed and then will append final list after editing also
       const editButton = document.createElement('button');
       editButton.textContent = 'Edit Expense';
       editButton.classList.add('btn', 'btn-primary');
       editButton.onclick = () => {
           editExpense(expenseDetails, row);
       };

       // Appended buttons to action cell
       actionCell.appendChild(deleteButton);
       actionCell.appendChild(document.createTextNode('\u00A0')); // Add space
       actionCell.appendChild(editButton);

       // Appended all cells to row
       row.appendChild(serialNumberCell);
       row.appendChild(amountCell);
       row.appendChild(descriptionCell);
       row.appendChild(categoryCell);
       row.appendChild(actionCell);

       // Appended row to table body finally
       tableBody.appendChild(row);
}


//Part-C--->Function for editing expense
function editExpense(expenseDetails, listItem) {
    const expense = document.getElementById('expenses');
    const desc = document.getElementById('description');
    const category = document.getElementById('category');

    expense.value = expenseDetails.expense;
    desc.value = expenseDetails.desc;
    category.value = expenseDetails.cat;

    // Remove the item from the list
    listItem.remove();

    // Remove the item from localStorage
    localStorage.removeItem(expenseDetails.cat);

    // re initializing number of expenses on editing as it gets removed from list and then edited and added
    renumberExpenses();
}

// Function to re serialize expenses sl no.
function renumberExpenses() {
    const rows = document.querySelectorAll('#expenseList tr');
    rows.forEach((row, index) => {
        const serialNumberCell = row.querySelector('td:first-child');
        serialNumberCell.textContent = index + 1;
    });
}


