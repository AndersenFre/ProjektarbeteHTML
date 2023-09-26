// En Vue app för att hämta information om personal från JSON
const personApp = Vue.createApp({
    data(){
        return {
            personer: []            
        }
    },
    created () {

        axios.get('personer.json')
        .then((response) => {
            this.personer = response.data;
        })
    }
});
// Tillåter Vue att genom mount förändra HTML-element med ID 'personApp'.
personApp.mount('#personApp');

// En Vue app för att hämta information om produkter från JSON
const produktApp = Vue.createApp({
    data(){
        return{
            produkter: []
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

// En Vue app för att hämta information om personal från JSON
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
// Tillåter Vue att genom mount förändra HTML-element med ID 'InfoApp'.
infoApp.mount('#infoApp');
// En Vue app för att hämta information om personal från JSON
const projectApp = Vue.createApp({
    data(){
        return {
            EmployeeProjects: []            
        }
    },
    created () {

        axios.get('EmployeeProjects.json')
        .then((response) => {
            this.EmployeeProjects = response.data;
        })
    }
});
projectApp.mount('#projectApp');
// En Vue app för att skapa en kundvagn för våra produkter.
// Hämtar produkter med axios --> Möjliggör dessa att läggas i kundvagnen
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
    // Om savedCart har värde, spara savedCart i vår array vagn. 
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
        // Omvandlar innehållet i vagn till JSON string, 
        // iom att localStorage bara sparar string.
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
// Tillåter Vue att genom mount förändra HTML-element med ID 'kundvagnApp'.
kundvagnApp.mount('#kundvagnApp');


//Koden ovanför tillåter en fungerande kundvagnsfunction för våran sida
//Här är koden för själva realtidsvalideringen
//Denna kod är separerad från script.js för den krockade med bildspelet


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

// Lyssna på ändringar i namnfältet
nameInput.addEventListener('input', validateName);

// Lyssna på ändringar i e-postfältet
emailInput.addEventListener('input', validateEmail);

numberInput.addEventListener('input', validateNumber);

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
    } 
    else if (!emailPattern.test(emailValue)) 
    //om textfältet ej uppfyller de krav vi ställt.
    {
        emailError.textContent = 'Ogiltig e-postadress';
    //ananrs så visas inget felmedelande
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

    const numberPattern = /^[0-9+]{10,12}$/; 

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
