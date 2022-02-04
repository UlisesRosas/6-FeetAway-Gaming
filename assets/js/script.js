
async function searchGames(category) {

let response = await fetch(`https://www.freetogame.com/api/games?platform=pc&category=${category}&sort-by=relavance`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "7762a46affmsh847d232c8c0054bp190086jsnefdc4c528d13",
		"Access-Control-Allow-Origin": "*"
	}
})

// let res = await response.json()
console.log(response)
}
// fetch("https://free-to-play-games-database.p.rapidapi.com/api/games").then(function(response) {
// 	console.log(response);
// })
searchGames("shooter");