// ================= CAMPUS CANTEEN JAVASCRIPT =================

// CART
// ================= CART =================

let cart = [];

function addToCart(name, price) {

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    displayCart();
}


// DISPLAY CART
function displayCart() {

    let cartItems = document.getElementById("cartItems");
    let cartTotal = document.getElementById("cartTotal");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.innerText = "0";
        return;
    }

    cart.forEach((item, index) => {

        let itemTotal = item.price * item.quantity;
        total = total + itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">

                <div>
                    <h3>${item.name}</h3>
                    <p>₹${item.price} × ${item.quantity}</p>
                </div>

                <div>
                    <button onclick="decreaseQuantity(${index})">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    cartTotal.innerText = total;
}


// INCREASE QUANTITY
function increaseQuantity(index) {
    cart[index].quantity++;
    displayCart();
}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    displayCart();
}


// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    displayCart();
}


// PLACE ORDER
function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Order placed successfully! 🎉");
}
// SHOW CART
function showCart() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].price;
    }

    alert(
        "Items in Cart: " + cart.length +
        "\nTotal Amount: ₹" + total
    );
}


// LOGIN FORM
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (email === "" || password === "") {
            alert("Please enter Email and Password");
        }
        else {
            alert("Login successful!");
        }

    });
}
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            const response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (result.success) {
                window.location.href = "/index.html";
            } else {
                alert(result.message || "Login failed");
            }
        } catch (error) {
            alert("Server se connection nahi ho raha. Server check karo.");
        }
    });
}