
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

					player.forwardSpeed = easing.easeInQuad( player.throttle ) * params.FORWARD_MAX_SPEED;

				} else {

					player.throttle -= params.DECELERATION * speedRatio;

					player.throttle = Math.max( 0, player.throttle );

					player.forwardSpeed = easing.easeInQuad( player.throttle ) * params.FORWARD_MAX_SPEED;

				}

				player.position.x += player.forwardSpeed * speedRatio;

				// SIDE MOVE

				if ( player.movingUp ) {

					player.roll -= params.ROLL_SPEED * speedRatio;

				} else if ( player.movingDown ) {

					player.roll += params.ROLL_SPEED * speedRatio;

				} else {

					player.roll -= player.roll * ( params.DRIFT_FACTOR* speedRatio );

				}

				player.position.z += player.roll * params.SIDE_MAX_SPEED;

			})

		}
		
		//

		resolve({
			players: game.players
		})

	})

}