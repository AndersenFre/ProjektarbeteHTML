    const app = Vue.createApp({
        data() {
            return {
                products: [
                    { name: 'Produkt 1', price: 10 },
                    { name: 'Produkt 2', price: 15 },
                ],
                cart: [],
            };
        },
        computed: {
            cartTotal() {
                return this.cart.reduce((total, item) => total + item.price, 0);
            },
        },
        methods: {
            addToCart(product) {
                this.cart.push({ name: product.name, price: product.price });
            },
            removeFromCart(index) {
                this.cart.splice(index, 1);
            },
        },
    });

    // Mount the Vue app on the element with id "app"
    app.mount('#app');

