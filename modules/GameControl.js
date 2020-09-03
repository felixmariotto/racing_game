
module.exports = {
	getRegisteredClients,
	subscribeToNextGame
}

//

let waitingClients = [];

//

function getRegisteredClients() {

	const clients = waitingClients.slice( 0 );

	waitingClients = [];

	return clients

}

//

function subscribeToNextGame( client ) {

	waitingClients.push( client );

}