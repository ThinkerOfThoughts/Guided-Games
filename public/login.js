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

function sign_in(event)
{
	event.preventDefault();
	
	
	const form = event.target;
	const email = form.Email.value;
	const password = form.password.value;
	
	firebase.auth().signInWithEmailAndPassword(email, password).then(function(response){
		alert('Logged in!');
		window.location.href = './home.html';
	}).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorCode);
		alert(errorMessage);
	});
	
}

document.querySelector('#login').addEventListener('submit', sign_in);
