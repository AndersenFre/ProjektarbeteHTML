document.addEventListener('DOMContentLoaded', function() 
{
    new Vue
    ({
        el: '#app', // Elementet där Vue-appen monteras
        data:
        {
            products: [
                { name: 'Produkt 1', price: 10 },
                { name: 'Produkt 2', price: 15 },
            ],
            cart: [], // Array för att lagra varor i kundvagnen
        },
        computed: 
        {
            cartTotal() 
            {
                // Beräknar den totala kostnaden av varor i kundvagnen
                return this.cart.reduce((total, item) => total + item.price, 0);
            },
        },
        methods: 
        {
            addToCart(product) 
            {
                // Lägg till en vara i kundvagnen
                this.cart.push({ name: product.name, price: product.price });
            },
            removeFromCart(index) 
            {
                // Ta bort en vara från kundvagnen baserat på dess index
                this.cart.splice(index, 1);
            },
        },
    });
});
