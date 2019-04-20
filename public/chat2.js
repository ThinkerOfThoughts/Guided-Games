var socket = io.connect('http://localhost:3000');

//Make some variables for the info we want in index.html
var username = document.getElementById('username');
var message = document.getElementById('message');
var btn = document.getElementById('send');
var output = document.getElementById('output');

//Emit the events
btn.addEventListener('click', function(){
	socket.emit('chat', {
		message:message.value,
		username:username.value
	});
});

//Listen for events
socket.on('chat', function(data){
	output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
	//console.log("data.username is ", data.username);

});
