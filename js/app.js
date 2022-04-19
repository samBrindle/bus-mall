'use strict';

// global variables
let votingRounds = 25;
let allProductsArray = [];

let productContainer = document.getElementById('container');
let image1 = document.getElementById('image-one');
let image2 = document.getElementById('image-two');
let image3 = document.getElementById('image-three');

let resultsList = document.getElementById('display-results');
let resultButton = document.getElementById('show-results-btn');

// constructor

function Product(name, src) {
    this.productName = name;
    this.src = src;
    this.views = 0;
    this.clicks = 0;
    
    allProductsArray.push(this);
}

// initializing new products
new Product('bag','./img/bag.jpeg');
new Product('banana','./img/banana.jpeg');
new Product('bathroom','./img/bathroom.jpeg');
new Product('boots','./img/boots.jpeg');
new Product('breakgast','./img/breakfast.jpeg');
new Product('bubblegum','./img/bubblegum.jpeg');
new Product('chair', './img/chair.jpeg');
new Product('cthulhu', './img/cthulhu.jpeg');
new Product('dog-duck','./img/dog-duck.jpeg');
new Product('dragon', './img/dragon.jpeg');
new Product('pen', './img/pen.jpeg');
new Product('pet-sweep','./img/pet-sweep.jpeg');
new Product('scissors', './img/scissors.jpeg');
new Product('shark','./img/shark.jpeg');
new Product('sweep','./img/sweep.png');
new Product('tauntaun','./img/tauntaun.jpeg');
new Product('unicorn','./img/unicorn.jpeg');
new Product('wine-glass','./img/wine-glass.jpeg');


// helper functions
function getRandomNumber() {
    return Math.floor(Math.random() * allProductsArray.length);
}

function renderImg() {
    let product1 = getRandomNumber();
    let product2 = getRandomNumber();
    let product3 = getRandomNumber();

    while( product1 === product2 || product1 === product3 || product3 === product2 ) {
        if(product1 == product2) {
            product2 = getRandomNumber();
        } else if( product1 == product3) {
            product3 = getRandomNumber();
        } else if(product2 == product3){
            product3 = getRandomNumber();
        }
    }
    image1.src = allProductsArray[product1].src;
    image2.src = allProductsArray[product2].src;
    image3.src = allProductsArray[product3].src;

    image1.alt = allProductsArray[product1].name;
    image2.alt = allProductsArray[product2].name;
    image3.alt = allProductsArray[product3].name;

    allProductsArray[product1].views++;
    allProductsArray[product2].views++;
    allProductsArray[product3].views++;
}

renderImg();

// event handlers

function handleProductClick(event) {
    let imgClicked = event.target.alt;

    for(let i = 0; i < allProductsArray.length; i++) {
        if(imgClicked === allProductsArray[i].productName) {
            allProductsArray[i].clicks++;
        }
    }

    votingRounds--;

    if(votingRounds===0) {
        productContainer.removeEventListener('click', handleProductClick);
    }

    renderImg();
}

function handleShowResults() {
    if(votingRounds === 0) {
        for(let i = 0; i < allProductsArray.length; i++) {
            let li = document.createElement('li');
            li.textContent = `${allProductsArray[i].productName} was shown ${allProductsArray[i].views} times and clicked ${allProductsArray[i].clicks} times.`;
            resultsList.appendChild(li);
        }
    }
}
// executable code
productContainer.addEventListener('click', handleProductClick);
resultButton.addEventListener('click', handleShowResults);