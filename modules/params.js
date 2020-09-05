
module.exports = {
	SEC_BEFORE_START: 1, // server interval before new game
	PLAYERS_NUMBER: 6,
	LAPS_BEFORE_DEPARTURE: 2000, // in ms
	GAME_LOOP_FPS: 120,
	TRACK_LENGTH: 100, // in tiles
	TRACK_WIDTH: 5, // in tiles
	MINIMAL_EMPTY_SPACE: 12, // in tiles
	FORWARD_MAX_SPEED: 0.08, // in world unit per simulation step
	SIDE_MAX_SPEED: 0.05, // in world unit per simulation step
	ACCELERATION: 0.0035, // added to the range [ 0, 1 ] each simulation step
	DECELERATION: 0.002, // subtracted from the range [ 0, 1 ] each simulation step
	ROLL_SPEED: 0.02, // added or subtracted from the roll factor in range [ -1, 1 ]
	DRIFT_FACTOR: 0.05 // represent the automatic roll straightening
}