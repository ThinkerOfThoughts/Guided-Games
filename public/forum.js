//I'm using Browserify to allow requires -> this file will be bundled into bundle.js for use in forum.html
var axios = require('axios');
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

function post_request(event)
{
	event.preventDefault();

	const form = event.target;
	const acct = form.user.value; 
	const purpose = form.request.value;

	firebase.auth().onAuthStateChanged(function(user) {
		if(user)
		{
			var dataref = firebase.database().ref("users/");
			dataref.orderByChild('email').equalTo(user.email).on("child_added", function(snapshot){
				let forum = firebase.database().ref('forum');
				const newKey = forum.push().key;
				const usernm = snapshot.child("username").val();
				
				let newData = {
					username: usernm,
					post: purpose,
					account: acct
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

var forum_list = document.getElementById("forum_posts");

var dataref = firebase.database().ref("forum/");
dataref.orderByChild('username').startAt("").endAt("\uf8ff").on("child_added", function(snapshot){
	//NOTE -> I've copied a lot of the comments from testAPI to clarify things, but you can check there for more details
	
	//Header used to pass the key with each GET request
	var options = {
		headers: {'X-Api-Key': 'd252a2c04c9b4dc6960daffda4a3e435'}
	};

	//Base API url, to be concatinated w/ further info to get specific data
	var base_url = 'https://www.bungie.net/Platform/Destiny2/';

	// Performing a GET request
	axios.get(base_url + 'SearchDestinyPlayer/-1/' + snapshot.child('account').val(), options)
		.then(function(response){
		console.log("The name is", response.data.Response[0].displayName);
		//Store account ID and user type (Xbox/PSN/BNET) for use in stat fetch
		var ID = response.data.Response[0].membershipId;
		var type = response.data.Response[0].membershipType;
	
		axios.get(base_url + type + '/Account/' + ID + '/Character/0/Stats/?modes=None', options)
			.then(function(response){
			//Storing fetched data
			level = response.data.Response.allPvE.allTime.highestCharacterLevel.basic.displayValue;
			power = response.data.Response.allPvE.allTime.highestLightLevel.basic.displayValue;
			KD = response.data.Response.allPvP.allTime.killsDeathsRatio.basic.displayValue;
			matches = response.data.Response.allPvP.allTime.activitiesEntered.basic.displayValue;
			raids = response.data.Response.raid.allTime.activitiesCleared.basic.displayValue;
			raidTime = response.data.Response.raid.allTime.fastestCompletionMs.basic.displayValue;
			
			forum_list.innerHTML = forum_list.innerHTML + '<div style=\"background-color:#87DCFF; text-align:left; vertical-align: middle; padding:20px 47px; width:420px; margin:0 auto;\" align=\"left\">'
			+ snapshot.child("post").val() + ' : ' + snapshot.child('username').val() + ' : ' + snapshot.child('account').val() 
			+ '<br>' + "Level: " + level + " Power: " + power + "<br>"
			+ "PvP: " + KD + " KD " + " - " + matches + " Matches Played " + '<br>'
			+ "PvE: " + raids + " Raid Clears " + " - " + raidTime + " Fastest Time " +  '<br>';
		});
	
	});  
});

document.querySelector('#submit_post').addEventListener('submit', post_request);

































