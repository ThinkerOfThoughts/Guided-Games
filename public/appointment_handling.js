//function for accepting invitations
function accept_request(row_number)
{
	var request_name = document.getElementById("pend_request" + row_number).rows[2].cells[0].innerHTML;
	firebase.database().ref('pending_requests/').orderByChild('objective').equalTo(request_name).once("child_added", function(snapshot){
		var day = snapshot.child("day").val();
		var month = snapshot.child("month").val();
		var year = snapshot.child("year").val();
		var hour = snapshot.child("hour").val();
		var minute = snapshot.child("minute").val();
		var sender = snapshot.child("sending").val();
		var receiver = snapshot.child("receiving").val();
		var removal = "pending_requests/" + snapshot.key;
		
		let accepted_requests = firebase.database().ref('accepted_requests');
		var newKey = accepted_requests.push().key;
		let newData = {
			day:day,
			month:month,
			year:year,
			hour:hour,
			minute:minute,
			sending:sender,
			receiving:receiver,
			objective: request_name,
		};
		
		firebase.database().ref('accepted_requests/' + newKey).update(newData, function(error){
			if(error){
				alert(error);
			}
			else
			{
				alert('Request has been accepted!');
				firebase.database().ref(removal).remove();
				window.location.href = './index.html';
			}
		});
	});
}

//function for declining invitations
function refuse_request(row_number)
{
	var request_name = document.getElementById("pend_request" + row_number).rows[2].cells[0].innerHTML;

	//declined invitation is deleted
	firebase.database().ref('pending_requests/').orderByChild("objective").equalTo(request_name).once("child_added", function(snapshot){
		firebase.database().ref("pending_requests/" + snapshot.key).remove();
		window.location.href = ("index.html");
	});
}


//following functions are for rating other players
function sender_rating(r_counter)
{
	var request_name = document.getElementById("receiv_request" + r_counter).rows[2].cells[0].innerHTML;
	var person_rated = document.getElementById("receiv_request" + r_counter).rows[2].cells[1].innerHTML;
	console.log(person_rated);
	
	//gets the new rating
	var rating = parseInt(prompt("Please enter a rating for the other player (0-5):"));
	while(rating > 5 || rating < 0)
		rating = parseInt(prompt("Please enter a valid rating (0-5):"));
	
	//finds the user and updates their info
	firebase.database().ref("users").orderByChild("username").equalTo(person_rated).once("child_added", function(snapshot){
		var num_rating = snapshot.child("num_ratings").val();
		var cur_rating = snapshot.child("rating").val();
		cur_rating = cur_rating * num_rating;
		cur_rating = cur_rating + rating;
		cur_rating = cur_rating / (num_rating + 1);
		num_rating = num_rating + 1;
		var updates = {};
		firebase.database().ref('users/' + snapshot.key).set({
			rating:cur_rating,
			num_ratings:num_rating,
			email:snapshot.child("email").val(),
			fastest_time:snapshot.child("fastest_time").val(),
			gamertag:snapshot.child("gamertag").val(),
			highest_level:snapshot.child("highest_level").val(),
			longest_streak:snapshot.child("longest_streak").val(),
			matches:snapshot.child("matches").val(),
			most_kills_game:snapshot.child("most_kills_game").val(),
			overall_kd:snapshot.child("overall_kd").val(),
			overall_kda_game:snapshot.child("overall_kda_game").val(),
			platform:snapshot.child("platform").val(),
			power_level:snapshot.child("power_level").val(),
			pvp_deaths:snapshot.child("pvp_deaths").val(),
			pvp_kills:snapshot.child("pvp_kills").val(),
			raids_cleared:snapshot.child("raids_cleared").val(),
			user_type:snapshot.child("user_type").val(),
			username:snapshot.child("username").val(),
			win_loss:snapshot.child("win_loss").val(),
		});
		
		//deletes the request
		firebase.database().ref("accepted_requests").orderByChild("objective").equalTo(request_name).once("child_added", function(snapshot){
			firebase.database().ref("accepted_requests/" + snapshot.key).remove();
			window.location.href = "index.html";
		});
	});
}


//as of now defunct
/*
function receiver_rating(s_counter)
{
	var request_name = document.getElementById("sent_request" + s_counter).rows[2].cells[0].innerHTML;
	var person_rated = document.getElementById("sent_request" + s_counter).rows[2].cells[1].innerHTML;
}*/

//function to turn forum post into appointment
function accept_forum(forum_counter)
{
	var objective = document.getElementById("forum_post" + forum_counter).rows[0].cells[0].innerHTML;
	var username = document.getElementById("forum_post" + forum_counter).rows[1].cells[0].innerHTML;
	
	//checks to see if user is logged in
	firebase.auth().onAuthStateChanged(function(user) {
		if(user)
		{
			//receives date from user
			alert("You will be prompted to input the following values to meetup: Year, Month, Day, Hour, Minute");
			var year = parseInt(prompt("Please input a year"));
			while(year < 2019)
				year = parseInt(prompt("Please input a valid year"));
			var month = parseInt(prompt("Please input a month"));
			while((month < 0 || month > 12) || (month < 5 && year == 2019))
				month = parseInt(prompt("Please input a valid month"));
			var day = parseInt(prompt("Please input a day"));
			while(day < 0 || day > 31)
				day = parseInt(prompt("Please inupt a valid day"));
			var hour = parseInt(prompt("Please input an hour"));
			while(hour < 0 || hour > 23)
				hour = parseInt(prompt("Please input a valid hour"));
			var minute = parseInt(prompt("Please input a minute of the hour"));
			while(minute < 0 || minute > 59)
				minute = parseInt(prompt("Please input a valid minute of the hours"));
		
		
			//pulls current users username
			firebase.database().ref("users/").orderByChild("email").equalTo(user.email).once("child_added", function(snapshot){
				var cur_user = snapshot.child("username").val();
				
				//add request to database
				let pending_requests = firebase.database().ref("pending_requests");
				const newKey = pending_requests.push().key;
				let newData = {
					year:year,
					month:month,
					day:day,
					hour:hour,
					minute:minute,
					objective:objective,
					receiving:username,
					sending:cur_user,
				};
				
				//pushes request into stack
				firebase.database().ref('pending_requests/' + newKey).update(newData, function(error){
					if(error){
						alert(error);
					}
					else
					{
						alert('Request has been sent');
						window.location.href = './forum.html';
					}
				});
				
				//removes the post from the forum
				firebase.database().ref('forum/').orderByChild('post').equalTo(objective).once("child_added", function(snapshot){
					firebase.database().ref('forum/' + snapshot.key).remove();
				});
				
			});
		}
		else
		{
			alert("Please login first!");
			window.location.href = "./index.html";
		}
	});
}


















