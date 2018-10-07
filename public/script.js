var socket = io();
            
var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("username");
document.querySelector("#name").value = c;

var c = url.searchParams.get("chatroom");
document.querySelector("#chatRoomName").innerText = c;

console.log(c);

socket.on('connect',function(){
    var params = jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err){
        if(err)
            console.log(err);
        else{}
    });
    console.log('Connected to the server'); 
});
            
socket.on('disconnect',function(){
    $("#chatList").append('<li class="admin">YOU HAVE BEEN REMOVED FROM THE CHAT</li>');
    console.log('Server down');
});

socket.on('userDisconnected',function(){
    $("#chatList").append('<li class="admin">USER LEFT THE CHAT</li>');
});

function sendMessage(){
    socket.emit('createMessage',{
        name: document.querySelector("#name").value,
        message: document.querySelector("#msg").value,
        createdAt: 123
    });
    document.querySelector("#msg").value = "";
    return false;
}

socket.on('newUserConnected',function(data){
    console.log(data);
    $("#chatList").append('<li class="admin">'+data.name+' JOINED THE CHAT</li>');
    console.log("New User Connected");
});

socket.on('welcomeMessage',function(){
    $("#chatList").append('<li class="admin">WELCOME TO THE CHAT</li>');
    console.log("Welcome User");
});

socket.on('newMessage',function(message){
    var msg = message.message;
    var t1 = 'me';
    var t2 = 'me-text';
    var t3 = 'left';
    console.log(message.name);
    console.log(document.querySelector("#name"));
    if(message.name!=document.querySelector("#name").value){
        t1 = 'others';
        t2 = 'others-text';
        t3 = 'right';
        console.log('HELLO');
    }
    var string = '<li class='+t1+'><div class='+t2+'><small style="color: rgba(10,10,10,0.4); float:'+t3+ ';">'+message.name+'</small><br>'+msg+'</div></li>';
    
    $("#chatList").append(string);
    
    
    
    
   $('#chatList').animate({scrollTop: $('#chatList').prop("scrollHeight")}, 500);
    
    
    console.log("You have a message from : ",message.name);
});
console.log(socket);