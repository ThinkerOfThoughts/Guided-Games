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
  
//function to create user modelled after class example
function sign_up(event)
{
	event.preventDefault();
	
	const form = event.target;
	const email = form.Email.value;
	const password = form.password.value;
	const password2 = form.password2.value;
	const username = form.username.value;
	
	var dataref = firebase.database().ref("users/");
	
	dataref.orderByChild('username').equalTo(username).once("value", function(snapshot){
		if(!(snapshot.exists()))
		{
			
			if(password != password2)
			{
				alert("Passwords do not match!");
			}
			else if(username == "")
			{
				alert("Username is blank!");
			}
			else if(password == "")
			{
				alert("Password is blank!");
			}
			else if(email == "")
			{
				alert("Email is blank!");
			}
			else
			{
				firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
					let users = firebase.database().ref('users');
					const newKey = users.push().key;
					
					let newData = {
						username: username,
						email: email
					};
					
					firebase.database().ref('users/' + newKey).update(newData, function(error){
						if(error){
							alert(error);
						}
						else
						{
							alert('User has been created!');
							window.location.href = './index.html';
						}
					});
					
					
					
				}).catch(function(error){
					var errorCode = error.code;
					var errorMessage = error.message;
					alert(errorCode);
					alert(errorMessage);
				});
			}
		}
		else
			alert("Username already exists!");
	});
	
}

document.querySelector('#register').addEventListener('submit', sign_up);



















