
const buidMap = require('./buildMap.js');

//

let waitingClients = [];

//

function startGame() {

	const clients = waitingClients.slice( 0 );

	waitingClients = [];

	return [ clients, buidMap() ]

}

//

function subscribeToNextGame( client ) {

	waitingClients.push( client );

}

//

module.exports = {
	startGame,
	subscribeToNextGame
}