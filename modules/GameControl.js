
const buildMap = require('./buildMap.js');
const updateGame = require('./updateGame.js');
const params = require('./params.js');

//

let io;

function takeSocketInScope( socketObject ) {

	io = socketObject;

}

let waitingClients = [];

const ongoingGames = {};

//

let previousTime = Date.now();

setInterval( () => {

	const currentTime = Date.now();

	const delta = currentTime - previousTime;

	previousTime = currentTime;

	const speedRatio = delta / ( ( 1 / params.GAME_LOOP_FPS ) * 1000 );

	gameLoop( speedRatio )

}, ( 1 / params.GAME_LOOP_FPS ) * 1000 );

function gameLoop( speedRatio ) {

	for ( let gameID of Object.keys( ongoingGames ) ) {

		const game = ongoingGames[ gameID ];

		updateGame( game, speedRatio )
		.then( (stepInfo) => {

			// check which players finished the track

			game.players.forEach( (player) => {

				if ( player.hasFinished ) return

				if ( player.position.x > params.TRACK_LENGTH ) {

					player.hasFinished = true;

					game.ranking.push( player );

					if ( game.ranking.length >= params.PLAYERS_NUMBER ) {

						terminateGame( game.id );

					}

				}

			})

			// emit info to clients

			io.to( game.id ).emit( 'step-info', stepInfo );

		})

	}

};

//

function startGame() {

	const gameID = ( Math.random() * 10000000 ).toFixed(0);

	const clients = waitingClients.slice( 0 );

	waitingClients = [];

	// create a player object for each client waiting

	const players = [];

	clients.forEach( (client, i) => {

		players.push({
			isNPC: false,
			id: i,
			client: client.id
		});

		client.game = gameID;

	})

	// abort if no player requested a game
	if ( players.length === 0 ) return [ [], null ];

	// add NPCs to reach the fixed number of players

	const npcsNeeded = params.PLAYERS_NUMBER - players.length;

	for ( let i=0 ; i<npcsNeeded ; i++ ) {

		players.push({
			isNPC: true,
			id: players.length
		})

	}

	/*
	position each player including NPCs.
	positions are 3D vectors [ x, y, z ].
	y is up.
	*/

	players.forEach( (player, i) => {

		player.position = {
			x: i,
			y: 0,
			z: ( ( i % 2 ) * (params.TRACK_WIDTH / 3) ) + (params.TRACK_WIDTH / 3)
		}

	})

	// create game object

	const initTime = Date.now();
	const departureTime = initTime + params.LAPS_BEFORE_DEPARTURE;

	const newGame = {
		track: buildMap(),
		id: gameID,
		ranking: [],
		initTime,
		departureTime,
		players
	}

	ongoingGames[ gameID ] = newGame;

	// subscribe playing clients to a new room

	clients.forEach( client => client.join( gameID ) )

	//

	return [ clients, newGame ]

}

//

function subscribeToNextGame( client ) {

	// check that the client is not already subscribed to a game

	if ( waitingClients.indexOf( client ) > -1 || client.game !== undefined ) return

	//

	waitingClients.push( client );

}

//

function terminateGame( gameID ) {

	const game = ongoingGames[ gameID ];

	console.log( 'terminate game ', gameID );

	// broadcast finish event and ranking

	io
	.to( gameID )
	.emit( 'game-finished', {
		ranking: game.ranking
	})

	// unsubscribe players from this game

	game.players.forEach( (player) => {

		if ( !player.isNPC ) {

			io.sockets.sockets[ player.client ].game = undefined;

		}

	})

	// delete game from the ongoingGames object

	delete ongoingGames[ gameID ]

}

//

function removePlayer( client ) {

	const players = ongoingGames[ client.game ].players;

	const playerIndex = players.findIndex( (player) => {
		return !player.isNPC && player.client === client.id
	})

	players.splice( playerIndex, 1 );

	// check if there is still a non-NPC player in this game,
	// if not, then terminate the game

	if ( players.find( (player) => !player.isNPC ) === undefined ) {

		terminateGame( client.game );

	}

}

/*
called when on user input,
set a variable in game.players[ player ] object,
when will be looked up for when computing player position
in the game loop
*/

function movePlayer( client, attribute, bool ) {

	const game = ongoingGames[ client.game ];

	if ( !game ) return

	const gamePlayer = game.players.find( player => player.client && player.client === client.id )

	gamePlayer[ attribute ] = bool;

}

//

function movePlayerUp( client ) { movePlayer( client, 'movingUp', true ) }

function movePlayerDown( client ) { movePlayer( client, 'movingDown', true ) }

function stopMovePlayerUp( client ) { movePlayer( client, 'movingUp', false ) }

function stopMovePlayerDown( client ) { movePlayer( client, 'movingDown', false ) }

//

module.exports = {
	startGame,
	subscribeToNextGame,
	takeSocketInScope,
	movePlayerUp,
	movePlayerDown,
	stopMovePlayerUp,
	stopMovePlayerDown,
	removePlayer
}