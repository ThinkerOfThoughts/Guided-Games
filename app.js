//Required tools
const express = require('express');
const socket = require('socket.io');
const path = require('path');

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












