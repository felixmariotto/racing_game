
const params = require('./params.js');
const easing = require('./easing.js');

//

module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		if ( Date.now() > game.departureTime ) {

			game.players.forEach( (player) => {

				if ( player.throttling ) {

					player.throttle += params.ACCELERATION * speedRatio;

					player.throttle = Math.min( 1, player.throttle );

					player.forwardSpeed = easing.easeOutQuad( player.throttle ) * params.FORWARD_MAX_SPEED;

				} else {

					player.throttle -= params.DECELERATION * speedRatio;

					player.throttle = Math.max( 0, player.throttle );

					player.forwardSpeed = easing.easeInOutQuad( player.throttle ) * params.FORWARD_MAX_SPEED;

				}

				player.position.x += player.forwardSpeed * speedRatio;

				// move up and down according to attributes set in GameControl.js

				if ( player.movingUp ) {

					player.position.z -= params.SIDE_MAX_SPEED * speedRatio;

				}

				if ( player.movingDown ) {

					player.position.z += params.SIDE_MAX_SPEED * speedRatio;

				}

			})

		}
		
		//

		resolve({
			players: game.players
		})

	})

}