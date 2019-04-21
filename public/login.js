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

firebase.auth().onAuthStateChanged(function(user) {
	if(user)
	{
		
		var dataref = firebase.database().ref("users/");
		dataref.orderByChild('email').equalTo(user.email).on("child_added", function(snapshot)
		{
			var section = document.getElementById("login");
			var owner = document.getElementById("core");
			owner.removeChild(section);
			var temp_name = snapshot.child("username").val();
			var temp_mail = user.email;
			
			owner.innerHTML = owner.innerHTML + '<form id=\"user_info\"><div class=\"w3-row w3-padding-32\" align=\"center\">'
				+ '<div>' + temp_name + '</div><div>' + temp_mail + '</div>'
				+ '<div> Insert information about user\'s game character here </div>'
				+ '<input type=\"submit\" name=\"submit-btn\" value=\"Logout\" class=\"button\">'
				+ '</div></form>';
			function logout(event)
			{
				firebase.auth().signOut().then(function() {
				  // Sign-out successful.
				}).catch(function(error) {
				  // An error happened.
				});
			}
			document.querySelector('#user_info').addEventListener('submit', logout);
		});
	}
	else
	{
		function sign_in(event)
		{
			event.preventDefault();
			
			
			const form = event.target;
			const email = form.Email.value;
			const password = form.password.value;
			
			firebase.auth().signInWithEmailAndPassword(email, password).then(function(response){
				alert('Logged in!');
				window.location.href = './index.html';
			}).catch(function(error){
				var errorCode = error.code;
				var errorMessage = error.message;
				alert(errorCode);
				alert(errorMessage);
			});
			
		}

		document.querySelector('#login').addEventListener('submit', sign_in);
	}
});

