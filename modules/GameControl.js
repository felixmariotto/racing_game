
const buildMap = require('./buildMap.js');

// game params

const PLAYERS_NUMBER = 6;

const LAPS_BEFORE_DEPARTURE = 2000; // in ms

const GAME_LOOP_FPS = 120;

//

let waitingClients = [];

const ongoingGames = [];

//

let previousTime = Date.now();

setInterval( () => {

	const currentTime = Date.now();

	const delta = currentTime - previousTime;

	previousTime = currentTime;

	gameLoop( delta )

}, ( 1 / GAME_LOOP_FPS ) * 1000 );

function gameLoop( msDelta ) {

	

}

//

function startGame() {

	const clients = waitingClients.slice( 0 );

	waitingClients = [];

	// create a player object for each client waiting

	const players = [];

	clients.forEach( (client, i) => {

		players.push({
			isNPC: false,
			gameID: i,
			client: client.id
		});

	})

	// abort if no player requested a game
	if ( players.length === 0 ) return [ [], null ];

	// add NPCs to reach the fixed number of players

	const npcsNeeded = PLAYERS_NUMBER - players.length;

	for ( let i=0 ; i<npcsNeeded ; i++ ) {

		players.push({
			isNPC: true,
			gameID: players.length
		})

	}

	// create game object

	const initTime = Date.now();
	const departureTime = initTime + LAPS_BEFORE_DEPARTURE;

	const newGame = {
		track: buildMap(),
		initTime,
		departureTime,
		players
	}

	ongoingGames.push( newGame );

	//

	return [ clients, newGame ]

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