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
	
	const form = event.target;
	const year = parseInt(event.year.value);
	const month = parseInt(event.month.value);
	const day = parseInt(event.day.value);
	const hour = parseInt(event.hour.value);
	const minute = parseInt(event.minute.value);
	const other_user = event.other_user.value;
	
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
	else
	{
		firebase.auth().onAuthStateChanged(function(user) {
			if(user)
			{
				var dataref = firebase.database().ref("users/");
				
				//checks to see if username already exists
				dataref.orderByChild('username').equalTo(other_user).once("value", function(snapshot){
					dataref.orderBychild('email').equalTo(user.email).once("value", function(snapshot2){
						let pending_requests = firebase.database().ref('pending_requests');
						const newKey = pending_requests.push().key;
						const cur_user = snapshot2.child("username").val();
						let newData = {
							sending:cur_user,
							receiving: other_user,
							year: year,
							month: month,
							day: day,
							minute: minute,
							hour: hour,
						}
					});
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



















