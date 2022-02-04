
//  async function searchGames(category) {

//  let response = await fetch(`https://www.freetogame.com/api/games?platform=pc&category=${category}&sort-by=relavance`, {
//  	"method": "GET",
//  	"headers": {
//  		// "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
//  		// "x-rapidapi-key": "7762a46affmsh847d232c8c0054bp190086jsnefdc4c528d13",
//  		"Access-Control-Allow-Origin": "*"
//  	}
//  })

//  let res = await response.json()
// console.log(response)
// }

// searchGames("shooter"); 
 
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
	console.log(response);
	// choses first ten array of objects
	for(i = 0; i <= 9; i++){
	// gets the game url object from the asrray in to a variable
	const gameUrl = response[i].game_url;
	console.log(gameUrl);
	// gets the thumb nail object from the array in to a var
	const gameThumbnail = response[i].thumbnail;
	console.log(gameThumbnail);
	// passing the two variables to the freeToPlayCarousel function
	freeToPlayCarousel(gameThumbnail,gameUrl);

	}
});


// function to create carusel with object information from response function
function freeToPlayCarousel(gameThumbnail,gameUrl) {
	// use the variables from previous function as normal to build carousel

}