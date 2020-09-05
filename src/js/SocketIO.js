
import CLIENT from "socket.io-client";

import GameControl from './GameControl.js';
import UI from './UI.js';

//

// const socket = CLIENT.connect();

// Good to test with webpack-dev-server :
const socket = CLIENT.connect("https://f-0-racing.herokuapp.com/");

socket.on( 'time-before-game', ( secBeforeGame ) => {

	UI.printTimeLeft( secBeforeGame );

});

socket.on( 'step-info', ( stepInfo ) => {

	GameControl.updateGame( stepInfo, socket.id );

});

socket.on( 'game-finished', ( info ) => {

	GameControl.finishGame( info );

})

//

function sendMoveUp() { socket.emit('move-up') }

function sendMoveDown() { socket.emit('move-down') }

function sendStopMoveUp() { socket.emit('stop-move-up') }

function sendStopMoveDown() { socket.emit('stop-move-down') }

//

function subscribeNextGame() {

	return new Promise( (resolve) => {

		socket.emit( 'subscribe-next-game' );

		socket.on( 'game-started', ( params ) => {

			UI.hideHomeScreen();

			GameControl.startGame( params, socket.id );

			resolve();

		})

	})

}

export default {
	subscribeNextGame,
	sendMoveUp,
	sendMoveDown,
	sendStopMoveUp,
	sendStopMoveDown
}