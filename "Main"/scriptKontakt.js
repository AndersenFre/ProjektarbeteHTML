// Koden nedan tillåter en fungerande kundvagnsfunction för kontakt-sidan.
// Två script-dokument behövdes på grund av konflikter med bildspelet. 

// En Vue app för att skapa en kundvagn för våra produkter.
const kundvagnApp = Vue.createApp({
    data() {
        return {
            produkter: [],
            vagn: [],
            cartCount: 0,
            isCartPopupOpen: false,
        };       
    },
    created () {
        axios.get('produkter.json')
        .then((response) => {
            this.produkter = response.data;
        });
    // Skapar savedCart, fyller den data via 'cart' som är nyckel till localStorage.  
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.vagn = JSON.parse(savedCart);
      this.cartCount = this.vagn.length;
    }
   },
    // Funktion som "lyssnar" efter förändringar i array vagn. Reduce itererar genom antal objekt.
    computed: {
        vagnTotal() {
            return this.vagn.reduce((total, item) => total + item.pris, 0);
        },
    },
    // Funktioner för att lägga till och ta bort objekt i array vagn.
    methods: {
        addToVagn(produkt) {
            this.vagn.push({ titel: produkt.titel, pris: produkt.pris });
            this.cartCount++;
            this.saveCartToLocalStorage();

        },
        removeFromVagn(index) {
            this.vagn.splice(index, 1);
            if (this.cartCount > 0)
            {
                this.cartCount--;
            }
            this.saveCartToLocalStorage();
        },
        // LocalStorage sparar bara string.
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.vagn));
        },
        openCartWindow() {
            const cartWindow = document.getElementById('cartWindow');
            cartWindow.style.display = 'block';
        },
        closeCartWindow() {
            const cartWindow = document.getElementById('cartWindow');
            cartWindow.style.display = 'none';
        },
    },
});
kundvagnApp.mount('#kundvagnApp');

// Hämta referenser till formulärfälten och felmeddelandeelementen
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const numberInput = document.getElementById('number');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const numberError = document.getElementById('numberError');

//Köra valideringen när sidan laddas in första gången
validateName();
validateEmail();
validateNumber();

// Lyssna på ändringar i fälten.
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);
numberInput.addEventListener('input', validateNumber);
// Validera namnfältet
function validateName() 
{
    const nameValue = nameInput.value.trim();
    if (nameValue === '') 
    {
        nameError.textContent = 'Namn är obligatoriskt';
    } 
    else 
    {
        nameError.textContent = '';
    }
}
// Validera e-postfältet
function validateEmail() 
{
    const emailValue = emailInput.value.trim();
 /* kontrollerar att den angivna eposten använder tillåtna tecken samt att den innehåller krävda tecken.*/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailValue === '') 
    {
        emailError.textContent = 'E-postadress är obligatorisk';
    } 
    else if (!emailPattern.test(emailValue))
    {
        emailError.textContent = 'Ogiltig e-postadress';
    } 
    else 
    {
        emailError.textContent = '';
    }
}
//Validera telefonnummer
function validateNumber()
{   
    const numberValue = numberInput.value.trim();
    const numberPattern = /^[0-9]{10}$/; 
    if (numberValue === '') 
    {
        numberError.textContent = 'Telefonnummer är obligatoriskt';
    } 
    else if (!numberPattern.test(numberValue))
    {
        numberError.textContent = 'Ogiltigt telefonnummer';
    }
    else
    {
        numberError.textContent = '';
    }
}
