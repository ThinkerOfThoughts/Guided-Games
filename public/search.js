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
	//get user input from the textbox with id searchbox
	var input = document.getElementById("searchbox").value;

    //advanced search is what actually does the seraching

    return advanced_search(input, 0);
}

//advance search, requires username, can use usertype
function advanced_search(input, usertype)
{
	var dataref = firebase.database().ref("users/");

	//TODO need to return usefull information, first usefull information must be in database

	//orderbychild('username') sorts results lexecographically by username, equalto(input) filters out things that don't match
	//whatever is in input, function(snapshot){whatever} does whatever is in the curly braces when results are found, in this case 			//alert("user found: " + snapshot.child("email").val()) prints a users email address, this is simply a placeholder 
	dataref.orderByChild('username').equalTo(input).on("child_added", function(snapshot) {
	 alert("users found: " + snapshot.child("email").val());
	});
    //usertype is an integer, 0 for all users, 1 for mentees, 2 for mentors
	if(usertype === 0)
	{
		//alert(input); //added for testing          
	}
	else if(usertype === 1)
	{

	}
	else if(usertype === 3)
	{

	}
}

//document.querySelector('#Searchtext').addEventListener('Search', basic_search);
