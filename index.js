// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
}).on('connection', function(socket){
    console.log('Connection established from: ' + socket.address().address + ' : ' + socket.address().port + ' - version: ' + socket.address().family);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

//users = [];

var socket = require('socket.io').listen(server);

socket.sockets.on('connection', function (socket) {
	//socket.broadcast.emit('users', users);
	
	socket.on('init', function (data) {	
		socket.emit('init', 'Connected to Dispatch Server');		 
		//socket.emit('users', users);
	});	
	
	//socket.on('name', function (name) {	
	//	var nameAvailable = true;	
	//	try{	
	//		users.forEach(function(val, index, users){			
	//			if(val.userName == name){					
	//				nameAvailable = false;
	//			}		
	//		});	
	//	}finally{
	//		if(nameAvailable){
	//			users.push({id: socket.id, userName: name});	
	//			socket.broadcast.emit('name', {id: socket.id, userName: name});
	//			console.log(name + ' connected.');
	//			socket.emit('validName', name);				
	//		}else{
	//			socket.emit('invalidName', name);
	//		}		
	//	}
  // });

	socket.on('order', function (data) {	
		console.log('new Order from: ' + data.name);
		socket.emit('order', data.order);
		//socket.broadcast.emit('chatMsg', data.userName + ' says: ' + data.msg);		
   });

	//socket.on("disconnect", function () {	
		//users.forEach(function(val, index, users){			
			//if(val.id == socket.id){			
				//console.log(val.name + ' disconnected.');
				//users.splice(index,1);
				//socket.broadcast.emit('chatMsg', val.userName + ' disconnected.');
				//socket.broadcast.emit('userDisconnect', val.id);			
			//}		
		//});
	//});
        
});