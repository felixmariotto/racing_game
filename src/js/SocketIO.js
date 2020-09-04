
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
	subscribeNextGame
}