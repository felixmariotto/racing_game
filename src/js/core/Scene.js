
import * as THREE from 'three';
import defaults from '../../data/defaults.js';

//

const scene = new THREE.Scene();

updateBackground( defaults.sceneBackColor );

//

export default {
	threeScene: scene,
	updateBackground,
	add,
	remove
}

//

function updateBackground( color ) {

	if ( !color ) return

	if ( scene.background ) {

		scene.background.set( color );

	} else {

		scene.background = new THREE.Color( color );

	}

}

//

function add() {

	scene.add( ...arguments );

};

//

function remove( object ) {

	object.traverse( (child) => {

		if ( child.geometry ) child.geometry.dispose();
		if ( child.material ) child.material.dispose();

		child.parent.remove( child );

	})

}