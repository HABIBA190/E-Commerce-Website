
function goBack() {
    window.history.back(); 
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

document.addEventListener('DOMContentLoaded', function() {
    const name = getUrlParameter('name');
    const image = getUrlParameter('image');
    const price = getUrlParameter('price');

    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-image').src = image;
    document.getElementById('detail-price').innerText = price;

    document.getElementById('add-to-cart').addEventListener('click', function() {
        const quantity = parseInt(document.getElementById('quantity').value);
        addToCart(name, image, price, quantity);
    });

    
    updateCartCount();
});


function addToCart(name, image, price, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
      
        cart[existingProductIndex].quantity += quantity;
    } else {
    
        cart.push({ name, image, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
   
}


function updateCartCountDisplay() {
    const cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
}


document.addEventListener('DOMContentLoaded', updateCartCountDisplay);


function openCart() {
    window.location.href = 'cart.html'; 
}

function addToCart() {
    let cartCount = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;
    cartCount += parseInt(document.getElementById('quantity').value); 
    localStorage.setItem('cartCount', cartCount); 
   
}


document.getElementById('add-to-cart').addEventListener('click', addToCart);



function updateCartCountDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
}


document.addEventListener('DOMContentLoaded', updateCartCountDisplay);


function openCart() {
    window.location.href = 'cart.html'; 
}


function addToCart(name, image, price, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.name === name);

    if (existingProductIndex > -1) {
       
        cart[existingProductIndex].quantity += quantity;
    } else {
        cart.push({ name, image, price, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCountDisplay();
  
}


function removeFromCart(name) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.name !== name); 
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCountDisplay();
}


                                 //    Checkout
window.onload = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    const orderTotalContainer = document.getElementById('order-total');

    if (cart.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        orderTotalContainer.innerHTML = '';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        orderItemsContainer.innerHTML += `
            <div class="d-flex mb-3">
                <img src="${item.image}" class="product-image" alt="${item.name}" />
                <div class="product-details">
                    <h5>${item.name}</h5>
                    <p>Size: ${item.size}</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <div class="product-total">
                    Rs ${itemTotal}
                </div>
            </div>
        `;
    });

    orderTotalContainer.innerHTML = `<h4>Total: Rs ${total}</h4>`;
};






function sortBy(criteria) {
    const productContainer = document.getElementById('product-container');
    const products = Array.from(productContainer.getElementsByClassName('product-item'));

    if (criteria === "alphabetically") {
        products.sort((a, b) => {
            const nameA = a.querySelector('h5').innerText.toUpperCase();
            const nameB = b.querySelector('h5').innerText.toUpperCase();
            return nameA.localeCompare(nameB);
        });
    } else if (criteria === "price") {
        products.sort((a, b) => {
            const priceA = parseInt(a.querySelector('.price').innerText.replace('Rs', '').trim());
            const priceB = parseInt(b.querySelector('.price').innerText.replace('Rs', '').trim());
            return priceA - priceB;  
        });
    }

    productContainer.innerHTML = ''; 
    products.forEach(product => productContainer.appendChild(product));
}

