
module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		// test : make every player move forward

		if ( game.departureTime > Date.now() ) {

			game.players.forEach( (player) => {

				player.position.x += 0.01 * speedRatio;

			})

		}
		
		//

		resolve({
			players: game.players
		})

	})

}