
const params = require('./params.js');
const easing = require('./easing.js');

//

const vec1 = { x: 0.0, z: 0.0 };
const vec2 = { x: 0.0, z: 0.0 };
const vec3 = { x: 0.0, z: 0.0 };
const vec4 = { x: 0.0, z: 0.0 };

function getPlayerMin( player, targetVec ) {

	targetVec.x = player.position.x - ( params.PLAYER_BOUNDING_BOX.x / 2 );
	targetVec.z = player.position.z - ( params.PLAYER_BOUNDING_BOX.z / 2 );

	return targetVec

}

function getPlayerMax( player, targetVec ) {

	targetVec.x = player.position.x + ( params.PLAYER_BOUNDING_BOX.x / 2 );
	targetVec.z = player.position.z + ( params.PLAYER_BOUNDING_BOX.z / 2 );

	return targetVec

}

//

module.exports = function updateGame( game, speedRatio ) {

	return new Promise( (resolve) => {

		if ( Date.now() > game.departureTime ) {

			/////////////////
			// ACCELERATION
			/////////////////

			game.players.forEach( (player) => {

				if ( player.isNPC ) player.throttling = true;

				// FORWARD MOVE

				if ( player.throttling ) {

					player.throttle += params.ACCELERATION * speedRatio;

					player.throttle = Math.min( 1, player.throttle );

					player.velocity.x = easing.easeInQuad( player.throttle ) * params.FORWARD_MAX_SPEED;

					// for test
					if ( !player.isNPC ) player.velocity.x *= 1.1;

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

			})

			//////////////
			// COLLISION
			//////////////

			game.players.forEach( (player, thisPlayerIdx) => {

				// apply player velocity on their position

				player.position.x += player.velocity.x;
				player.position.z += player.velocity.z;

				// collide this player against all other players,
				// and update their position out of collision,
				// while updating their velocity

				const thisPlayerMin = getPlayerMin( player, vec1 );
				const thisPlayerMax = getPlayerMax( player, vec2 );

				game.players.forEach( (targetPlayer, targetPlayerIdx) => {

					if ( thisPlayerIdx === targetPlayerIdx ) return

					const targetPlayerMin = getPlayerMin( targetPlayer, vec3 );
					const targetPlayerMax = getPlayerMax( targetPlayer, vec4 );

					if (
						!( 
							thisPlayerMin.x > targetPlayerMax.x ||
							thisPlayerMax.x < targetPlayerMin.x ||
							thisPlayerMin.z > targetPlayerMax.z ||
							thisPlayerMax.z < targetPlayerMin.z
						)
					) {

						console.log('collision')

					};

				})

			});

		}
		
		//

		resolve({
			players: game.players
		})

	})

}