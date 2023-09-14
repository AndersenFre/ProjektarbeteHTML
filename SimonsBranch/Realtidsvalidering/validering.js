// Hämta referenser till formulärfälten och felmeddelandeelementen
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

// Lyssna på ändringar i namnfältet
nameInput.addEventListener('input', validateName);

// Lyssna på ändringar i e-postfältet
emailInput.addEventListener('input', validateEmail);

// Validera namnfältet
function validateName() {
    const nameValue = nameInput.value.trim();
    if (nameValue === '') {
        nameError.textContent = 'Namn är obligatoriskt';
    } else {
        nameError.textContent = '';
    }
}

// Validera e-postfältet
function validateEmail() {
    const emailValue = emailInput.value.trim();
    //inte helt med på detta men den kolla på tecken
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailValue === '') {
        emailError.textContent = 'E-postadress är obligatorisk';
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = 'Ogiltig e-postadress';
    } else {
        emailError.textContent = '';
    }
}
