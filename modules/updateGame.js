
const params = require('./params.js');
const easing = require('./easing.js');

//

module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		if ( Date.now() > game.departureTime ) {

			game.players.forEach( (player) => {

				// FORWARD MOVE

				if ( player.throttling ) {

					player.throttle += params.ACCELERATION * speedRatio;

					player.throttle = Math.min( 1, player.throttle );

					player.velocity.x = easing.easeInQuad( player.throttle ) * params.FORWARD_MAX_SPEED;

				} else {

					player.throttle -= params.DECELERATION * speedRatio;

					player.throttle = Math.max( 0, player.throttle );

					player.velocity.x = easing.easeInQuad( player.throttle ) * params.FORWARD_MAX_SPEED;

				}

				// SIDE MOVE

				if ( player.movingUp ) {

					player.roll -= params.ROLL_SPEED * speedRatio;

				} else if ( player.movingDown ) {

					player.roll += params.ROLL_SPEED * speedRatio;

				} else {

					player.roll -= player.roll * ( params.DRIFT_FACTOR* speedRatio );

				}

				player.velocity.z = player.roll * params.SIDE_MAX_SPEED

				// apply player velocity on their position

				player.position.x += player.velocity.x;
				player.position.z += player.velocity.z;

			})

		}
		
		//

		resolve({
			players: game.players
		})

	})

}