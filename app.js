//Required tools
const express = require('express');
const socket = require('socket.io');
const path = require('path');
var axios = require('axios');

//Set up app and porting
const app = express();

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => console.log('server started on port ' + PORT));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Set up socket
const io = socket(server);

io.on('connection', function(socket){
	console.log("made socket connection", socket.id);
	
	
	socket.on('chat', function(data){
		io.emit('chat', data);
		
	});
});

/*
//Header used to pass the key with each GET request
var config = {
  headers: {'X-Api-Key': 'd252a2c04c9b4dc6960daffda4a3e435'}
};

//var url = 'https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/'

// Performing a GET request
axios.get('https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/-1/' + 'dattowatto', config)
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log("Datto's name is ", response.data.Response[0].displayName);
});  
*/






