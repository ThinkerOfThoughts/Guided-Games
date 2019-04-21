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

	var result_window = window.open("user_profile.html");

	//alert(username);

	//TODO figure out how to transfer username into this function
	//TODO add code to put data from api into profile.html
	result_window.windows.getElementById('user_profile').innerHTML = '<div align="center"; style="background-color:#87DCFF; text-align:left; vertical-align: middle; padding:20px 47px; width:420px; margin:0 auto;" align="center"> Profile for </div>';
}
