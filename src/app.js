const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');
const combatRoutes = require('./routes/combatRoutes');
const playerRoutes = require('./routes/playerRoutes');
const cardRoutes = require('./routes/cardRoutes');
const GameSocket = require('./sockets/gameSocket');
const PlayerSocket = require('./sockets/playerSocket');

const app = express();
const server = http.createServer(app);

// Configuração do CORS para Express
app.use(cors({
    origin: "http://127.0.0.1:5500", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Middleware
app.use(express.json());

// Rotas
app.use('/api/game', gameRoutes);
app.use('/api/card', cardRoutes);
app.use('/api/combat', combatRoutes);
app.use('/api/player', playerRoutes);


// Configuração do Socket.io com CORS
const io = new Server(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Configuração do Socket.io
io.on('connection', (socket) => {
    console.log('Novo jogador conectado:', socket.id);

    // Configurar eventos de jogo e jogador
    GameSocket(io, socket);
    PlayerSocket(io, socket);

    socket.on('disconnect', () => {
        console.log('Jogador desconectado:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = { app, server, io };