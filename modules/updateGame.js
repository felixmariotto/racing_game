
const params = require('./params.js');

//

module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		if ( Date.now() > game.departureTime ) {

			game.players.forEach( (player) => {

				if ( player.throttle ) {

					player.forwardSpeed += ( params.FORWARD_SPEED - player.forwardSpeed ) * (0.01 * speedRatio);

				} else {

					player.forwardSpeed += ( 0 - player.forwardSpeed ) * (0.01 * speedRatio);

				}

				player.position.x += player.forwardSpeed * speedRatio;

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