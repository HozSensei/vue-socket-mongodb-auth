let express = require('express');
let app = express();
let server = app.listen(8081, function() {
    console.log('server running on port 8081');
});

const urlMongoDB = "MONGODBATLASURL";
let mongoose = require('mongoose');
mongoose.connect(urlMongoDB);

const Logs = mongoose.model('Logs', { name: String, io: String, gameId: String });


// Setup socket.io
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

io.on('connection', async (socket) => {
    // Use IO to send to all/private user
    // Use socket to communicate to the server
    /* 
    BRAINSTORM
    .on connection, stocker le socket id, associez avec l'id user frontend
    pour pouvoir communiquez spécifiquement aux utilisateurs
    */
    
    const log = new Logs({ name: 'HozSensei', io: socket.io, gameId: 'Quelques chose' });
    const newLog = await log.save();

    const searchLog = Logs.find({io: socket.io});

    socket.on('SEND_MESSAGE', (data) => {
        console.log(data);

        // To specific user
        io.to(socket.id).emit('MESSAGE', 'Bien reçu');

        // To current user
        socket.emit('MESSAGE', 'Bien reçu 2');
    });

    socket.on('disconnect', async () => {
        const deleteLog = await Logs.deleteOne({io: socket.io});
        console.log(deleteLog);
        console.log('user disconnected');
    });

});