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

let product1 = null;
let product2 = null;
let product3 = null;
let temp1 = null;
let temp2 = null;
let temp3 = null;

let ctx = document.getElementById('myChart');

let retrievedProducts = localStorage.getItem('products');

let parsedProducts = JSON.parse(retrievedProducts);

// constructor

function Product(name, fileExtension = 'jpeg') {
    this.productName = name;
    this.src = `img/${name}.${fileExtension}`;
    this.views = 0;
    this.clicks = 0;
    
    allProductsArray.push(this);
}

// initializing new products
if(retrievedProducts) {
  for(let i = 0; i < parsedProducts.length; i++) {
    if(parsedProducts[i].productName === 'sweep') {
      let reconstructedSweep = new Product(parsedProducts[i].productName, 'png');
      reconstructedSweep.views = parsedProducts[i].views;
      reconstructedSweep.clicks = parsedProducts[i].clicks;
    } else {
      let reconstructedProduct = new Product(parsedProducts[i].productName);
      reconstructedProduct.views = parsedProducts[i].views;
      reconstructedProduct.clicks = parsedProducts[i].clicks;
    }
  }
} else {
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep','png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('wine-glass');
}



// helper functions
function getRandomNumber() {
    return Math.floor(Math.random() * allProductsArray.length);
}

function allUniqueProducts() {
    while( product1 === product2 || product1 === product3 || product3 === product2 || product1 === temp1 || product1 === temp2 || product1 === temp3 || product3 === temp1 || product3 === temp2 || product3 === temp3 || product2 === temp1 || product2 === temp2 || product2 === temp3) {
        if(product1 == product2 || product1 === temp1 || product1 === temp2 || product1 === temp3) {
            product1 = getRandomNumber();
        } else if( product1 == product3 || product3 === temp1 || product3 === temp2 || product3 === temp3) {
            product3 = getRandomNumber();
        } else if(product2 == product3 || product2 === temp1 || product2 === temp2 || product2 === temp3){
            product2 = getRandomNumber();
        }
    }
}

function renderImg() {

    product1 = getRandomNumber();
    product2 = getRandomNumber();
    product3 = getRandomNumber();
    
    allUniqueProducts();
    
    temp1 = product1;
    temp2 = product2;
    temp3 = product3;
    // not giving alt any value
    image1.src = allProductsArray[product1].src;
    image1.alt = allProductsArray[product1].productName;
    allProductsArray[product1].views++;
    
    image2.src = allProductsArray[product2].src;
    image2.alt = allProductsArray[product2].productName;
    allProductsArray[product2].views++;
    
    image3.src = allProductsArray[product3].src;
    image3.alt = allProductsArray[product3].productName;
    allProductsArray[product3].views++;
}

renderImg();


// event handlers

function handleClick(event) {
    let imgClicked = event.target.alt;

    for(let i = 0; i < allProductsArray.length; i++) {
        if(imgClicked === allProductsArray[i].productName) {
            allProductsArray[i].clicks++;
        }
    }

    votingRounds--;

    if(votingRounds === 0) {
        productContainer.removeEventListener('click', handleClick);
        
        renderProductChart();

        let stringifiedProducts = JSON.stringify(allProductsArray);

        console.log(stringifiedProducts);

        localStorage.setItem('products', stringifiedProducts);
    }

    renderImg();
}

function renderProductChart() {
    let productNames = [];
    let productVotes = [];
    let productViews = [];

    for(let i = 0; i < allProductsArray.length; i++) {
        productNames.push(allProductsArray[i].productName);
        productVotes.push(allProductsArray[i].clicks);
        productViews.push(allProductsArray[i].views);
    }


    let myChartObj = {
        type: 'bar',
        data: {
          labels: productNames,
          datasets: [{
            label: '# of Votes', // # votes and # views
            data: productVotes,
            backgroundColor: [
              'white'
            ],
            borderColor: [
              'white'
            ],
            borderWidth: 1
          },
          {
            label: '# of Views', // # votes and # views
            data: productViews, // the actual view or votes
            backgroundColor: [
              'black'
            ],
            borderColor: [
              'black'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      new Chart(ctx, myChartObj);
}

// executable code
productContainer.addEventListener('click', handleClick);
// resultButton.addEventListener('click', handleShowResults);