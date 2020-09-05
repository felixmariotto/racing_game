const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const params = require('./modules/params.js');
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

	client.on( 'disconnect', () => {

		console.log( `User ${ client.id } disconnected.` );

		if ( client.game ) {

			gameControl.removePlayer( client );

		}

	})

	client.on( 'subscribe-next-game', () => {

		gameControl.subscribeToNextGame( client );

	})

	client.on( 'throttle-up', () => {

		gameControl.throttlePlayerUp( client );

	})

	client.on( 'throttle-down', () => {

		gameControl.throttlePlayerDown( client );

	})

	client.on( 'request-boost', () => {

		console.log('boost');

	})

	client.on( 'move-up', () => {

		gameControl.movePlayerUp( client );

	})

	client.on( 'move-down', () => {

		gameControl.movePlayerDown( client );

	})

	client.on( 'stop-move-up', () => {

		gameControl.stopMovePlayerUp( client );

	})

	client.on( 'stop-move-down', () => {

		gameControl.stopMovePlayerDown( client );

	})

})

gameControl.takeSocketInScope( io );

function notifyGameStarted( clients, params ) {

	clients.forEach( (client) => {

		client.emit( 'game-started', params );

	})

}

function sendTimeBeforeGame( secBeforeGame ) {

	io.emit( 'time-before-game', secBeforeGame );

}

// GAME

function startGame() {

	const [ clients, params ] = gameControl.startGame();

	notifyGameStarted( clients, params );

}

let startCounter = 0;

startGame();

setInterval( () => {

	startCounter ++

	if ( startCounter >= params.SEC_BEFORE_START ) {

		startGame();

		startCounter = 0;

	} else {

		sendTimeBeforeGame( params.SEC_BEFORE_START - startCounter )
		
	}

}, 1000 );