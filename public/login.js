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


function logout(event)
{
	firebase.auth().signOut().then(function() {
		window.location.href = './index.html';
	}).catch(function(error) {
	  // An error happened.
	});
}

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
			owner.innerHTML = owner.innerHTML
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
				+ '<br> Misc: '
				+ '<br>Rating: ' + snapshot.child("rating").val()
				+ '<br><a href=\"./communication.html\">Send a request</a>'
				+ '<br></td></tr></tbody></table></td></tr></tbody></table></div></div></form>';
				
			//logout button
			owner.innerHTML = owner.innerHTML + '<div align="center"><input type=\"submit\" name=\"submit-btn\" value=\"Logout\" class=\"button\" onclick="logout()"></div>';
				
			//section that adds pending requests
			var counter = 0;
			firebase.database().ref('pending_requests/').orderByChild("receiving").equalTo(temp_name).on("child_added", function(snapshot){
				owner.innerHTML = owner.innerHTML + '<br><br><div class="request_layout"><table id="pend_request' + counter + '">'
					+ '<tr>Pending: </tr><tr>At: ' + snapshot.child("year").val() + '-' + snapshot.child("month").val() + '-'
					+ snapshot.child("day").val() + ', ' + snapshot.child("hour").val() + ':'
					+ snapshot.child("minute").val() + '</tr>'
					+ '<tr><td width="150px">' + snapshot.child("objective").val() + '</td><td width="75px">' + snapshot.child("sending").val() 
					+ '</td><td width="75px"><button type="button" onclick="accept_request(' + counter + ')">Accept</button></td>'
					+ '<td width="75px"><button type="button" onclick="refuse_request(' + counter + ')">Refuse</button></td></tr></table></div>'
					+ '';
				counter = counter + 1;
				//console.log(pending_table.innerHTML);
			});
			
			//checks for requests that a user has accepted
			var r_counter = 0;
			firebase.database().ref('accepted_requests').orderByChild("receiving").equalTo(temp_name).on("child_added", function(snapshot){
				owner.innerHTML = owner.innerHTML + '<br><br><div class="request_layout"><table id="receiv_request' + r_counter + '">'
					+ '<tr>Received: </tr><tr>At: ' + snapshot.child("year").val() + '-' + snapshot.child("month").val() + '-'
					+ snapshot.child("day").val() + ', ' + snapshot.child("hour").val() + ':'
					+ snapshot.child("minute").val() + '</tr>'
					+ '<tr><td width="150px">' + snapshot.child("objective").val() + '</td><td width="75px">' + snapshot.child("sending").val() 
					+ '</td><td><button type="button" onclick="sender_rating(' + r_counter + ')">Rate Player</button></td></tr></table></div>'
					+ '';
				r_counter = r_counter + 1;
			});
			
			//checks for requests that the users has sent
			var s_counter = 0;
			firebase.database().ref('accepted_requests').orderByChild("sending").equalTo(temp_name).on("child_added", function(snapshot){
				owner.innerHTML = owner.innerHTML + '<br><br><div class="request_layout"><table id="sent_request' + s_counter + '">'
					+ '<tr>Sent: </tr><tr>At: ' + snapshot.child("year").val() + '-' + snapshot.child("month").val() + '-'
					+ snapshot.child("day").val() + ', ' + snapshot.child("hour").val() + ':'
					+ snapshot.child("minute").val() + '</tr>'
					+ '<tr><td width="150px">' + snapshot.child("objective").val() + '</td><td width="75px">' + snapshot.child("receiving").val() 
					+ '</td></tr></table></div>';
				//	+ '<td><button type="button" onclick="receiver_rating(' + s_counter + ')">Rate Player</button></td>'
				//	+ '';
				s_counter = s_counter + 1;
			});
			
			
			
			
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

