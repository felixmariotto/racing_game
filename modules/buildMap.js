
/*

CODE FOR TILES :

0 : empty tile
1 : boost tile
2 : obstacle tile

*/

const params = require('./params.js');

//

function emptySection() {

	return [ 0, 0, 0 ]

}

// section in which only one random tile is special.

function oneTileSection( type, idx ) {

	type = type || Math.floor( Math.random() * 2 ) + 1;
	idx = idx === undefined ? Math.floor( Math.random() * params.TRACK_WIDTH ) : idx;

	const arr = [];

	for ( let i=0 ; i<params.TRACK_WIDTH ; i++ ) {
		arr.push( 0 );
	}

	arr[ idx ] = type;

	return arr

}

//

function twoTilesSection( type, idx1, idx2 ) {

	type = type || Math.floor( Math.random() * 2 ) + 1;
	idx1 = idx1 === undefined ? Math.floor( Math.random() * params.TRACK_WIDTH ) : idx1;
	idx2 = idx2 === undefined ? (idx + 1) % 3  : idx2;

	const arr = [];

	for ( let i=0 ; i<params.TRACK_WIDTH ; i++ ) {
		arr.push( 0 );
	}

	const idx = Math.floor( Math.random() * params.TRACK_WIDTH );

	arr[ idx1 ] = type;
	arr[ idx2 ] = type;

	return arr

}

///////////////////
// maps algorithms
///////////////////

function HurdlesRunning() {

	let emptyCounter = 0;
	let wasHurdle = false;
	let additionalSpace = Math.floor( Math.random() * 2 ) + 4;
	let track = [];

	for ( let i=0 ; i<params.TRACK_LENGTH ; i++ ) {

		if ( i <= params.MINIMAL_EMPTY_SPACE ) {

			track.push( emptySection() );

		} else if ( emptyCounter < additionalSpace + ( wasHurdle ? 8 : 0 ) ) {

			emptyCounter ++;

			track.push( emptySection() );

			continue

		} else {

			emptyCounter = 0;
			additionalSpace = Math.floor( Math.random() * 2 ) + 2;

			if ( wasHurdle ) track.push( twoTilesSection( 2 ) );
			else track.push( oneTileSection( 1 ) );

			wasHurdle = !wasHurdle;

		}

	}

	return track

}

//

function MegaBoost() {

	let emptyCounter = 0;
	let additionalSpace = Math.floor( Math.random() * 5 ) + 8;
	let track = [];

	for ( var i=0 ; i<params.TRACK_LENGTH ; i++ ) {

		if ( i <= params.MINIMAL_EMPTY_SPACE ) {

			track.push( emptySection() );

		} else if ( emptyCounter < additionalSpace ) {

			emptyCounter ++;

			track.push( emptySection() );

			continue

		} else {

			emptyCounter = 0;
			let additionalSpace = Math.floor( Math.random() * 5 ) + 8;

			track.push( oneTileSection( 1 ) );
			track.push( emptySection() );
			track.push( oneTileSection( 1 ) );
			track.push( emptySection() );
			track.push( emptySection() );
			track.push( oneTileSection( 1 ) );

			i += 5;

		}

	}

	return track

}

//

function RiskyBet() {

	let emptyCounter = 0;
	let wasBet = false;
	let additionalSpace = Math.floor( Math.random() * 3 ) + 7;
	let track = [];

	for ( var i=0 ; i<params.TRACK_LENGTH ; i++ ) {

		if ( i <= params.MINIMAL_EMPTY_SPACE ) {

			track.push( emptySection() );

		} else if ( emptyCounter < additionalSpace ) {

			emptyCounter ++;

			track.push( emptySection() );

			continue

		} else {

			emptyCounter = 0;
			let additionalSpace = Math.floor( Math.random() * 5 ) + 8;

			const idx1 = Math.floor( Math.random() * 3 );
			const idx2 = (idx1 + 1) % 3;

			if ( wasBet ) track.push( oneTileSection( 1 ) );
			else {

				track.push( twoTilesSection( 1, idx1, idx2 ) );
				track.push( oneTileSection( 2, idx1 ) );

				i += 1

			}

			wasBet = !wasBet

		}

	}

	return track

}

////////////////////////////////////////

module.exports = function buildMap() {

	const idx = 0;

	return [ RiskyBet ][ idx ]()

}