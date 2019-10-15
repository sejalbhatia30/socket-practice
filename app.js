var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){// when new user-- connects to our server
  console.log('a user connected');
  socket.on('disconnect', function(){ // when user diconnects- 
    console.log('user disconnected');
  });
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
socket.on('chat message', function(msg){
  const ans=nltk(msg);
  io.emit('chat message', msg);
    io.emit('chat message', JSON.stringify(ans));
  });
});

const fetch = require('node-fetch');
function nltk(query) {

    return new Promise((resolve, reject) => {

        const q = encodeURIComponent(query);
        const uri = 'https://api.wit.ai/message?q=' + q;
        CLIENT_TOKEN = 'IZI3LG7UCXX4RLRKIDW4R3G5RKYR2O42'
        const auth = 'Bearer ' + CLIENT_TOKEN;
        fetch(uri, { headers: { Authorization: auth } })
            .then(res => res.json())
            .then((res)=>{
               
                resolve(res)

            });

    });

}




http.listen(3000, function(){
  console.log('listening on *:3000');
});