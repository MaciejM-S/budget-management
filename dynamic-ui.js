// Selecting elements from the DOM
const fromLabel = document.querySelector('#from-label');
const fromInput = document.querySelector('#from-input');
const toLabel = document.querySelector('#to-label');
const toInput = document.querySelector('#to-input');
let line1 = document.getElementById("line1");
let line2 = document.getElementById("line2");
let line3 = document.getElementById("line3");
let mobileNav = document.querySelector('#nav-mobile')
const label = document.querySelector('.mdc-floating-label');
const input = document.querySelector('.mdc-text-field__input');

// Function to handle focus event
const handleFocus = (inputElem, labelElem, className) => {
    inputElem.addEventListener('focus', function () {
        labelElem.classList.add(className);
    });
};

// Function to handle blur event
const handleBlur = (inputElem, labelElem, className) => {
    inputElem.addEventListener('blur', function () {
        if (inputElem.value === '') {
            labelElem.classList.remove(className);
        }
    });
};

handleFocus(input, label, 'input-focused');
handleBlur(input, label, 'input-focused');
handleFocus(fromInput, fromLabel, 'floating');
handleBlur(fromInput, fromLabel, 'floating');
handleFocus(toInput, toLabel, 'floating');
handleBlur(toInput, toLabel, 'floating');

// Function to handle label click
const handleLabelClick = (labelElem, inputElem) => {
    labelElem.addEventListener('click', function () {
        inputElem.focus();
    });
};

handleLabelClick(fromLabel, fromInput);
handleLabelClick(toLabel, toInput);

// Function to get date in yyyy-mm-dd format
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};

// Updating date inputs to prompt/pickup default the earliest expanses date
let earliestDate = expensesData.reduce((earliest, expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate < earliest ? expenseDate : earliest;
}, new Date());
fromDateInput.value = formatDate(earliestDate);

// Updating date inputs to prompt/pickup default the latest expanses date
let latestDate = expensesData.reduce((latest, expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate > latest ? expenseDate : latest;
}, new Date(0)); 
toDateInput.value = formatDate(latestDate);

let colorState = true;

const changeLineColor = (color, delay) => {
    setTimeout(() => line3.style.backgroundColor = color, delay);
    setTimeout(() => line2.style.backgroundColor = color, delay + 50);
    setTimeout(() => line1.style.backgroundColor = color, delay + 100);
}

const handleMobileNav = () => {
    if (colorState) {
        changeLineColor("#fff", 50);
        mobileNav.classList.add('active', 'show');
    } else {
        changeLineColor("#000", 50);
        mobileNav.classList.remove('active', 'show');
    }
    colorState = !colorState;
}

document.getElementById("burger").addEventListener("click", handleMobileNav);

const mobileTabs = [...document.getElementsByClassName('mobile-nav-item')];

mobileTabs.forEach(tab => tab.addEventListener("click", handleMobileNav));