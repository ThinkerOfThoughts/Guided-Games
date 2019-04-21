/*
This is the file I used to get all the API data and test it.
Different parts of the data will be displayed in multiple places, so I'll copy the calls from here when needed.
*/

//Tool used to perform get requests w/ node
var axios = require('axios')

//Header used to pass the key with each GET request
var config = {
  headers: {'X-Api-Key': 'd252a2c04c9b4dc6960daffda4a3e435'}
};

//Base API url, to be concatinated w/ further info to get specific data
var base_url = 'https://www.bungie.net/Platform/Destiny2/';

// Performing a GET request, hardcoded example is my gamertag but it can be replaced with whatever you need to search
//TODO -> GET THIS TO WORK FOR BNET USERS 
axios.get(base_url + 'SearchDestinyPlayer/-1/' + 'I Sense Danger', config)
  .then(function(response){
    console.log(response.data); //prints all response data for error checking
    console.log("Heaven's name is", response.data.Response[0].displayName);
	//Store account ID and user type (Xbox/PSN/BNET) for use in stat fetch
	var ID = response.data.Response[0].membershipId;
	var type = response.data.Response[0].membershipType;
	
	axios.get(base_url + type + '/Account/' + ID + '/Character/0/Stats/?modes=None', config)
		.then(function(response){
			//PVP INFORMATION
			
			//Matches played
			console.log("Matches:", response.data.Response.allPvP.allTime.activitiesEntered.basic.displayValue);
			//Total PvP kills
			console.log("PvP kills:", response.data.Response.allPvP.allTime.kills.basic.displayValue);
			//Total PvP deaths
			console.log("PvP deaths:", response.data.Response.allPvP.allTime.deaths.basic.displayValue);
			//Overall KD
			console.log("Overall KD:", response.data.Response.allPvP.allTime.killsDeathsRatio.basic.displayValue);
			//Overall KDA
			console.log("Overall KDA:", response.data.Response.allPvP.allTime.killsDeathsAssists.basic.displayValue);
			//Most kills in one game
			console.log("Most kills in one game:", response.data.Response.allPvP.allTime.bestSingleGameKills.basic.displayValue);
			//Longest kill streak
			console.log("Longest kill streak:", response.data.Response.allPvP.allTime.longestKillSpree.basic.displayValue);
			//Win/loss ratio
			console.log("Win/Loss ratio:", response.data.Response.allPvP.allTime.winLossRatio.basic.displayValue);
	
			console.log("");
			//PVE INFORMATION
			
			//Highest character level
			console.log("Highest level:", response.data.Response.allPvE.allTime.highestCharacterLevel.basic.displayValue);
			//Highest light level
			console.log("Highest power level:", response.data.Response.allPvE.allTime.highestLightLevel.basic.displayValue);
			//Total raid clears
			console.log("Raids cleared:", response.data.Response.raid.allTime.activitiesCleared.basic.displayValue);
			//Fastest completion
			console.log("Fastest completion (minutes):", response.data.Response.raid.allTime.fastestCompletionMs.basic.displayValue);

	});
});  




