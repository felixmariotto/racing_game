
import * as THREE from 'three';

import Scene from './core/Scene.js';

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
		newPos.x,
		newPos.y,
		newPos.z
	);

}

//

function cleanup() {

	for ( let carID of Object.keys( cars ) ) {

		Scene.remove( cars[ carID ].mesh );

		delete cars[ carID ];

	}

}

//

export default {
	createNew,
	update,
	cleanup
}
