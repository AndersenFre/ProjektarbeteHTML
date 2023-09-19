// Hämta referenser till formulärfälten och felmeddelandeelementen
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');

//Köra valideringen när sidan laddas in första gången
validateName();
validateEmail();

// Lyssna på ändringar i namnfältet
nameInput.addEventListener('input', validateName);

// Lyssna på ändringar i e-postfältet
emailInput.addEventListener('input', validateEmail);

// Validera namnfältet
function validateName() 
{
    const nameValue = nameInput.value.trim();
    if (nameValue === '') 
    {
        nameError.textContent = 'Namn är obligatoriskt';
    } else 
    {
        nameError.textContent = '';
    }
}

// Validera e-postfältet
function validateEmail() 
{
    const emailValue = emailInput.value.trim();
 /* kontrollerar att den angivna eposten använder tillåtna tecken samt att den innehåller krävda tecken.
    framför @ (mellan ^och @) är a-zA-Z0-9._- tillåtna tecken. 
    @ krävs och efter det teckent är a-zA-Z0-9._- tillåtna
    Slutligen krävs en punkt . och här tillåts a-zA-Z i en längd av 2 till 4 tecken ex: .com */
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    //om fältet är tomt visa detta felmedelande
    if (emailValue === '') 
    {
        emailError.textContent = 'E-postadress är obligatorisk';
    } else if (!emailPattern.test(emailValue)) 
    //om textfältet ej uppfyller de krav vi ställt.
    {
        emailError.textContent = 'Ogiltig e-postadress';
    //ananrs så visas inget felmedelande
    } else 
    {
        emailError.textContent = '';
    }
}

