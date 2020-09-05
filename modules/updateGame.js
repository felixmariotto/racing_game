
const params = require('./params.js');

//

module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		// test : make every player move forward

		if ( Date.now() > game.departureTime ) {

			game.players.forEach( (player) => {

				player.position.x += params.FORWARD_SPEED * speedRatio;

				// move up and down according to attributes set in GameControl.js

				if ( player.movingUp ) {

					player.position.z -= params.SIDE_SPEED * speedRatio;

				}

				if ( player.movingDown ) {

					player.position.z += params.SIDE_SPEED * speedRatio;

				}

			})

		}
		
		//

		resolve({
			players: game.players
		})

	})

}