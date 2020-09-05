
import SocketIO from './SocketIO.js';

//

document.addEventListener('keydown', (e) => {

	switch ( e.code ) {

	case 'KeyW' :
	case 'ArrowUp' :
		SocketIO.sendMoveUp();
		break

	case 'KeyS' :
	case 'ArrowDown' :
		SocketIO.sendMoveDown();
		break

	}

});

document.addEventListener('keyup', (e) => {

	switch ( e.code ) {

	case 'KeyW' :
	case 'ArrowUp' :
		SocketIO.sendStopMoveUp();
		break

	case 'KeyS' :
	case 'ArrowDown' :
		SocketIO.sendStopMoveDown();
		break

	}

});