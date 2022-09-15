//! get dom elements
const incomeInputEl = document.getElementById('income-input');
const foodInputEl = document.getElementById('food-input');
const rentInputEl = document.getElementById('rent-input');
const clothsInputEl = document.getElementById('cloths-input');
const errorCalcEl = document.getElementById('error-calculate');
const errorSaveEl = document.getElementById('error-saving');
const calcBtn = document.getElementById('calc-btn');
const totalExpEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');
const savePercentEl = document.getElementById('save-percent');
const saveAmountEl = document.getElementById('saving-amount');
const remainingBlcEl = document.getElementById('remaining-balance');
const saveBtn = document.getElementById('save-btn');

//! input validate
function validInput(value) {
    if (value != 'Save') {
        totalExpEl.innerText = '0';
        balanceEl.innerText = '0';
        errorCalcEl.innerText = `${value} amount invalid`;
    } else {
        errorSaveEl.innerText = `${value} amount invalid`;
    }
}

//! reset save amount
function resetAmount() {
    saveAmountEl.innerText = 0;
    remainingBlcEl.innerText = 0;
}

//! calculate expense
function expenseCalc() {
    const income = parseFloat(incomeInputEl.value);
    const foodExp = parseFloat(foodInputEl.value);
    const rentExp = parseFloat(rentInputEl.value);
    const clothsExp = parseFloat(clothsInputEl.value);
    let totalExp = null;
    let balance = null;
    resetAmount();
    if (foodExp > 0 && rentExp > 0 && clothsExp > 0 && income > 0) {
        totalExp = foodExp + rentExp + clothsExp;
        if (income > totalExp) {
            balance = income - totalExp;
            totalExpEl.innerText = totalExp;
            balanceEl.innerText = balance;
            incomeInputEl.value = '';
            foodInputEl.value = '';
            rentInputEl.value = '';
            clothsInputEl.value = '';
            errorCalcEl.innerText = '';
        } else {
            validInput('Insufficient Income');
            console.log('insufficient');
        }

    } else if (income < 0 || isNaN(income)) {
        validInput('Income');
    } else if (foodExp < 0 || isNaN(foodExp)) {
        validInput('Food');
    } else if (rentExp < 0 || isNaN(rentExp)) {
        validInput('Rent');
    } else if (clothsExp < 0 || isNaN(clothsExp)) {
        validInput('Cloths');
    }

}

calcBtn.addEventListener('click', function () {
    expenseCalc();
})

//! calculate savings
function savingCalc() {
    const savePercent = parseFloat(savePercentEl.value);
    const balance = parseFloat(balanceEl.innerText);
    let savingAmount = 0;
    if (savePercent > 0 && savePercent < 100) {
        savingAmount = (balance * savePercent) / 100;
        savePercentEl.value = '';
        errorSaveEl.innerText = '';
    } else if (savePercent < 0 || savePercent > 100 || isNaN(savePercent)) {
        validInput('Save');
        resetAmount();
    }
    saveAmountEl.innerText = savingAmount.toFixed(2);
    remainingBlcEl.innerText = (balance - savingAmount).toFixed(2);
}

saveBtn.addEventListener('click', function () {
    savingCalc();
})