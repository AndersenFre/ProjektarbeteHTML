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
const popup = () => {
    const popups = document.querySelectorAll(".popup");
    for (let i=0; i<popups.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = popups[i].getBoundingClientRect().top;
        const elementVisible = 50; 
        
        if (elementTop < windowHeight - elementVisible) {
            popups[i].classList.add("active");
        } 
        else { 
            popups[i].classList.remove("active");
        } 
    } 
}
window.addEventListener("scroll", popup); 

// JavaScript kod för bildspelsnavigation
const images = document.querySelectorAll('.gallery-image');
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
let currentIndex = 0;
//Om indexet är samma som bilden ska den visas (block) annars ska den ej visas (none) loopar igenom index med en for each-loop
function showImage(index) {
    images.forEach((img, i) => {
        img.style.display = i === index ? 'block' : 'none';
    });
}
//Kontrollerar så index inte överskrider image.lenght
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});
//Kontrollerar så index inte underskrider image.lenght
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});
// Visar bilden när sidan laddas in 
showImage(currentIndex);
