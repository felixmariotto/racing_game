
module.exports = {
	startGame,
	subscribeToNextGame
}

//

let waitingClients = [];

//

function startGame() {

	waitingClients.forEach( (client) => {

		console.log( client.id + ' start a game' )

	});

	waitingClients = [];

}

//

function subscribeToNextGame( client ) {

	waitingClients.push( client );

}