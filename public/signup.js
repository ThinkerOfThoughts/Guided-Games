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
	
	if(password != password2)
	{
		alert("Passwords do not match!");
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
					window.location.href = './home.html';
				}
			});
			
			
			
		}).catch(function(error){
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorCode);
			alert(errorMessage);
		});
		//const url = new URL('http://localhost:3000/register');
		//let params = {username: username, email: email};
	}
	
}

document.querySelector('#register').addEventListener('submit', sign_up);



















