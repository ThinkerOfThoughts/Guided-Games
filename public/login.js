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
		
		//populates user page with their information
		var dataref = firebase.database().ref("users/");
		dataref.orderByChild('email').equalTo(user.email).on("child_added", function(snapshot)
		{
			var section = document.getElementById("login");
			var owner = document.getElementById("core");
			owner.removeChild(section);
			var temp_name = snapshot.child("username").val();
			var temp_mail = user.email;
			
			//begins with pvp and pve info
			owner.innerHTML = owner.innerHTML + '<script src="appointment_handling.js"></script>'
				+ '<form id=\"user_info\"><div id="user_profile" align="center">'
				+ '<br><div class="profile_layout" align="center"><b>' 
				+ temp_name + '<br>' + snapshot.child("gamertag").val() + '<br>'
				+ 'Level: ' + snapshot.child("highest_level").val() + ' | Power: '
				+ snapshot.child("power_level").val() + ' | Role: ' 
				+ snapshot.child("user_type").val() + '</b></div>'
				+ '<table class="profile_pvp"><tbody><tr><td>PvP Stats: <br><br>'
				+ 'KD: ' + snapshot.child("overall_kd").val()
				+ '<br>Kills: ' + snapshot.child("pvp_kills").val()
				+ '<br>Matches: ' + snapshot.child("matches").val()
				+ '<br>Most Kills In A Game: ' + snapshot.child("most_kills_game").val()
				+ '<br>Longest Kill Streak: ' + snapshot.child("longest_streak").val()
				+ '<table class="profile_pve"><tbody><tr><td align="right">'
				+ 'PvE Stats:<br><br>'
				+ 'Raids Cleared: ' + snapshot.child("raids_cleared").val()
				+ '<br>Fastest Time(In Minutes): ' + snapshot.child("fastest_time").val()
				+ '<br></td></tr></tbody></table></td></tr></tbody></table></div></div></form>';
				
			//section that adds pending requests
			var counter = 0;
			owner.innerHTML += '<br><br><div class="forum_layout"><table id="pend_request"></table></div><br><br>';
			var pending_table = document.getElementById("pend_request");
			
			firebase.database().ref('pending_requests/').orderByChild("receiving").equalTo(temp_name).on("child_added", function(snapshot){
				//pending_table.innerHTML = pending_table.innerHTML;
			});
				
			//end of page.
			function logout(event)
			{
				firebase.auth().signOut().then(function() {
				  // Sign-out successful.
				}).catch(function(error) {
				  // An error happened.
				});
			}
			owner.innerHTML = owner.innerHTML + '<div align="center"><input type=\"submit\" name=\"submit-btn\" value=\"Logout\" class=\"button\" onclick="logout()"></div>';
			
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

