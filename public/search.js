/* 
 *handles basic and advanced searches
 */
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


//default basic search, can have username or nothing, in the event of nothing it returns everything
function basic_search()
{

    //advanced search is what actually does the seraching
	advanced_search(1);
};

//advance search, requires username, can use usertype
function advanced_search(searchtype)
{
	var input = "";
	let dataref = firebase.database().ref("users/");

	let new_window = window.open("search_results.html");


	var usernames = [];	//will hold usernames returned with each search result, seemed simpler than trying to figure out how to
					//backtrack

	var counter = 0;	//used to find stuff in usernames

	//searchtype means is being used to distinguis between basic and advanced searches
	if(searchtype === 1)
	{
		//get user input from the textbox with id searchbox
		if(document.getElementById("searchbox").value != null)
		{
			input = document.getElementById("searchbox").value;
		}

	//orderbychild('username') sorts results lexecographically by username, startAt(input).endAt(input+"\uf8ff") filters out things that 		//don't match whatever is in input, function(snapshot){whatever} does whatever is in the curly braces when results are found, in this 		//case; alert("user found: " + snapshot.child("email").val()) prints a users email address, this is simply a placeholder 

		dataref.orderByChild('username').startAt(input).endAt(input+"\uf8ff").on("child_added", function(snapshot)
		{
			usernames.push(snapshot.child("username").val());
			new_window.document.getElementById("results").innerHTML += '<div align="center"><button id="result_button' + counter + '"  onclick="profile(\'' + usernames[counter] + '\')" style="background-color:#87DCFF; text-align:left; vertical-align: middle; padding:20px 47px; width:420px; margin:0 auto;" align="center">' + usernames[counter] + " : " + snapshot.child("email").val() + '</button></div> <br>  <br> ';
			counter++;	//having this at the end avoids an off by one error
		});

	}
 	else if(searchtype === 2)
	{
		//handling data collection
		//default minimum values
		var matches = 0;
		var pvp_kills = 0;
		//var pvp_deaths = 0; //not going to be searchable
		var overall_kd = 0;
		var overall_kda_game = 0;
		var most_kills_game = 0;
		var longest_streak = 0;
		var win_loss = 0;
		var highest_level = 0;
		var power_level = 0;
		var raids_cleared = 0;
		//var fastest_time = "0";	//not currently searchable
		if(document.getElementById("advanced_searchbox").value != null)
		{
		input = document.getElementById("advanced_searchbox").value;
		}
		if(document.getElementById("matches").value != null)
		{
			matches = document.getElementById("matches").value;
		}

		if(document.getElementById("pvp_kills").value != null)
		{
			pvp_kills = document.getElementById("pvp_kills").value;
		}

		if(document.getElementById("overall_kd").value != null)
		{
			overall_kd = document.getElementById("overall_kd").value;
		}

		if(document.getElementById("overall_kda_game").value != null)
		{
			overall_kda_game = document.getElementById("overall_kda_game").value;
		}

		if(document.getElementById("most_kills_game").value != null)
		{
			most_kills_game = document.getElementById("most_kills_game").value;
		}

		if(document.getElementById("longest_streak").value != null)
		{
			longest_streak = document.getElementById("longest_streak").value;
		}

		if(document.getElementById("win_loss").value != null)
		{
			win_loss = document.getElementById("win_loss").value;
		}

		if(document.getElementById("highest_level").value != null)
		{
			highest_level = document.getElementById("highest_level").value;
		}

		if(document.getElementById("power_level").value != null)
		{
			power_level = document.getElementById("power_level").value;
		}

		if(document.getElementById("raids_cleared").value != null)
		{
			raids_cleared = document.getElementById("raids_cleared").value;
		}

//		if(document.getElementById("fastest_time").value != null)
//		{
//			fastest_time = document.getElementById("fastest_time").value;
//		}

		dataref.orderByChild('username').startAt(input).endAt(input+"\uf8ff").on("child_added", function(snapshot)
		{
			if(snapshot.child("matches").val() >= matches && snapshot.child("pvp_kills").val() >= pvp_kills && 				snapshot.child("overall_kd").val() >= overall_kd && snapshot.child("overall_kda_game").val() >= overall_kda_game && 			snapshot.child("most_kills_game").val() >= most_kills_game && snapshot.child("longest_streak").val() >= longest_streak 				&& snapshot.child("win_loss").val() >= win_loss && snapshot.child("highest_level").val() >= highest_level && 				snapshot.child("power_level").val() >= power_level && snapshot.child("raids_cleared").val() >= raids_cleared)// && 			snapshot.child("fastest_time").val() <= fastest_time)
			{
				usernames.push(snapshot.child("username").val());
			new_window.document.getElementById('results').innerHTML += '<div align="center"><button id="result_button' + counter + '"  onclick="profile(\'' + usernames[counter] + '\')" style="background-color:#87DCFF; text-align:left; vertical-align: middle; padding:20px 47px; width:420px; margin:0 auto;" align="center">' + usernames[counter] + " : " + snapshot.child("email").val() + '</button></div> <br>  <br> ';
			counter++;	//having this at the end avoids an off by one error

			}
		});
	}
	new_window.document.close();
}
