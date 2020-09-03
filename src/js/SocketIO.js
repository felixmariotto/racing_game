
import CLIENT from "socket.io-client";

//

const socket = CLIENT.connect();

// Good to test with webpack-dev-server :
// const socket = CLIENT.connect("https://ico-game.herokuapp.com/");

socket.on( 'ping', () => {

	console.log( 'ping ');

})

socket.on( 'game-started', () => {

	console.log('game started')

})

//

socket.emit( 'subscribe-next-game' );