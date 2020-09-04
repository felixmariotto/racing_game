
import * as THREE from 'three';

import Scene from './js/core/Scene.js';
import Camera from './js/core/Camera.js';
import Renderer from './js/core/Renderer.js';

import UI from './js/UI.js';
import GameControl from './js/GameControl.js';
import SocketIO from './js/SocketIO.js';
import Light from './js/Light.js';
import Loop from './js/core/Loop.js';

//

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {
	Camera.updateAspect();
	Renderer.updateSize();
}

//

Loop.init();
