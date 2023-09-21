const produktApp = Vue.createApp({
    data(){
        return{
            produkter: [

            ]
        }
    },
    created () {
        axios.get('produkter.json')
        .then((response) => {
            this.produkter = response.data;
        })
    }
});
// Tillåter Vue att genom mount förändra HTML-element med ID 'produktApp'.
produktApp.mount('#produktApp');

const infoApp = Vue.createApp({
    data(){
        return{
            foretagsInfo: []
        }
    },
    created () {
        axios.get('foretagsInfo.json')
        .then((response) => {
            this.foretagsInfo = response.data;
        })
    }
});
infoApp.mount('#infoApp');

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
       
    // Skapar savedCart, fyller den med cart som är localStorage. 
    // Om savedCart har värde, spara savedCart i array vagn. 
    // Sätter cartCount som längden av array vagn. 
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.vagn = JSON.parse(savedCart);
      this.cartCount = this.vagn.length;
    }
   },
    // Funktion som "lyssnar" efter förändringar i array vagn.
    // Reduce itererar genom antal objekt i array samt sammanställer antal, 
    // pris per objekt samt totalpris i vagn. 
    computed: {
        vagnTotal() {
            return this.vagn.reduce((total, item) => total + item.pris, 0);
        },
    },
    // Funktioner för att lägga till och ta bort objekt i array vagn.
    // Uppdaterar cartCount som syns i meny så rätt antal visas.
    // Validerar så att cartCount inte kan bli ett negativt värde. 
    // Uppdaterar även Storage Item med nyckel 'cart' i localStorage.
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
        // Sparar till localStorage.
        // Skapar ett Storage Item med nyckel 'cart'.
        // Omvandlar innehållet i vagn till JSON string, iom att localStorage bara sparar string.
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.vagn));
        },
        openCartWindow() {
            // Kopiera
            const cartWindow = document.getElementById('cartWindow');
            cartWindow.style.display = 'block';
        },
        closeCartWindow() {
            // Kopiera
            const cartWindow = document.getElementById('cartWindow');
            cartWindow.style.display = 'none';
        },
    },
});
// Tillåter Vue att genom mount förändra HTML-element med ID 'kundvagnApp'.
kundvagnApp.mount('#kundvagnApp');
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
