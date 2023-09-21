function validateName() {
    const nameInput = document.getElementById('name'); // Get the element using document.getElementById
    const nameValue = nameInput.value.trim();
    const nameError = document.getElementById('nameError'); // Similarly, get the error element

    if (nameValue === '') {
        nameError.textContent = 'Namn är obligatoriskt';
    } else {
        nameError.textContent = '';
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email'); // Get the element using document.getElementById
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError'); // Similarly, get the error element

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (emailValue === '') {
        emailError.textContent = 'E-postadress är obligatorisk';
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'Ogiltig e-postadress';
    } else {
        emailError.textContent = '';
    }
}

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);

// Kör valideringen när sidan laddas
validateName();
validateEmail();