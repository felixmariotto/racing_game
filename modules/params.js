
module.exports = {
	SEC_BEFORE_START: 10, // server interval before new game
	PLAYERS_NUMBER: 6,
	PLAYER_BOUNDING_BOX: {x: 1, y: 0.5, z: 0.5}, // box dimension in world units
	LAPS_BEFORE_DEPARTURE: 2000, // in ms
	GAME_LOOP_FPS: 120,
	TRACK_LENGTH: 500, // in tiles
	TRACK_WIDTH: 3, // in tiles
	MINIMAL_EMPTY_SPACE: 12, // in tiles
	FORWARD_MAX_SPEED: 0.07, // in world unit per simulation step
	SIDE_MAX_SPEED: 0.04, // in world unit per simulation step
	ACCELERATION: 0.0004,
	DECELERATION: 0.0006,
	ROLL_SPEED: 0.001,
	DRIFT_FACTOR: 0.05 // represent the automatic roll straightening
}