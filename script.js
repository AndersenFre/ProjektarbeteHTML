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
