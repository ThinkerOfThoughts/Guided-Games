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


//retrieves the data from the api using the provided username
function profile(username)
{
	//remove when sending data is fixed
	username = "test1";

	let profile_window = window.open("user_profile.html", "Profile", "");

	//TODO figure out how to transfer username into this function
	//TODO add code to put data from api into user_profile.html
	profile_window.window.onload = function() {
	profile_window.document.getElementById("user_profile").innerHTML += '<div class = "strange_issue" align="center"> testing testing testing </div>';
	};

	result_window.document.close();
};
