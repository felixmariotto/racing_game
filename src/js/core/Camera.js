
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Renderer from './Renderer.js';
import defaults from '../../data/defaults.js';

//

const targetPos = new THREE.Vector3().copy( defaults.cameraInitPos );
const target = new THREE.Vector3().copy( defaults.cameraInitTarget );

const camera = new THREE.PerspectiveCamera(
	defaults.cameraFOV,
	window.innerWidth/window.innerHeight,
	defaults.cameraMinPlane,
	defaults.cameraFarPlane
);

camera.position.copy( defaults.cameraInitPos );

camera.lookAt( defaults.cameraInitTarget );

//

let controls;

if ( defaults.useControls ) {

	controls = new OrbitControls(
		camera,
		Renderer.threeRenderer.domElement
	);

	camera.position.copy( defaults.cameraInitPos );

	controls.target.copy( defaults.cameraInitTarget );

	controls.update();

}

//

function updateAspect() {

	camera.aspect = window.innerWidth / window.innerHeight;
	
	camera.updateProjectionMatrix();

}

//

function update() {

	if ( defaults.useControls ) {

		controls.update();

	} else {

		camera.position.copy( targetPos );
		camera.lookAt( target );

	}

}

function setCameraTargetPos( playerPos ) {

	targetPos.x = playerPos.x - 1;
	targetPos.y = playerPos.y + 1;
	targetPos.z = playerPos.z + 4;

	target.copy( playerPos );

}

//

export default {
	threeCamera: camera,
	updateAspect,
	update,
	setCameraTargetPos
}
