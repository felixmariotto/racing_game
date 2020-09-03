
import SocketIO from './SocketIO.js';

//

const domHomescreen = document.querySelector('#homescreen');
const domStartButton = document.querySelector('#start-btn');
const domFeedback = document.querySelector('#feedback-box');

//

domStartButton.onclick = () => {

	SocketIO.subscribeNextGame()
	.then( () => {

		domFeedback.innerHTML = 'a game is starting...'

	})

	domFeedback.innerHTML = 'waiting for a game to start'

}

//

function hideHomeScreen() {

	domHomescreen.style.display = 'none';

}

//

export default {
	hideHomeScreen
}