const personApp = Vue.createApp({
    data() {
        return {
            personer: []
        };
    },
    created() {
        axios.get('personer.json')
            .then((response) => {
                this.personer = response.data;
            })
            .catch((error) => {
                console.error('Error fetching data: ', error);
            });
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


const kundvagnApp = Vue.createApp({
    data() {
        return {
            produkter: [
                ],
            vagn: [],
        };
    },
    created () {
        axios.get('produkter.json')
        .then((response) => {
            this.produkter = response.data;
        })
    },
    computed: {
        vagnTotal() {
            return this.vagn.reduce((total, item) => total + item.pris, 0);
        },
    },
    methods: {
        addToVagn(produkt) {
            this.vagn.push({ titel: produkt.titel, pris: produkt.pris });
        },
        removeFromVagn(index) {
            this.vagn.splice(index, 1);
        },
    },
});

    // Mount the Vue app on the element with id "app"
kundvagnApp.mount('#kundvagnApp');


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
document.addEventListener('DOMContentLoaded', function() {
// Hämta referenser till formulärfälten och felmeddelandeelementen
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
validateName();
validateEmail();
// Lyssna på ändringar i namnfältet
nameInput.addEventListener('input', validateName);

// Lyssna på ändringar i e-postfältet
emailInput.addEventListener('input', validateEmail);

// Validera namnfältet
function validateName() 
{
    const nameValue = nameInput.value;
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
    const emailValue = emailInput.value;
 /* kontrollerar att den angivna eposten använder tillåtna tecken samt att den innehåller krävda tecken.
    framför @ (mellan ^och @) är a-zA-Z0-9._- tillåtna tecken. 
    @ krävs och efter det teckent är a-zA-Z0-9._- tillåtna
    Slutligen krävs en punkt . och här tillåts a-zA-Z i en längd av 2 till 4 tecken ex: .com */
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    //om fältet är tomt visa detta felmedelande
    if (emailValue ==='') 
    {
        emailError.textContent = 'E-postadress är obligatorisk';
    } 
    //om textfältet ej uppfyller de krav vi ställt.
    else if (!emailPattern.test(emailValue)) 
    {
        emailError.textContent = 'Ogiltig e-postadress';
    } 
    //annars så visas inget felmedelande
    else 
    {
        emailError.textContent = '';
    }
}
})

