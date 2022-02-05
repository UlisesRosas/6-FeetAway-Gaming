var carouselImgEl = document.getElementById('free-to-play-carousel');

 
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc&category=shooter",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "7762a46affmsh847d232c8c0054bp190086jsnefdc4c528d13"
	}
};
// response from game api in jquery
$.ajax(settings).done(function (response) {
	// console.log(response);
	// choses first ten array of objects
	for(i = 0; i <= 9; i++){
	// gets the game url object from the asrray in to a variable
	const gameUrl = response[i].game_url;
	
	// gets the thumb nail object from the array in to a var
	const gameThumbnail = response[i].thumbnail;
	// console.log(gameThumbnail);
	// passing the two variables to the freeToPlayCarousel function
	generateCarouselEl(gameThumbnail,gameUrl, response[i], i);

	}
});

function generateCarouselEl(gameThumbnail, gameUrl, response, index) {
	var carouselItem = document.createElement('div');
	carouselItem.classList.add('carousel-item');
	//only the first slide is set to active class
	if (index === 0) {
	  carouselItem.classList.add('active');
	}
  
	var imgItem = document.createElement('img');
	imgItem.setAttribute("src", gameThumbnail);
	imgItem.setAttribute("alt", response.title);
	imgItem.setAttribute("class", "image-width")
	// console.log(response.title)
	var anchor = document.createElement("a");
	anchor.setAttribute("href",gameUrl );
	imgItem.appendChild(anchor);
	// console.log(gameUrl);

  
	// console.log("Image created ", imgItem, index);
  
  
	var descriptionEL = document.createElement('div');
	descriptionEL.setAttribute("class", "carousel-caption d-none d-md-block");
	 
  
	var carouselCaption = document.createElement('h5');
	carouselCaption.textContent = response.title;
	
  
	var shortDescription = document.createElement('p');
	shortDescription.textContent = response.short_description;
  
	//append to the div carousel-caption
	descriptionEL.append(carouselCaption);
	descriptionEL.append(shortDescription);
  
	//appending to img and div to carousel-item div 
	carouselItem.append(imgItem);
	carouselItem.append(descriptionEL);
  
	//Append Carousel cards to main div CarouselImg 
	carouselImgEl.appendChild(carouselItem);
  };

// function to handle drop doen form selection
function dropDownSelection(){
	console.log("dropdown menu was selected");
	const dropDownSelection = $("#dropdown-form").find(":selected").val();
	console.log(dropDownSelection);
	// pass dropDown to the api request function

	
}

// used change so that just the options trigger the event and not just clicking on the drop down
$('#dropdown-form').on('change', dropDownSelection)