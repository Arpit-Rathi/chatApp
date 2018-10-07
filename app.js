const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static('./public'));

io.on('connection',function(socket){
    console.log('New User Connected');
    
    socket.on('join',function(params,callback){
        socket.join(params.chatroom);
        socket.broadcast.to(params.chatroom).emit('newUserConnected',{name: params.username});
        socket.emit('welcomeMessage');
    });
    
    socket.on('createMessage',function(newMsg){
        io.emit('newMessage',{
            name: newMsg.name,
            message: newMsg.message
        });
    });
    
    socket.on('disconnect',function(){
        console.log('User Disconnected');
//        socket.broadcast.to(params.chatroom).emit('userDisconnected');
    });
});

server.listen(3000,function(err){
    console.log("Server running on PORT 3000");
});