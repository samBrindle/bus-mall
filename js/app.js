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

    //alt is undefined
    console.log('THIS WAS CLICKED >>>', imgClicked);

    for(let i = 0; i < allProductsArray.length; i++) {
        if(imgClicked === allProductsArray[i].productName) {
            console.log('hello');
            allProductsArray[i].clicks++;
        }
    }

    votingRounds--;

    if(votingRounds === 0) {
        productContainer.removeEventListener('click', handleClick);
        
        renderProductChart();
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

    console.log(productVotes)

    let myChartObj = {
        type: 'bar',
        data: {
          labels: productNames,
          datasets: [{
            label: '# of Votes', // # votes and # views
            data: productVotes,
            backgroundColor: [
              'blue'
            ],
            borderColor: [
              'blue'
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