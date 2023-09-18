const personApp = Vue.createApp({
    data(){
        return {
            personer: [
                
            ]
            
        }
    },
    created () {

        axios.get('personer.json')
        .then((response) => {
            this.personer = response.data;
        })
    }
});

personApp.mount('#personApp');

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
produktApp.mount('#produktApp');


// JavaScript code for gallery navigation
//Skapar och sparar bilderna här
const images = document.querySelectorAll('.gallery-image');
//för att visa tidigare bild
const prevButton = document.getElementById('prevBtn');
//för att visa nästa bild
const nextButton = document.getElementById('nextBtn');
//variable för att skapa index som sedan ges till bilderna
let currentIndex = 0;

//Om indexet är samma som bilden ska den visas (block) annars ska den ej visas (none) loopar igenom index med en for each-loop
function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}

//Vid ett klick på den vänstra knappet visas föregående bild
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

//Vid ett klick på den högra knappet visas nästkommande bild
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

// Visar bilden 
showImage(currentIndex);

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
};

// document.addEventListener('DOMContentLoaded', function() 
// {
// new Vue({
//         el: '#app', // Elementet där Vue-appen monteras
//         data:
//         {
//             products: [
//                 { name: 'Produkt 1', price: 10 },
//                 { name: 'Produkt 2', price: 15 },
//             ],
//             cart: [], // Array för att lagra varor i kundvagnen
//         },
//         computed: 
//         {
//             cartTotal() 
//             {
//                 // Beräknar den totala kostnaden av varor i kundvagnen
//                 return this.cart.reduce((total, item) => total + item.price, 0);
//             },
//         },
//         methods: 
//         {
//             addToCart(product) 
//             {
//                 // Lägg till en vara i kundvagnen
//                 this.cart.push({ name: product.name, price: product.price });
//             },
//             removeFromCart(index) 
//             {
//                 // Ta bort en vara från kundvagnen baserat på dess index
//                 this.cart.splice(index, 1);
//             },
//         },
//     });
// });

const kundvagnApp = Vue.createApp({
    data(){
        return{
            products: [
                // { name: 'Produkt 1', price: 10 },
                // { name: 'Produkt 2', price: 15 },
            ],
            // Array för att lagra varor i kundvagnen
            cart: [],
        }
    },
    created () {
        axios.get('products')
        .then((response) => {
            this.products = response.data;
        })
    }
});
produktApp.mount('#kundvagnApp');

const urlParams = new URLSearchParams(window.location.search);

const varde = urlParams.get('varde');

if(varde) {
    console.log('Simon');
}
else {
    console.log('inget medskickat värde');
};