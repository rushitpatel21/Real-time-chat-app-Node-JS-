const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
});

const users = {};
let num = 0;

io.on("connection", socket => {
    
    socket.on('new_users_joined', userName =>{
        users[socket.id] = userName;
        socket.broadcast.emit('user_joined',userName);
    });
    
    socket.on('send', msg  =>{
        socket.broadcast.emit('recevie', { message: msg , name: users[socket.id] });
    });
    
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});
