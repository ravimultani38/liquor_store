document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/products")
        .then((response) => response.json())
        .then((products) => {
            const productsContainer = document.getElementById("products");
            products.forEach((product) => {
                const productElement = document.createElement("div");
                productElement.classList.add("col", "s12", "m6", "l4");

                productElement.innerHTML = `
                    <div class="card product-card">
                        <div class="card-image">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${product.name}</span>
                            <p>${product.description}</p>
                            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                            <button class="btn waves-effect waves-light add-to-cart" data-product='${JSON.stringify(product)}'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
  <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z"/>
  <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
</svg> Add to Cart</button>
                        </div>
                    </div>
                `;

                productsContainer.appendChild(productElement);
            });

            const addToCartButtons = document.querySelectorAll(".add-to-cart");
            const done = document.querySelector(".done");
            let added = false;
            addToCartButtons.forEach((button) => {
                button.addEventListener("click", (event) => {
                    const product = JSON.parse(event.target.dataset.product);
                    addToCart(product);
                    console.log(added);
                    if (added) {
                        done.style.transform = "translate(-110%) skew(-40deg)";
                        added = false;
                    } else {
                        done.style.transform = "translate(0px)";
                        added = true;
                    }
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });

    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        added = true;
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) {
            cartCountElement.textContent = cart.length;
        }
    }

    updateCartCount();

    if (window.location.pathname.endsWith("cart.html")) {
        const cartItemsContainer = document.getElementById("cart-items");
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        let total = 0;
         
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item) => {

                total += item.price;
                const cartItemElement = document.createElement("div");
                cartItemElement.classList.add("card");
                cartItemElement.innerHTML = `
                    <div class="card-content">
                        <span class="card-title">${item.name}</span>
                        <p>${item.description}</p>
                        <p><strong>Price:</strong> $${item.price.toFixed(2)}</p>
                    </div>
                    
                `;
                
                cartItemsContainer.appendChild(cartItemElement);
                
                
            });
            const cartTotalElement = document.createElement("div");
                cartTotalElement.classList.add("card");
                cartTotalElement.style.backgroundColor = "black";
                cartTotalElement.style.color = "white";
                cartTotalElement.innerHTML = `
                    <div class="card-content">
                        <span class="card-title">Cart Total</span>
                        
                        <p><strong>Price:</strong> $${total.toFixed(2)}</p>
                    </div>
                    
                `;
                cartItemsContainer.appendChild(cartTotalElement);
        }
    }
});
