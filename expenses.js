// Initial data setup
const expensesData = [
  { name: 'espresso', price: 45, currency: 'PLN', category: 'food', date: '2022-07-16' },
  { name: 'whole grain bread', price: 10, currency: 'PLN', category: 'food', date: '2022-08-03' },
  { name: 'gouda cheese', price: 25, currency: 'PLN', category: 'food', date: '2022-08-03' },
  { name: 'diesel fuel', price: 350, currency: 'PLN', category: 'car', date: '2022-08-14' },
  { name: 'sourdough bread', price: 10, currency: 'PLN', category: 'food', date: '2022-09-01' },
  { name: 'prosciutto ham', price: 16, currency: 'PLN', category: 'food', date: '2022-09-01' },
  { name: 'organic butter', price: 7, currency: 'PLN', category: 'food', date: '2022-09-10' },
  { name: 'unleaded fuel', price: 330, currency: 'PLN', category: 'car', date: '2022-09-10' },
  { name: 'full service car wash', price: 75, currency: 'PLN', category: 'car', date: '2022-09-10' }
];
let filteredData = expensesData;
let currentPage = 1;

// DOM elements for table, pagination and input fields
const increasePageBtn = document.querySelector('#increase-page');
const decreasePageBtn = document.querySelector('#decrease-page');
const fromDateInput = document.querySelector('#from-input');
const toDateInput = document.querySelector('#to-input');
const categoryPlaceholder = document.querySelector('#category-placeholder')
const categoryCancel = document.querySelector('#category-cancel')
const productNameInput = document.querySelector('#product-name-input')
const productNameCancel = document.querySelector('#product-name-cancel')
const table = document.querySelector('.table');

// Function to render data
const renderData = (data, currentPage) => {
  // Reset pagination
  increasePageBtn.disabled = false;
  decreasePageBtn.disabled = false;

  // Remove any existing rows created by this function before rendering again table
  const dynamicRows = document.querySelectorAll('.dynamic-row');
  dynamicRows.forEach(row => row.remove());

  const totalLength = data.length;

  // If data length is more than 5, slice it according to the current page
  if (data.length > 5) {
    data = data.slice((currentPage - 1) * 5, currentPage * 5);

    // If the end of data is reached, disable the increasePage button
    if (currentPage * 5 > totalLength) {
      increasePageBtn.disabled = true;
    }

    // If the start of data is reached, disable the decreasePage button
    if (currentPage === 1) {
      decreasePageBtn.disabled = true;
    }
  }

  // Update pagination and data table
  updatePaginationAndTable(data, totalLength);

  // If the total length of data is less than 6, disable pagination buttons
  if (totalLength < 6) {
    increasePageBtn.disabled = true;
    decreasePageBtn.disabled = true;
  }
}

// Function to update pagination and data table
const updatePaginationAndTable = (data, totalLength) => {
  // Update pagination
  const currentResults = document.querySelector('#current-results');
  currentResults.textContent = `${(currentPage - 1) * 5 + 1}-${currentPage * 5 > totalLength ? totalLength : currentPage * 5} of ${totalLength}`;

  // Create table rows for each data entry
  data.forEach((expense) => {
    const tableRowItem = createTableRow(expense);
    table.appendChild(tableRowItem);
  });

  // If no data is available, update the pagination status and disable pagination buttons
  if (!totalLength) {
    currentResults.textContent = `no results`;
    increasePageBtn.disabled = true;
    decreasePageBtn.disabled = true;
  }
}

// Function to create a table row for a given expense
const createTableRow = (expense) => {
  const tableRowItem = document.createElement('tr');
  tableRowItem.className = "mdc-data-table__row dynamic-row";

  const name = document.createElement('th');
  name.className = "mdc-data-table__cell";
  name.scope = 'row';
  name.textContent = expense.name;
  tableRowItem.appendChild(name);

  const price = document.createElement('td');
  price.className = "mdc-data-table__cell mdc-data-table__cell--numeric";
  price.textContent = expense.price;
  tableRowItem.appendChild(price);

  const currency = document.createElement('td');
  currency.className = "mdc-data-table__cell mdc-data-table__cell";
  currency.textContent = expense.currency;
  tableRowItem.appendChild(currency);

  const category = document.createElement('td');
  category.className = "mdc-data-table__cell mdc-data-table__cell";
  category.textContent = expense.category;
  tableRowItem.appendChild(category);

  const date = document.createElement('td');
  date.className = "mdc-data-table__cell mdc-data-table__cell";
  date.textContent = expense.date;
  tableRowItem.appendChild(date);

  return tableRowItem;
}

// Function to filter data based on inputs
const filterData = () => {
  let filteredData = expensesData;

  // Filters
  if (productName) {
    filteredData = filteredData.filter(expense => expense.name.includes(productName));
  }

  if (category) {
    filteredData = filteredData.filter(expense => expense.category === category);
  }

  if (dateFrom) {
    filteredData = filteredData.filter(expense => new Date(expense.date) >= new Date(dateFrom));
  }

  if (dateTo) {
    filteredData = filteredData.filter(expense => new Date(expense.date) <= new Date(dateTo));
  }

  renderData(filteredData, currentPage);
}

// Event listeners for pagination buttons
increasePageBtn.addEventListener('click', () => {
  if (filteredData.length > currentPage * 5) {
    currentPage++;
  }
  filterData();
});

decreasePageBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    increasePageBtn.disabled = false;
  }
  if (currentPage === 1) {
    decreasePageBtn.disabled = true;
  }
  filterData();
});

// Render initial data
renderData(filteredData, currentPage);



// Handling search
// initializing variables
let category = null
let productName = null
let dateFrom = null
let dateTo = null


// adding eventListneres responsible for updating filtering

productNameInput.addEventListener('input', (e) => {
  if (e.target.value) { productNameCancel.classList.add('icon-active') } else { productNameCancel.classList.remove('icon-active') }
  productName = e.target.value

  filterData()
})


productNameCancel.addEventListener('click', () => {
  productNameInput.value = ''
  productName = ''
  productNameCancel.classList.remove('icon-active')
  filterData()

})

// MDC elements JS logic
document.addEventListener('DOMContentLoaded', function () {
  const select = new mdc.select.MDCSelect(document.querySelector('.mdc-select'));
  const selectDiv = document.querySelector('.mdc-select')

  categoryCancel.addEventListener('click', () => {
    categoryCancel.classList.remove('icon-active')
    category = null
    categoryPlaceholder.textContent = category
    select.value = null
    currentPage = 1
    filterData()
  })
  select.listen('MDCSelect:change', (e) => {
    categoryCancel.classList.add('icon-active')
    category = select.value
    categoryPlaceholder.textContent = category
    if (!select.value) {
      categoryCancel.classList.remove('icon-active')
    }
    currentPage = 1
    filterData()
  });
});

document.addEventListener('DOMContentLoaded', function () {
  new mdc.textField.MDCTextField(document.querySelector('.mdc-text-field'));
})

fromDateInput.addEventListener('input', (e) => {
  dateFrom = e.target.value;
  filterData();
});

toDateInput.addEventListener('input', (e) => {
  dateTo = e.target.value;
  filterData();
});