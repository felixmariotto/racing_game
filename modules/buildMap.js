
/*

CODE FOR TILES :

0 : empty tile
1 : boost tile
2 : obstacle tile

*/

//

const TRACK_LENGTH = 100;
const MINIMAL_EMPTY_SPACE = 5;

//

function emptySection() {

	return [ 0, 0, 0, 0, 0 ]

}

//

function fullSection() {

	const type = Math.floor( Math.random() * 2 ) + 1;

	return [ type, type, type, type, type ]

}

//

function trapSection() {

	let type1 = Math.floor( Math.random() * 2 );
	let type2 = ( type1 + 1 ) % 2;

	type1 ++;
	type2 ++;

	return [ type1, type2, type1, type2, type1 ]

}

//

module.exports = function buildMap() {

	let emptyCounter = 0;
	let additionalSpace = Math.floor( Math.random() * 5 );
	let track = [];

	for ( let i=0 ; i<TRACK_LENGTH ; i++ ) {

		if ( emptyCounter < ( MINIMAL_EMPTY_SPACE + additionalSpace ) ) {

			emptyCounter ++;

			track.push( emptySection() );

			continue

		} else {

			emptyCounter = 0;
			additionalSpace = Math.floor( Math.random() * 5 );

			const obstacle = (Math.random() * 2) > 1 ? trapSection : fullSection;

			track.push( obstacle() );

		}

	}

	return track

}