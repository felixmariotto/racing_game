
import GameMap from './GameMap.js';

//

function startGame( params ) {

	console.log( params )

	GameMap.createMap( params )

}

//

export default {
	startGame
}