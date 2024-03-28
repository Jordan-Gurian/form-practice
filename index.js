function showEmailError() {
    if (email.validity.valueMissing) {
        errorMsg.textContent = 'Fill in email';
    } 
    else if (email.validity.typeMismatch) {
        errorMsg.textContent = 'Email must have text, @, text, ., text pattern'
    }
    else if (email.validity.tooShort) {
        errorMsg.textContent = 'Email must be 8 or more characters'
    }
    errorMsg.classList.add('active');
}

const email = document.querySelector('#mail');
const errorMsg = document.querySelector('span.email');

email.addEventListener('input', () => {
    if (email.validity.valid) {
        errorMsg.textContent = '';
        errorMsg.classList.remove('active');
    } else {
        showEmailError();
    }
})

const country = document.querySelector('#country');
const zip = document.querySelector('#zip');

const constraints = {
    ch: [
        '^(CH-)?\\d{4}$',
        'Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950',
    ],
};

function checkZip() {
    const countryCode = country.value;
    const errorMsg = document.querySelector('span.zip');
    constraintRegExp = new RegExp(constraints[countryCode][0], '');
    if (zip.validity.valueMissing) {
        errorMsg.textContent = 'Must input zip';
        errorMsg.classList.add('active');
        zip.setCustomValidity('Wrong format')
    }
    else if (constraintRegExp.test(zip.value)) {
        errorMsg.textContent = '';
        errorMsg.classList.remove('active');
        zip.setCustomValidity('')
    } else {
        errorMsg.textContent = `${constraints[countryCode][1]}`;
        errorMsg.classList.add('active');
        zip.setCustomValidity('Wrong format')
    }
}

zip.addEventListener('input', () => {
    checkZip();
})


const password = document.querySelector('#password');

function includesNum() {
    const check = new RegExp('(?=.*[0-9])', '');
    if (check.test(password.value)) {
        return true;
    }
    return false;
}

function includesSpecial() {
    const check = new RegExp('(?=.*[!@#$%^&*])', '');
    if (check.test(password.value)) {
        return true;
    }
    return false;
}

function includesLower() {
    const check = new RegExp('(?=.*[a-z])', '');
    if (check.test(password.value)) {
        return true;
    }
    return false;
}

function includesUpper() {
    const check = new RegExp('(?=.*[A-Z])', '');
    if (check.test(password.value)) {
        return true;
    }
    return false;
}

function correctLength() {
    const check = new RegExp('^([a-zA-Z0-9!@#$%^&*]{8,16})$', '');
    if (check.test(password.value)) {
        return true;
    }
    return false;
}

function checkPassword() {
    const errorMsg = document.querySelector('span.password');
    if (password.validity.valueMissing) {
        errorMsg.classList.add('active');
        errorMsg.textContent = 'Must enter password';
        password.setCustomValidity('Must enter password');        
    }
    else if (!correctLength()) {
        errorMsg.classList.add('active');
        errorMsg.textContent = 'Must be 8 - 16 characters';
        password.setCustomValidity('Must be 8 - 16 characters')
    }
    else if (!includesUpper()) {
        errorMsg.classList.add('active');
        errorMsg.textContent = 'Must include uppercase';
        password.setCustomValidity('Must include uppercase')
    }
    else if (!includesLower()) {
        errorMsg.classList.add('active');
        errorMsg.textContent = 'Must include lowercase';
        password.setCustomValidity('Must include lowercase')
    } 
    else if (!includesSpecial()) {
        errorMsg.classList.add('active');
        errorMsg.textContent = 'Must include special character';
        password.setCustomValidity('Must include special character')
    }
    else if (!includesNum()) {
        errorMsg.classList.add('active');
        errorMsg.textContent = 'Must include number';
        password.setCustomValidity('Must include number')
    } else {
        errorMsg.classList.remove('active');
        errorMsg.textContent = '';
        password.setCustomValidity('')
    }
}

password.addEventListener('input', () => {
    checkPassword();
});

const confirmation = document.querySelector('#confirmation');

function checkConfirm() {
    const errorMsg = document.querySelector('span.confirmation');
    if (password.value === confirmation.value) {
        errorMsg.classList.remove('active');
        errorMsg.textContent = '';
        confirmation.setCustomValidity('')
    } else {
        errorMsg.classList.add('active');
        errorMsg.textContent = 'Passwords must match';
        confirmation.setCustomValidity('Passwords must match')
    }
}

confirmation.addEventListener('input', () => {
    checkConfirm();
})


const form = document.querySelector('form');


function isActiveErrorPresent() {
    const activeErrors = document.querySelector('.active');
    const submitSpan = document.querySelector('span.submit');
    if (activeErrors && activeErrors != submitSpan) {
        return true;
    }
    return false;
}

form.addEventListener('submit', (event) => {
    const errorMsg = document.querySelector('span.submit');
    if (isActiveErrorPresent()) {
        event.preventDefault();
        errorMsg.textContent = 'Cannot submit with invalid inputs';
        errorMsg.classList.add('active');
    } else {
        errorMsg.textContent = 'You good';
        errorMsg.classList.remove('active');
    }
});

window.onload = () => {
    showEmailError();
    checkZip();
    checkPassword();
};