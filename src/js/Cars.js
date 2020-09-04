
import * as THREE from 'three';

import Scene from './core/Scene.js';

// game constants

const TRACK_WIDTH = 5;

//

let cars = {};

//

function createNew( player ) {

	const geometry = new THREE.BoxBufferGeometry( 1, 0.5, 0.5 );
	geometry.translate( 0, 0.25, 0 );

	const mesh = new THREE.Mesh(
		geometry,
		new THREE.MeshNormalMaterial()
	);

	Scene.add( mesh );

	const newCar = {
		mesh,
		id: player.id
	};

	cars[ player.id ] = newCar;

	positionCar( player.id, player.position );

};

//

function update( stepInfo ) {

	stepInfo.players.forEach( (player) => {

		positionCar( player.id, player.position );

	})

}

//

function positionCar( id, newPos ) {

	cars[ id ].mesh.position.set(
		newPos.x * TRACK_WIDTH,
		newPos.y * TRACK_WIDTH,
		newPos.z * TRACK_WIDTH
	);

}

//

export default {
	createNew,
	update
}
