var gApiUrl = "https://www.freetogame.com/api/games?=e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73";
var testAPi = "https://free-to-play-games-database.p.rapidapi.com/api/games";

fetch(testAPi, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73"
	}
})
.then(response => {
	console.log(response);
  console.log($(response))
})
.catch(err => {
	console.error(err);
});

var carouselImgEl = document.getElementById('carouselImg');

var testImgEl = document.getElementById('myImgs');

var images = $(response).thumbnail;
var imgCaption = response 


function generateCarouselEl() {
  var carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item');
  carouselItem.classList.add('active');


  var carouselCaption = document.createElement('h5')
  carouselCaption.textContent
};