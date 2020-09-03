
import Renderer from './Renderer.js';
import Camera from './Camera.js';

//

function loop() {

	Camera.update();

	Renderer.render();

}

//

function init() {

	Renderer.threeRenderer.setAnimationLoop( loop );

}

//

export default {
	init
}