
//Tool used to perform get requests w/ node
//var axios = require('axios');
var socket = io.connect('http://localhost:3000');
var config = {
    apiKey: "AIzaSyD1lj9odK753YVBGQECer5DplzZ6AYiNM8",
    authDomain: "guided-games.firebaseapp.com",
    databaseURL: "https://guided-games.firebaseio.com",
    projectId: "guided-games",
    storageBucket: "guided-games.appspot.com",
    messagingSenderId: "887475943898"
};
firebase.initializeApp(config);

//retrieves the data from the api using the provided username
function profile(username)
{
/*	var gamertag = "I Sense Danger"	//remove once gamertags are in database
	var platform = 1;			//remove once platform type is in database;
//	1 for XBOX, 2 for PSN, and 4 for BNET I think

	//these store data retrieved from API
	var matches;
	var pvp_kills;
	var pvp_deaths;
	var overall_kd;
	var overall_kda_game;
	var most_kills_game;
	var longest_streak;
	var win_loss;
	var highest_level;
	var power_level;
	var raids_cleared;
	var fastest_time;
	//getting gamertag/platform from database
/*	let dataref = firebase.database().ref("users/");
	dataref.orderByChild('username').equalTo(username).on("child_added", function(snapshot) {
		gamertag = snapshot.child("gamertag").val());
		platform = snapshot.child("platform").val());
	};

	/* start API acess stuff */
//Header used to pass the key with each GET request
/*var config = {
  headers: {'X-Api-Key': 'd252a2c04c9b4dc6960daffda4a3e435'}
};

//Base API url, to be concatinated w/ further info to get specific data
var base_url = 'https://www.bungie.net/Platform/Destiny2/';

axios.get(base_url + 'SearchDestinyPlayer/-1/' + gamertag, config)
  .then(function(response){
	//Store account ID and user type (Xbox/PSN/BNET) for use in stat fetch
	var ID = response.data.Response[0].membershipId;
	var type = response.data.Response[0].membershipType;
	
	axios.get(base_url + platform + '/Account/' + ID + '/Character/0/Stats/?modes=None', config)
		.then(function(response){
				//PVP INFORMATION
				
				//Matches played
				matches = response.data.Response.allPvP.allTime.activitiesEntered.basic.displayValue;
				//Total PvP kills
				pvp_kills = response.data.Response.allPvP.allTime.kills.basic.displayValue;
				//Total PvP deaths
				pvp_deaths = response.data.Response.allPvP.allTime.deaths.basic.displayValue;
				//Overall KD
				overall_kd = response.data.Response.allPvP.allTime.killsDeathsRatio.basic.displayValue;
				//Overall KDA
				overall_kda_game = response.data.Response.allPvP.allTime.killsDeathsAssists.basic.displayValue;
				//Most kills in one game
				most_kills_game = response.data.Response.allPvP.allTime.bestSingleGameKills.basic.displayValue;
				//Longest kill streak
				longest_streak = response.data.Response.allPvP.allTime.longestKillSpree.basic.displayValue;
				//Win/loss ratio
				win_loss = response.data.Response.allPvP.allTime.winLossRatio.basic.displayValue;
		
				//PVE INFORMATION
				
				//Highest character level
				highest_level = response.data.Response.allPvE.allTime.highestCharacterLevel.basic.displayValue;
				//Highest light level
				power_level = response.data.Response.allPvE.allTime.highestLightLevel.basic.displayValue;
				//Total raid clears
				raids_cleared = response.data.Response.raid.allTime.activitiesCleared.basic.displayValue;
				//Fastest completion
				fastest_time = response.data.Response.raid.allTime.fastestCompletionMs.basic.displayValue;
*/

		let dataref = firebase.database().ref("users/");
	dataref.orderByChild('username').startAt(username).endAt(username+"\uf8ff").on("child_added", function(snapshot) {

		let profile_window = window.open("user_profile.html", "Profile", "");

		var platform;
		if(snapshot.child("platform").val() === 1)
		{
			platform = "XBox"
		}
		else if(snapshot.child("platform").val() === 2)
		{
			platform = "Playstation";
		}
		else if(snapshot.child("platform").val() === 4)
		{
			platform = "PC";
		}

		//TODO figure out how to transfer username into this function
		//TODO add code to put data from api into user_profile.html
		profile_window.window.onload = function() {
		profile_window.document.getElementById("user_profile").innerHTML += "<div class='profile_layout'>"
		//Username, account, and level/power/role on the top
		+ "<div class = 'profile_header' align = center>" + "<b>" + username + "<br>"
		+ snapshot.child("gamertag").val() + "<br>"
		+ 'Level: ' + snapshot.child("highest_level").val() + " | " + ' Power: ' + snapshot.child("power_level").val() + " | " + " Role: " + snapshot.child("user_type").val() + "</b></div>"
	
		//All PvP stats
		+ "<div id = 'profile_pvp' align = 'left'>" + "PvP Stats: " + "<br><br>" + "KD: " + snapshot.child("overall_kd").val() + "<br>"
		+ "Kills: " + snapshot.child("pvp_kills").val() + "<br>"
		+ "Matches: " + snapshot.child("matches").val() + "<br>"
		+ "Most Kills In A Game: " + snapshot.child("most_kills_game").val() + "<br>"
		+ "Longest Kill Streak: " + snapshot.child("longest_streak").val() + "<br></div>"
		
		//All PvE stats
		+ "<div id = 'profile_pve' align = 'right'>" + "PvE Stats: " + "<br><br>" + "Raids Cleared: " + snapshot.child("raids_cleared").val() + "<br>"
		+ "Fastest Time (In Minutes): " + snapshot.child("fastest_time").val() + "<br></div></div>"
		};
		/*
		+ username + </div><br><div class="gamertag" align="center"> ' + snapshot.child("gamertag").val() + ' Platform: ' + platform + ' </div><div> User Type:' + snapshot.child("user_type").val()+ ' </div></div> <br> <div class = "PVE_stats" align="center"> PVE Stats <br> <div class="power" align="left"> Power Level: ' + snapshot.child("power_level").val() + '</div><div class="level" align="right"> Hieghest Character Level: ' + snapshot.child("highest_level").val() + '</div> <br><div class "raids" align="left"> Raids cleared: ' + snapshot.child("raids_cleared").val() + '<div class "time" align="right"> Fastest Time (in min) : ' + snapshot.child("fastest_time").val() + '</div> </div> <br> <br>'
	+ '<div class = "PVP_stats" align="center"> PVP Stats <br> <div class "Matches" align="left"> Matches Played: ' + snapshot.child("matches").val() + '</div> <div class="kills" align="right"> PVP Kills: ' + snapshot.child("pvp_kills").val() + '</div> <br> <div class "deaths" align="left"> PVP Deaths: ' + snapshot.child("pvp_deaths").val() + '</div></div> <div class "time" align="right"></div> </div>' ;
		};*/

		profile_window.document.close();
			/*}).catch(function(error)	//based on error catcher from signup.js
				{
					var errorCode = error.code;
					var errorMessage = error.message;
					alert(errorCode);
					alert(errorMessage);
				});*/
		//});
	});
	/*end API acess stuff */

};
