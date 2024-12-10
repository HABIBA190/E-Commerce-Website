document.addEventListener('DOMContentLoaded', function () {
    
    const name = getUrlParameter('name');
    const image = getUrlParameter('image');
    const price = getUrlParameter('price');

    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-image').src = image;
    document.getElementById('detail-price').innerText = price;

    let selectedSize = '';

    document.querySelectorAll('.size-box').forEach(item => {
        item.addEventListener('click', function () {
         
            selectedSize = this.getAttribute('data-size');
            
   
            document.querySelectorAll('.size-box').forEach(box => {
                box.classList.remove('selected');
            });
            

            this.classList.add('selected');
        });
    });

    document.getElementById('add-to-cart').addEventListener('click', function () {
        const quantity = parseInt(document.getElementById('quantity').value);


        if (!selectedSize) {
            alert('Please select a size.');
            return;
        }

        addProductToCart(name, image, price, selectedSize, quantity);
    });


    updateCartCountDisplay();
});


function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function updateCartCountDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
}

function addProductToCart(name, image, price, size, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProductIndex = cart.findIndex(item => item.name === name && item.size === size);
    if (existingProductIndex > -1) {
       
        cart[existingProductIndex].quantity += quantity;
    } else {
       
        cart.push({ name, image, price, size, quantity });
    }

 
    localStorage.setItem('cart', JSON.stringify(cart));

   
    updateCartCountDisplay();
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





document.addEventListener('DOMContentLoaded', function () {
    const dropdownToggle = document.getElementById('dropdownMenuLink');    
    dropdownToggle.addEventListener('click', function (event) {
        event.preventDefault(); 
        dropdownMenu.classList.toggle('show'); 
    });

   
    document.addEventListener('click', function (event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});

