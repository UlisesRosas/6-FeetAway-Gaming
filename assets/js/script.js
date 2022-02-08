var covidApi = "https://covid-19-statistics.p.rapidapi.com/reports?iso=USA&region_name=US";
let selectOptionsEl = $("#dropdownStates")
const states = ["Alabama", "Idaho", "Wisconsin"];



fetch(covidApi, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
		"x-rapidapi-key": "e772096e1fmsh9c84bb7816b2116p110c5ajsnf16397425d73"
	}
})
.then(function (response) {
	// request wasa successful
	if (response.ok) {
		response.json()
			.then(function (data) {
				// display on HTML 
				generateOptions(data, data);
			});
	}
})
.catch(err => {
	console.error(err);
});

function generateOptions(apiData, arrayData){
	console.log(arrayData.data.length);

	for (var i = 0; i < arrayData.data.length; i++){
		const optionItem =  document.createElement('option')
		optionItem.textContent =  arrayData.data[i].region.province;

		$(selectOptionsEl).append(optionItem);
	}

}