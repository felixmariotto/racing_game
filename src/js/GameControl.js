
import GameMap from './GameMap.js';
import Cars from './Cars.js';

//

function startGame( params, thisPlayerID ) {

	console.log( thisPlayerID )

	console.log( params )

	params.players.forEach( (player) => {

		Cars.createNew( player );

	});

	GameMap.createMap( params )

}

//

function updateGame( stepInfo, thisPlayerID ) {

	Cars.update( stepInfo );

	// console.log( thisPlayerID )

}

//

export default {
	startGame,
	updateGame
}