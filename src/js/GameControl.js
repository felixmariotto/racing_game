
import GameMap from './GameMap.js';
import Cars from './Cars.js';

import Camera from './core/Camera.js';

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

	const thisPlayer = stepInfo.players.find( (player) => {
		return player.client && player.client === thisPlayerID
	});

	Camera.setCameraTargetPos( thisPlayer.position );

	Cars.update( stepInfo );

	// console.log( thisPlayer )

}

//

export default {
	startGame,
	updateGame
}