const covidApi = "https://covid-19-statistics.p.rapidapi.com/reports?iso=USA&region_name=US";
let selectOptionsEl = $("#dropdownStates")

fetch(covidApi, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
		"x-rapidapi-key": "e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73"
	}
})
.then(function (response) {
	// request was successful
	if (response.ok) {
		response.json()
			.then(function (data) {
				// display on HTML 
				generateOptions(data, data);
                console.log(data);
			});
	}
})
.catch(err => {
	console.error(err);
});

function generateOptions(apiData, arrayData){
	console.log(apiData);
	for (let i = 0; i < arrayData.data.length; i++){
		const optionItem =  document.createElement('option')
		optionItem.textContent =  arrayData.data[i].region.province;

		$(selectOptionsEl).append(optionItem);
	}

}
// **sectyion 2 start

var carouselImgEl = document.getElementById('free-to-play-carousel');
// array for each option value using genre as the value
let text = "mmorpg shooter pvp mmofps strategy moba racing sports social open-world survival pvp pve pixel voxel zombie turn-based top-down tank space sailing side-scroller superhero permadeath card battle-royale mmotps 3d 2d anime sci-fi fighting action-rpg action military martial-arts flight low-spec tower-defense horror mmorts";
// turned text in to array
const valueGenreArrey = text.split(" ");

// makes the drop down dynamic
function dropdownMenueMaker() {
console.log(valueGenreArrey);

for (let i = 0; i < valueGenreArrey.length; i++) {
	const dropdownOptionEl = $("<option>");
	
		 
	// .text(valueGenreArrey[i]);
	dropdownOptionEl.attr("value",valueGenreArrey[i])
	// dropdownOptionEl.val(valueGenreArrey[i]);
	console.log(valueGenreArrey[i]);
	
	dropdownOptionEl.text(valueGenreArrey[i]);

	$("#dropdown-form").append(dropdownOptionEl);
	
	// console.log(i)
}

};
dropdownMenueMaker();

// api request function
 function apiFreeToPlayRequest(dropDownSelection) {
	// console.log(dropDownSelection);
	
	const settings = {
		 "async": true,
		 "crossDomain": true,
		 "url": `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${dropDownSelection}`,
		 "method": "GET",
		 "headers": {
			 "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
			 "x-rapidapi-key": "7762a46affmsh847d232c8c0054bp190086jsnefdc4c528d13"
		 }
	 };
	//  console.log(settings.url);
	 // response from game api in jquery
	 $.ajax(settings).done(function (response) {
		//  console.log(response);
		//  clear out the carousel items by targetting free-to-play-carousel 
		//    let carouselItems = document.querySelector(".carousel-item");
		//    console.log(carouselItems);

		// try to remove the active classthat is given to the firsat item so that they dont conflict
		$(".carousel-item").removeClass("active");
		 // choses first ten array of objects
		 for (let i = 0; i < Math.min(response.length, 10); i++) {
			 // gets the game url object from the array in to a variable
			 const gameUrl = response[i].game_url;
			//  console.log(response[i]);

			 // gets the thumb nail object from the array in to a var
			 const gameThumbnail = response[i].thumbnail;
			 // console.log(gameThumbnail);
			 // passing the two variables to the freeToPlayCarousel function

			 generateFreeToPlayCarouselEl(gameThumbnail, gameUrl, response[i], i);

		 }
	 });

 };

function generateFreeToPlayCarouselEl(gameThumbnail, gameUrl, response, index) {
	var gameLink = document.createElement('a');
	gameLink.setAttribute("href", gameUrl);

	var carouselItem = document.createElement('div');
	carouselItem.classList.add('carousel-item');
	//only the first slide is set to active class
	if (index === 0) {
	  carouselItem.classList.add('active');
	}
  
	var imgItem = document.createElement('img');
	imgItem.setAttribute("src", gameThumbnail);
	imgItem.setAttribute("alt", response.title);
	imgItem.setAttribute("class", "image-width");
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

	// append url to image 
	gameLink.append(descriptionEL);
  
	//appending to img and div to carousel-item div 
	carouselItem.append(imgItem);
	// carouselItem.append(descriptionEL);
	carouselItem.append(gameLink);
  
	//Append Carousel cards to main div CarouselImg 
	carouselImgEl.appendChild(carouselItem);
};

// function to handle drop doen form selection
function dropDownSelection(){
	// console.log("dropdown menu was selected");
	// get value from option to change the API endpoint
	const dropDownSelection = $("#dropdown-form").find(":selected").val();
	// console.log(dropDownSelection);
	// saves chosen option id
	let saveGenreId = $(this).children("option").attr('id');
	console.log(saveGenreId);
	// pass dropDownSelection to the api request function
	apiFreeToPlayRequest(dropDownSelection);

}

// makes the defasult api response to display shooter genre options
function initDisplay() {
	apiFreeToPlayRequest("shooter");
}

// used change so that just the options trigger the event and not just clicking on the drop down
$('#dropdown-form').on('change', dropDownSelection) 

initDisplay();

// **sectyion 2end
