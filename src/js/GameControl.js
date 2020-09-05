
import GameMap from './GameMap.js';
import Cars from './Cars.js';
import UI from './UI.js';

import Camera from './core/Camera.js';

//

let playerID;

function startGame( params, thisPlayerID ) {

	playerID = thisPlayerID;

	console.log( thisPlayerID )

	console.log( params )

	params.players.forEach( (player) => {

		Cars.createNew( player );

	});

	GameMap.createMap( params )

}

//

function updateGame( stepInfo, thisPlayerID ) {

	playerID = thisPlayerID;

	const thisPlayer = stepInfo.players.find( (player) => {
		return player.client && player.client === thisPlayerID
	});

	Camera.setCameraTargetPos( thisPlayer.position );

	Cars.update( stepInfo );

	// console.log( thisPlayer )

}

//

function finishGame( info ) {

	console.log( info );

	const thisPlayerIndex = info.ranking.findIndex( (player) => {
		return !player.isNPC && player.client === playerID
	})

	UI.showScore( info.ranking, thisPlayerIndex )
	.then( () => {

		// when 'continue' button is clicked, clean the scene up

		GameMap.cleanup();
		Cars.cleanup();

	})

}

//

export default {
	startGame,
	updateGame,
	finishGame
}