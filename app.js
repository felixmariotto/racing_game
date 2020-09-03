const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const gameControl = require('./modules/GameControl.js');

// EXPRESS

const PORT = process.env.PORT || 8080;

const app = express()

	.use( express.static( path.join( __dirname, 'dist' ) ) )

	.get('/', (req, res) => {

		res.sendFile( path.join( __dirname, 'dist/index.html' ) );

	})

	.listen( PORT, () => {

		console.log( 'App listening on port ' + PORT );

	})

// SOCKET.IO

const io = socketIO( app );

io.on( 'connection', (client) => {

	console.log( `User ${ client.id } connected.` );

	client.on( 'subscribe-next-game', () => {

		gameControl.subscribeToNextGame( client );

	})

})

function notifyGameStarted( clients ) {

	clients.forEach( (client) => {

		client.emit( 'game-started' );

	})

}

// GAME

notifyGameStarted( gameControl.getRegisteredClients() );

setInterval( () => {

	notifyGameStarted( gameControl.getRegisteredClients() );

}, 1000 );