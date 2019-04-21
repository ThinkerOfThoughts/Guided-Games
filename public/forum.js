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
					post: purpose
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
	forum_list.innerHTML = forum_list.innerHTML + '<div style=\"background-color:#87DCFF; text-align:left; vertical-align: middle; padding:20px 47px; width:420px; margin:0 auto;\" align=\"left\">'
		+ snapshot.child("post").val() + ' : ' + snapshot.child('username').val() + '<br>';
});



document.querySelector('#submit_post').addEventListener('submit', post_request);









































