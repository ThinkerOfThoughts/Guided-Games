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


  
//function to create user modelled after class example
function sign_up(event)
{
	event.preventDefault();
	
	//d2 api info
	var config_d2 = {
	  headers: {'X-Api-Key': 'd252a2c04c9b4dc6960daffda4a3e435'}
	};
	var base_url = 'https://www.bungie.net/Platform/Destiny2/';
	
	//gets variables from form
	const form = event.target;
	const email = form.Email.value;
	const password = form.password.value;
	const password2 = form.password2.value;
	const username = form.username.value;
	var platform = form.system.value;
	const gamertag = form.gamertag.value;
	if(platform == "PS4")
		platform = 2;
	else if(platform == "XBOX")
		platform = 1;
	else if(platform == "PC")
		platform = 4;
	
	//creates reference to database
	var dataref = firebase.database().ref("users/");
	
	//checks to see if username already exists
	dataref.orderByChild('username').equalTo(username).once("value", function(snapshot){
		if(!(snapshot.exists()))
		{
			//basic validation
			if(password != password2)
			{
				alert("Passwords do not match!");
			}
			else if(username == "")
			{
				alert("Username is blank!");
			}
			else if(gamertag == "")
			{
				alert("Gamertag is blank!");
			}
			else if(password == "")
			{
				alert("Password is blank!");
			}
			else if(email == "")
			{
				alert("Email is blank!");
			}
			else if(system == "N/A")
			{
				alert("Please select a system to use!");
			}
			else
			{
				//success so begin declaring info to be pulled from api
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
				
				//request player info from api
				axios.get(base_url + 'SearchDestinyPlayer/-1/' + gamertag, config_d2).then(function(response){
					console.log(response.data);
					var ID = response.data.Response[0].membershipId;	//crashes here
					var type = response.data.Response[0].membershipType;
					
					//gets player info
					axios.get(base_url + platform + '/Account/' + ID + '/Character/0/Stats/?modes=None', config_d2).then(function(response){
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
						
						if(response.data.Response.raid.allTime !== undefined){
							raids_cleared = response.data.Response.raid.allTime.activitiesCleared.basic.displayValue;
							fastest_time = response.data.Response.raid.allTime.fastestCompletionMs.basic.displayValue;
						}
						else{
							raids_cleared = 0;
							fastest_time = "0:00.000";
						}
						
						var user_type = "mentee";
						if(power_level >= 500 && (raids_cleared >= 10 || overall_kd >= 1.2))
						{
							user_type = "mentor";
						}
						else
						{
							user_type = "mentee";
						}
					
						//loads player info into database
						firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
							let users = firebase.database().ref('users');
							const newKey = users.push().key;
							let newData = {
								username: username,
								email: email,
								gamertag: gamertag,
								platform: platform,
								matches: matches,
								pvp_kills: pvp_kills,
								pvp_deaths: pvp_deaths,
								overall_kd: overall_kd,
								overall_kda_game: overall_kda_game,
								user_type: user_type,
								most_kills_game: most_kills_game,
								longest_streak: longest_streak,
								win_loss: win_loss,
								highest_level: highest_level,
								power_level: power_level,
								raids_cleared: raids_cleared,
								fastest_time: fastest_time
							};
							
							firebase.database().ref('users/' + newKey).update(newData, function(error){
								if(error){
									alert(error);
								}
								else
								{
									alert('User has been created!');
									window.location.href = './index.html';
								}
							});
						
						
						
						}).catch(function(error){
							var errorCode = error.code;
							var errorMessage = error.message;
							alert(errorCode);
							alert(errorMessage);
						});
					}).catch(function(error){
						var errorCode = error.code;
						var errorMessage = error.message;
						alert(errorCode);
						alert(errorMessage);
					});
				}).catch(function(error){
					var errorCode = error.code;
					var errorMessage = error.message;
					alert(errorCode);
					alert(errorMessage);
				});
			}
		}
		else
			alert("Username already exists!");
	});
	
}

document.querySelector('#register').addEventListener('submit', sign_up);



















