var Chance = require('chance');
var chance = new Chance();

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send(generateStates());
})

app.listen(3000, function () {
  console.log('Accepting HTTP reuqests on port 3000!')
})

function generateStates() {
	var nbCities = chance.integer({
		min: 0,
		max: 10
	});
	var countries = ['us', 'it'];
	
	var cities = [];
	for(var i = 0; i < nbCities; i++) {
		var countryNb = chance.integer({
			min: 0,
			max: 1
		});
		var country = countries[countryNb];
		var state = chance.state(
		{ 
			country: country,
			full: true 
		});
		
		cities.push({
			state: state,
			country: country,
			latitude: chance.latitude(),
			longitude: chance.longitude()
		});
	}
	//console.log(cities);
	return cities;
}