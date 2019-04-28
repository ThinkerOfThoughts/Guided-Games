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

function make_appointment(event)
{
	event.preventDefault();
	
	//grabs data from form
	const form = event.target;
	const year = parseInt(form.year.value);
	const month = parseInt(form.month.value);
	const day = parseInt(form.day.value);
	const hour = parseInt(form.hour.value);
	var minute = parseInt(form.minute.value);
	const other_user = form.other_user.value;
	const reason = form.reason.value;
	
	
	//checks for errors
	if(year < 2019)
		alert("Invalid Year!");
	else if(month < 0 || month > 12)
		alert("Invalid Month!");
	else if(month < 5 && year == 2019)
		alert("Invalid Month!");
	else if(day < 0 || day > 31)
		alert("Invalid Day");
	else if(hour < 0 || hour > 23)
		alert("Invalid Hour");
	else if(minute < 0 || minute > 59)
		alert("Invalid Minute");
	else if(reason == "")
		alert("Please provide an objective!");
	else
	{
		//checks for login
		firebase.auth().onAuthStateChanged(function(user) {
			if(user)
			{
				var dataref = firebase.database().ref("users/");
				
				
				//checks for minutes being less then 10
				if(minute < 10)
					minute = "0" + minute;
				
				//checks to see if username already exists and that the user is valid
				dataref.orderByChild('username').equalTo(other_user).once("value", function(snapshot){
					if(snapshot.exists())
						{
						dataref.orderByChild('email').equalTo(user.email).on("child_added", function(snapshot){
							let pending_requests = firebase.database().ref('pending_requests');
							const newKey = pending_requests.push().key;
							const cur_user = snapshot.child("username").val();
							console.log(cur_user);
							let newData = {
								sending:cur_user,
								receiving: other_user,
								year: year,
								month: month,
								day: day,
								minute: minute,
								hour: hour,
								objective: reason,
							}
							
							pending_requests.orderByChild("objective").equalTo(reason).once("value", function(snapshot){
								if(snapshot.exists())
								{
									alert("An invite for that objective already exists!");
								}
								else
								{
									//submits request to database
									firebase.database().ref('pending_requests/' + newKey).update(newData, function(error){
										if(error){
											alert(error);
										}
										else
										{
											alert('Request has been sent!');
											window.location.href = ("index.html");
										}
									});
								}
							});
						});
					}
					else
						alert("That user does not exist");
				});
			}
			else
			{
				alert("Please Login!");
			}
		});
		
	}
}


document.querySelector('#appointment').addEventListener('submit', make_appointment);



















