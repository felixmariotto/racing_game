
const FORWARD_SPEED = 0.02;

const SIDE_SPEED = 0.01;

//

module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		// test : make every player move forward

		if ( Date.now() > game.departureTime ) {

			game.players.forEach( (player) => {

				player.position.x += FORWARD_SPEED * speedRatio;

				// move up and down according to attributes set in GameControl.js

				if ( player.movingUp ) {

					player.position.z -= SIDE_SPEED * speedRatio;

				}

				if ( player.movingDown ) {

					player.position.z += SIDE_SPEED * speedRatio;

				}

			})

		}
		
		//

		resolve({
			players: game.players
		})

	})

}