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
	var config_d2 = {
	  headers: {'X-Api-Key': 'd252a2c04c9b4dc6960daffda4a3e435'}
	};
	var base_url = 'https://www.bungie.net/Platform/Destiny2/';
	
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
	
	var dataref = firebase.database().ref("users/");
	
	dataref.orderByChild('username').equalTo(username).once("value", function(snapshot){
		if(!(snapshot.exists()))
		{
			
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
				axios.get(base_url + 'SearchDestinyPlayer/-1/' + gamertag, config).then(function(response){
					var ID = response.data.Response[0].membershipId;
					var type = response.data.Response[0].membershipType;
					
					axios.get(base_url + platform + '/Account/' + ID + '/Character/0/Stats/?modes=None', config).then(function(response){
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
					
						firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
							let users = firebase.database().ref('users');
							const newKey = users.push().key;
							let newData = {
								username: username,
								email: email,
								platform: platform,
								matches: matches,
								pvp_kills: pvp_kills,
								pvp_deaths: pvp_deaths,
								overall_kd: overall_kd,
								overall_kda_game: overall_kda_game,
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



















