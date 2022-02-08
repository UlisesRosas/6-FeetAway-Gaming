var gApiUrl = "https://www.freetogame.com/api/games?=e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73";
var testAPi = "https://free-to-play-games-database.p.rapidapi.com/api/games";

var carouselImgEl = document.getElementById('carouselImg');
var testImgEl = document.getElementById('myImgs');


fetch(testAPi, {
  "method": "GET",
  "headers": {
    "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
    "x-rapidapi-key": "e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73"
  }
})
  .then(function (response) {
    // conver to JSON object
    return response.json();
  })
  .then(function (response) {
    console.log(response);

    for (var i = 0; i < 20; i++) {
      // Display in HTML
      generateCarouselEl(response[i], i);
    }
  })
  .catch(function (error) {
    console.log("error")
  });

function generateCarouselEl(responseItem, index) {

  var gameLink = document.createElement('a');
  gameLink.setAttribute("href", responseItem.game_url)

  var carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item');
  //only the first slide is set to active class
  if (index === 0) {
    carouselItem.classList.add('active');
  }
  var imgItem = document.createElement('img');
  imgItem.setAttribute("src", responseItem.thumbnail);
  imgItem.setAttribute("alt", responseItem.title);

  console.log("Image created ", imgItem, index);


  var descriptionEL = document.createElement('div');
  descriptionEL.setAttribute("class", "carousel-caption d-none d-md-block");
  //console.log("Div ", descriptionEL); 

  var carouselCaption = document.createElement('h5');
  carouselCaption.textContent = responseItem.title;

  var shortDescription = document.createElement('p');
  shortDescription.textContent = responseItem.short_description;

  //append to the div carousel-caption
  descriptionEL.append(carouselCaption);
  descriptionEL.append(shortDescription);

  // append url to image 
  gameLink.append(descriptionEL)

  //appending to img and div to carousel-item div 
  carouselItem.append(imgItem);
  carouselItem.append(gameLink);

  //Append Carousel cards to main div CarouselImg 
  carouselImgEl.appendChild(carouselItem);
};