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

// Tillåter Vue att genom mount förändra HTML-element med ID 'personApp'.
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
// Tillåter Vue att genom mount förändra HTML-element med ID 'produktApp'.
produktApp.mount('#produktApp');


const kundvagnApp = Vue.createApp({
    data() {
        return {
            produkter: [],
            vagn: [],
            cartCount: 0,
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
        }
    },
});
// Tillåter Vue att genom mount förändra HTML-element med ID 'kundvagnApp'.
kundvagnApp.mount('#kundvagnApp');

// JavaScript kode för bildspelsnavigation
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

//Vid ett klick på den högra knappet visas nästkommande bild
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

//Vid ett klick på den vänstra knappet visas föregående bild
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});



// Visar bilden 
showImage(currentIndex);
