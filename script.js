// function to fetch all products
const getProducts = () => {
    let heroSection = document.querySelector('.hero');

    fetch(`https://fakestoreapi.com/products`)
        .then(res => { return res.json() })
        .then(result => {

            for (let i = 0; i < result.length; i++) {
                heroSection.innerHTML += `<div class="card" id="${result[i].id}">
                <img src="${result[i].image}" alt="product" onclick="singleProduct(${result[i].id})">
                <div class="details">
                    <h2 onclick="singleProduct(${result[i].id})">${result[i].title}</h2>
                    <p><span class="price">Price:&nbsp;</span>${result[i].price}</p>
                    <button onclick='addToCart(${result[i].id})'>Add to Cart</button>
                </div>
            </div>`

            }
        })
        .catch(err => { console.log(err); })
}

getProducts();

//add to cart functionality
let cart = [];
const addToCart = (product) => {
    let isAdded = false;

    cart.forEach((item) => {
        if (product === item) {
            isAdded = true;
        }
    })

    if (isAdded) {
        alert("Product is already added to Cart!");
        return;
    }

    cart.push(product);

    //fetch products into cart
    cart.map((item) => {
        let cartDiv = document.querySelector('.cart-items');
        cartDiv.innerHTML = "";

        fetch(`https://fakestoreapi.com/products/${item}`)
            .then(res => { return res.json() })
            .then(result => {
                cartDiv.innerHTML += `
                <div class="item" id='${result.id}'>
                <img src="${result.image}" alt="product">
                <h2>${result.title}</h2>
                <p><span class="price">Price:&nbsp;</span>${result.price}</p>
                <div class="quantity">
                    <div>+</div>
                    <div>0</div>
                    <div>-</div>
                </div>
            </div>
            `
            })
            .catch(err => { console.log(err); })
    })

    //update the number of products in cart
    document.getElementById('number').innerHTML = `${cart.length}`;
}


// get single product
const singleProduct = (productId) => {
    localStorage.setItem('productId', productId);
    location.href = './product.html';
}
