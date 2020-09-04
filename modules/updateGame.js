
module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		// test : make every player move forward

		if ( Date.now() > game.departureTime ) {

			game.players.forEach( (player) => {

				player.position.x += 0.005 * speedRatio;

			})

		}
		
		//

		resolve({
			players: game.players
		})

	})

}