const covidApi = "https://covid-19-statistics.p.rapidapi.com/reports?iso=USA&region_name=US";
let selectOptionsEl = $("#dropdownStates")
let statsEl = $("#stats-container");

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
              //  console.log(data);
			});
	}
})
.catch(err => {
	console.log(err)
	
});

function getCovid(state) {
	console.log(state);
	fetch(`https://covid-19-statistics.p.rapidapi.com/reports?region_province=${state}&iso=USA&region_name=US&q=US%20${state}`,{
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
			"x-rapidapi-key": "e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73"
		}
	}).then(function (response) {
		if(response.ok) {
			console.log(response);
			response.json()
			.then(function (data){
				console.log(data, 38);
				displayStats(data);
			})
		}
	})
}

function selectedStateOnChange() {
	let selectedState = selectOptionsEl[0].value;
	console.log(selectedState);
	getCovid(selectedState); 
	stateTitleMaker(selectedState)
}

function generateOptions(apiData, arrayData){ 
//	console.log(apiData);
	for (let i = 0; i < arrayData.data.length; i++){
		const optionItem =  document.createElement('option')
		optionItem.setAttribute('value', arrayData.data[i].region.province)
		optionItem.textContent =  arrayData.data[i].region.province;
		
		$(selectOptionsEl).append(optionItem);
	};
	$('#dropdownStates').change(function (){
		selectedStateOnChange();
		displayStats(arrayData);
		refreshDiv();
		
	});
}


function refreshDiv () {
	$("#stats-container").empty();
}

function stateDefault() {
	getCovid("Washington");
};
stateDefault();

// makes div with the selected states name
function stateTitleMaker(selectedState) {
let stateNamEl = $('<h1>');
stateNamEl.text(selectedState);
stateNamEl.addClass('card-header text-center')
$('.chosen-state-container').append(stateNamEl);
console.log(stateNamEl);
};

function displayStats(stateData, optionItem){
	console.log(optionItem);

	// const statsHeaderEl = $("<div>");
	// $(statsHeaderEl).addClass('card-header text-center');
	// $(statsHeaderEl).text( "Statistics Updated: " + stateData.data[0].date);
	
	const statsListEl = $('<div>');
	$(statsListEl).addClass("list-group list-group-flush text-center container");

	const statsHeaderEl = $("<div>");
	$(statsHeaderEl).addClass('card-header list-group-item text-center');
	$(statsHeaderEl).text( "Statistics Updated: " + stateData.data[0].date);

	const statListActive = $("<div>")
	$(statListActive).addClass("list-group-item");
	$(statListActive).text("Active Cases:  " + stateData.data[0].active);
	// container #2 for other half of content
	const secondHalfContainerRow = $('<div>')
	$(secondHalfContainerRow).addClass("list-group list-group-flush text-center container");
	
	const statListTotal = $("<div>");
	$(statListTotal).addClass("list-group-item");
	$(statListTotal).text("Total Deaths:  " + stateData.data[0].deaths);
	
	const statListFatality= $("<div>")
	$(statListFatality).addClass("list-group-item");
	$(statListFatality).text("Fatality Rate:  " + stateData.data[0].fatality_rate);

	// display on HTML 
	$(statsEl).append([statsListEl, secondHalfContainerRow]);

	// append list items to list 
	$(statsListEl).append([statsHeaderEl, statListActive]);
	$(secondHalfContainerRow).append([statListTotal, statListFatality]);

	
}



// **sectyion 2 start

var carouselImgEl = document.getElementById('free-to-play-carousel');
// array for each option value using genre as the value
let text = "mmorpg shooter pvp mmofps strategy moba racing sports social open-world survival pvp pve pixel voxel zombie turn-based top-down tank space sailing side-scroller superhero permadeath card battle-royale mmotps 3d 2d anime sci-fi fighting action-rpg action military martial-arts flight low-spec tower-defense horror mmorts";
// turned text in to array
const valueGenreArrey = text.split(" ");

// makes the drop down options dynamic
function dropdownMenueMaker() {
// console.log(valueGenreArrey);

for (let i = 0; i < valueGenreArrey.length; i++) {
	const dropdownOptionEl = $("<option>");
	
		 
	// .text(valueGenreArrey[i]);
	dropdownOptionEl.attr("value",valueGenreArrey[i])
	// dropdownOptionEl.val(valueGenreArrey[i]);
	//console.log(valueGenreArrey[i]);
	
	dropdownOptionEl.text(valueGenreArrey[i]);

	$("#dropdown-form").append(dropdownOptionEl);
	
	// console.log(i)
}

};
dropdownMenueMaker();

// api request function
 function apiFreeToPlayRequest(dropDownSelection) {
	
	const settings = {
		 "async": true,
		 "crossDomain": true,
		 "url": `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${dropDownSelection}`,
		 "method": "GET",
		 "headers": {
			 "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
			 "x-rapidapi-key": "7762a46affmsh847d232c8c0054bp190086jsnefdc4c528d13"
		 }, 
		 "error": function(error){
			console.log(error.status);
			generateModal(error.sttus);
		},
	 };

	 // response from game api in jquery
	 $.ajax(settings).done(function (response, status) {
		// removes the previous carousel so that it wont stack and keep adding more on top of each other
		console.log(status);
		// console.log(error);
		// console.log(status);
		$("#free-to-play-carousel").empty();
		 // choses first ten array of objects
		 for (let i = 0; i < Math.min(response.length, 10); i++) {
			 // gets the game url object from the array in to a variable
			 const gameUrl = response[i].game_url;
			 // gets the thumb nail object from the array in to a var
			 const gameThumbnail = response[i].thumbnail;
			 // passing the two variables to the freeToPlayCarousel function
			 generateFreeToPlayCarouselEl(gameThumbnail, gameUrl, response[i], i);

		 }
	 });

 };

// generates carousel for section2
function generateFreeToPlayCarouselEl(gameThumbnail, gameUrl, response, index) {
	var gameLink = document.createElement('a');
	gameLink.setAttribute("href", gameUrl);
	gameLink.setAttribute("target", "_blank");

	var carouselItem1 = document.createElement('div');
	carouselItem1.classList.add('carousel-item');
	//only the first slide is set to active class
	if (index === 0) {
	  carouselItem1.classList.add('active');
	  carouselItem1.setAttribute("id", "free-to-play-carousel");
	}
	
   // creating the image element    
	var imgItem = document.createElement('img');
	// setting the atributes to API response data
	imgItem.setAttribute("src", gameThumbnail);
	imgItem.setAttribute("alt", response.title);
	imgItem.setAttribute("class", "image-width");
	// creating anchor element
	var anchor = document.createElement("a");
	// setting anchor attribute to be API response url
	anchor.setAttribute("href",gameUrl );
	// appends the attributes to the anchor
	imgItem.appendChild(anchor);

	// create a div element
	var descriptionEL = document.createElement('div');
	// giving the new div a class 
	descriptionEL.setAttribute("class", "carousel-caption");
	 
  	//creates heading   
	var carouselCaption = document.createElement('h5');
	// adds api title response
	carouselCaption.textContent = response.title;
	
    // create p element
	var shortDescription = document.createElement('p');
	// giving the p element a short discription api info
	shortDescription.textContent = response.short_description;
  
	//append to the div carousel-caption
	descriptionEL.append(carouselCaption);
	descriptionEL.append(shortDescription);

	// append url to image 
	gameLink.append(descriptionEL);
  
	//appending to img and div to carousel-item div 
	carouselItem1.append(imgItem);
	// carouselItem.append(descriptionEL);
	carouselItem1.append(gameLink);
  
	//Append Carousel cards to main div CarouselImg 
	carouselImgEl.appendChild(carouselItem1);
};

// function to handle drop down form selection
function dropDownSelection(){
	// get value from option to change the API endpoint
	const dropDownSelection = $("#dropdown-form").find(":selected").val();
	// saved the drop down selection to local storage. Created arbitrary value called game-history as the key
	localStorage.setItem("game-history", dropDownSelection);
	// sends value of chosen option to apiFreeToPlayRequest
	apiFreeToPlayRequest(dropDownSelection);

}

// makes the default api response to display shooter genre options
function initDisplay() {
	// retrieving saved item from local storage
	let pizza = localStorage.getItem("game-history")
//	console.log(pizza)
	// seeting a default case for the api url endpoint
	if(pizza === null){
		apiFreeToPlayRequest("shooter");
	} else {
		apiFreeToPlayRequest(pizza);
	}
}

// used change so that just the options trigger the event and not just clicking on the drop down
$('#dropdown-form').on('change', dropDownSelection) 

initDisplay();
// **sectyion 2end

// begin section 4
var gApiUrl = "https://www.freetogame.com/api/games?=e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73";
var testAPi = "https://free-to-play-games-database.p.rapidapi.com/api/games";

var carouselImgEl2 = document.getElementById('carouselImg');
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
    //  console.log(response);

    for (var i = 0; i < 50; i++) {
      // Display in HTML
      generateCarouselEl(response[i], i);
    }
  })
  .catch(function (error) {
	
	// make function call passing error
	generateModal(error);
  });

//   Modal generating function
function generateModal(error) {
	// creates the modal when there is an error
	const popupContent = $('<div>').addClass('popup-content modal-content');
	$('.popup-container').append(popupContent);
	// creates div With a class of modalheader
	const popupHeadingContainer = $('<div>').addClass('modal-header');
	$(popupContent).append(popupHeadingContainer);

	const popupHeading = $('<h2>').text(error);
	$(popupHeadingContainer).append(popupHeading);

	const modalTextContainer = $('<div>').addClass('modal-body');
	$(popupContent).append(modalTextContainer);

	const popupText = $('<p>').text("Something went wrong loading this part of the page.");
	$(modalTextContainer).append(popupText);

	const popupFooter = $('<div>').addClass('modal-footer');
	$(popupContent).append(popupFooter);
}
  
function generateCarouselEl(responseItem, index) {
	// create anchor tag
  var gameLink = document.createElement('a');
  gameLink.setAttribute("href", responseItem.game_url)
  gameLink.setAttribute("target", "_blank");
  

  var carouselItem = document.createElement('div');
  carouselItem.classList.add('carousel-item');
  //only the first slide is set to active class
  if (index === 0) {
    carouselItem.classList.add('active');
  }
  var imgItem = document.createElement('img');
  imgItem.setAttribute("src", responseItem.thumbnail);
  imgItem.setAttribute("alt", responseItem.title);

  // console.log("Image created ", imgItem, index);

  var descriptionEL = document.createElement('div');
  descriptionEL.setAttribute("class", "carousel-caption");
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
  carouselImgEl2.appendChild(carouselItem);
};

// prevent subcribe button from page refresh
$("#email").click(function (event) {
 event.prevent.default()
});

