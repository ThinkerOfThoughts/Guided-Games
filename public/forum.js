//Connect to socket, get configuration for Firebase, and init the app w/ Firebase
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

/*The Firebase post_request was completed by Luiz & Hannah. I (Heaven) added a couple variables into it for my purposes and 
created the rest of this file to populate the forum posts with API info and display them correctly.
*/
function post_request(event)
{
	event.preventDefault();

	const form = event.target;
	const acct = form.user.value; 
	const purpose = form.request.value;
	const strat = form.strategy.value;

	firebase.auth().onAuthStateChanged(function(user) {
		if(user)
		{
			var dataref = firebase.database().ref("users/");
			dataref.orderByChild('email').equalTo(user.email).on("child_added", function(snapshot){
				let forum = firebase.database().ref('forum');
				const newKey = forum.push().key;
				const usernm = snapshot.child("username").val();
				const user_type = snapshot.child("user_type").val();
				
				let newData = {
					username: usernm,
					post: purpose,
					account: acct,
					theStrat: strat,
					user_type: user_type,
				};
				
				firebase.database().ref('forum/' + newKey).update(newData, function(error){
					if(error)
					{
						alert(error);
					}
					else
					{
						alert("Request has been posted!");
						window.location.href = "./forum.html";
					}
				});
			});
		
		}
		else
		{
			window.alert("You are not logged in!");
			window.location.href = './index.html';
		}
		
	});
}

//Reference the forum part of the database
var forum_list = document.getElementById("forum_posts");
var dataref = firebase.database().ref("forum/");

//Function to check for platform change	
document.getElementById("plat").onchange = function(){
	//The platform is Xbox
	if(this.value === "X"){
		var type = 1;
	}
	//Playstation
	else if(this.value === "P")
    {
		var type = 2;
    }
	//PC
    else if(this.value === "B")
    {
		var type = 4;
    }

	/*
	//Function to check if the user is a mentor or mentee
	document.getElementById("role").onchange = function(){
		if(this.value === "mentor"){
			user_role = "Mentor";
		}
		else if(this.value === "mentee"){
			user_role = "Mentee";
		}
	}*/
		//Function for getting and printing API data to the forum
		var forum_counter = 0;
		dataref.orderByChild('username').startAt("").endAt("\uf8ff").on("child_added", function(snapshot){
		//NOTE -> I've copied a lot of the comments from testAPI to clarify things, but you can check there for more details
		
		//Header used to pass the key with each GET request
		var options = {
			headers: {'X-Api-Key': 'd252a2c04c9b4dc6960daffda4a3e435'}
		};

		//Base API url, to be concatinated w/ further info to get specific data
		var base_url = 'https://www.bungie.net/Platform/Destiny2/';
		var account = snapshot.child('account').val();
		console.log("The account is:", account);
		// Performing a GET request
		axios.get(base_url + 'SearchDestinyPlayer/' + type + '/' + account, options)
			.then(function(response){
			console.log("The name is", response.data.Response[0].displayName);
			//Store account ID and user type (Xbox/PSN/BNET) for use in stat fetch
			var ID = response.data.Response[0].membershipId;
			//var type = response.data.Response[0].membershipType;
		
			axios.get(base_url + type + '/Account/' + ID + '/Character/0/Stats/?modes=None', options)
				.then(function(response){
				//Storing fetched data
				level = response.data.Response.allPvE.allTime.highestCharacterLevel.basic.displayValue;
				power = response.data.Response.allPvE.allTime.highestLightLevel.basic.displayValue;
				KD = response.data.Response.allPvP.allTime.killsDeathsRatio.basic.displayValue;
				matches = response.data.Response.allPvP.allTime.activitiesEntered.basic.displayValue;
				
				//Checking to make sure they've completed a raid
				if(response.data.Response.raid.allTime !== undefined){
					raids = response.data.Response.raid.allTime.activitiesCleared.basic.displayValue;
					raidTime = response.data.Response.raid.allTime.fastestCompletionMs.basic.displayValue;
				}
				//If they haven't, set raid and clear time to 0
				else{
					raids = 0;
					raidTime = "0:00.000";
				}
				
				link = snapshot.child('theStrat').val();
				//Forum display for if there's no strategy link given
				if(link === null){
					forum_list.innerHTML += '<div class="forum_layout">' 
					+ "<table class = 'top_table'>" 
					+ "<tr><th>" + snapshot.child('account').val() + "<th align = right>" + "PvP: " + KD + " KD " + " | " + matches + " Matches Played "
					+ '</tr></th>'
					
                    + "<tr><td>" + 'Level: ' + level + " | " + ' Power: ' + power + " | " + " Role: " + snapshot.child('user_type').val()+ " | " + "Strategy: " + 'N/A'
					
					+ "<td align = right>" + "<b>" + "PvE: " + raids + " Raids " + " | " + raidTime + " Fastest Time " + "</tr></td></b>"
					+ "</table><br>"
                    
					+ "<table class = 'mid_table' id='forum_post" + forum_counter + "'>"
					+ "<tr><td>" + snapshot.child("post").val() + "</td><tr><td>"
					+ snapshot.child('username').val()
					+ '</td><td><button type="button" onclick="accept_forum(' + forum_counter + ')>Accept post</button><td></tr></table>'
					+ '</div> <br><br>';
				}
				//Display for if there's a link given
				else{
					forum_list.innerHTML += '<div class="forum_layout">' 
					+ "<table class = 'top_table'>" 
					+ "<tr><th>" + snapshot.child('account').val() 
					+ "<th align = right>" + "PvP: " + KD + " KD " + " | " + matches + " Matches Played "
					+ '</tr></th>'
                    + "<tr><td>" + 'Level: ' + level + " | " + ' Power: ' + power + " | " + " Role: " + snapshot.child("user_type").val() + " | " + "Strategy: " + '<a href="' + link + '">Here</a>'
					
					+ "<td align = right>" + "<b>" + "PvE: " + raids + " Raids " + " | " + raidTime + " Fastest Time " + "</tr></td></b>"
					+ "</table><br>"
                    
					+ "<table class = 'mid_table' id='forum_post" + forum_counter + "'>"
					+ "<tr><td>" + snapshot.child("post").val() + "</td><tr><td>"
					+ snapshot.child('username').val()
					+ '</td><td><button type="button" onclick="accept_forum(' + forum_counter + ')">Accept post</button><td></tr></table>'
					
					+ '</div> <br><br>';
				}
				forum_counter = forum_counter + 1;
			});
		}); 
	});
	//}
}

document.querySelector('#submit_post').addEventListener('submit', post_request);

































