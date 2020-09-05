
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

					player.velocity.x += params.ACCELERATION * speedRatio;

					player.velocity.x = Math.min( player.isNPC ? params.FORWARD_MAX_SPEED : params.FORWARD_MAX_SPEED * 1.1 , player.velocity.x );

				} else {

					player.velocity.x -= params.DECELERATION * speedRatio;

					player.velocity.x = Math.max( 0, player.velocity.x );

				}

				// SIDE MOVE

				if ( player.movingUp ) {

					player.velocity.z -= params.ROLL_SPEED * speedRatio;

				} else if ( player.movingDown ) {

					player.velocity.z += params.ROLL_SPEED * speedRatio;

				} else {

					player.velocity.z -= player.velocity.z * ( params.DRIFT_FACTOR * speedRatio );

				}

				player.velocity.z = Math.max( -1 * params.SIDE_MAX_SPEED, Math.min( player.velocity.z, params.SIDE_MAX_SPEED ) )

			})

			//////////////
			// COLLISION
			//////////////

			game.players.forEach( (thisPlayer, thisPlayerIdx) => {

				// apply player velocity on their position

				thisPlayer.position.x += thisPlayer.velocity.x;
				thisPlayer.position.z += thisPlayer.velocity.z;

				// collide this player against all other players,
				// and update their position out of collision,
				// while updating their velocity

				const thisPlayerMin = getPlayerMin( thisPlayer, vec1 );
				const thisPlayerMax = getPlayerMax( thisPlayer, vec2 );

				game.players.forEach( (targetPlayer, targetPlayerIdx) => {

					if ( thisPlayerIdx === targetPlayerIdx ) return

					const targetPlayerMin = getPlayerMin( targetPlayer, vec3 );
					const targetPlayerMax = getPlayerMax( targetPlayer, vec4 );

					// AABB collision detection
					if (
						!( 
							thisPlayerMin.x > targetPlayerMax.x ||
							thisPlayerMax.x < targetPlayerMin.x ||
							thisPlayerMin.z > targetPlayerMax.z ||
							thisPlayerMax.z < targetPlayerMin.z
						)
					) {

						const relativeVelocity = {
							x: targetPlayer.velocity.x - thisPlayer.velocity.x,
							z: targetPlayer.velocity.z - thisPlayer.velocity.z
						};

						thisPlayer.position.x += relativeVelocity.x;
						thisPlayer.position.z += relativeVelocity.z;

						// apply differential velocity on both colliding objects
						
						// this factor is 1 when the two colliding objects are as far as can be, and 0 when on the same axis

						const xFactor = Math.abs( thisPlayer.position.x - targetPlayer.position.x ) / params.PLAYER_BOUNDING_BOX.x;
						const zFactor = Math.abs( thisPlayer.position.z - targetPlayer.position.z ) / params.PLAYER_BOUNDING_BOX.z;

						thisPlayer.velocity.x += relativeVelocity.x * xFactor;
						thisPlayer.velocity.z += relativeVelocity.z * zFactor;

						targetPlayer.velocity.x -= relativeVelocity.x * xFactor;
						targetPlayer.velocity.z -= relativeVelocity.z * zFactor;

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