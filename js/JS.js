document.addEventListener("DOMContentLoaded", function () {
    function addToCart(name, price) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ name, price });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(name + " added to cart!");
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let productCard = this.closest(".card-body");
            let name = productCard.querySelector(".product-name").textContent;
            let priceText = productCard.querySelector(".product-price").textContent;
            let price = parseFloat(priceText.replace("$", "").trim());

            addToCart(name, price);
        });
    });

    function loadCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartList = document.getElementById("cart-items");
        let totalPriceElement = document.getElementById("total-price");

        if (cartList) {
            cartList.innerHTML = "";

            let total = 0;

            cart.forEach(item => {
                let li = document.createElement("li");
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartList.appendChild(li);

                total += item.price;
            });

            if (totalPriceElement) {
                totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
            }
        }
    }

    function clearCart() {
        localStorage.removeItem("cart");
        loadCart();
    }

    const clearCartButton = document.getElementById("clear-cart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", clearCart);
    }

    loadCart();
});
