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
	var result_found = false;	//boolean to hold if a search result is found

	var new_window = window.open("search_results_test.html");

	//orderbychild('username') sorts results lexecographically by username, startAt(input).endAt(input+"\uf8ff") filters out things that 		//don't match whatever is in input, function(snapshot){whatever} does whatever is in the curly braces when results are found, in this 		//case; alert("user found: " + snapshot.child("email").val()) prints a users email address, this is simply a placeholder 

	dataref.orderByChild('username').startAt(input).endAt(input+"\uf8ff").on("child_added", function(snapshot) {
		new_window.document.getElementById('results').innerHTML += '<div style="background-color:#87DCFF; text-align:left; 			vertical-align: middle; padding:20px 47px; width:420px; margin:0 auto;" align="center">' + snapshot.child("username").val() + 			" : " + snapshot.child("email").val() + '</div> <br>  <br> ';
	});
	//TODO make reuslts clickable, clicking takes you to profile page
	//TODO make searchable by criteria other than just username
	//TODO return more usefull information than just username/email address
}
