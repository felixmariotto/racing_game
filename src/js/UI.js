
import SocketIO from './SocketIO.js';

//

const domHomescreen = document.querySelector('#homescreen');
const domStartButton = document.querySelector('#start-btn');
const domFeedback = document.querySelector('#feedback-box');
const domTimeLeft = document.querySelector('#time-left');

const domScoreScreen = document.querySelector('#score-screen');
const domScoreList = document.querySelector('#score-list');
const domScoreContinue = document.querySelector('#score-continue-btn');

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

function printTimeLeft( secBeforeGame ) {

	domTimeLeft.innerHTML = `Time before new game : ${ secBeforeGame } seconds`;

}

//

function showScore( ranking, thisPlayerIdx ) {

	return new Promise( (resolve) => {

		domScoreScreen.style.display = 'flex';
		domScoreList.innerHTML = `<li>
	              
	        <div class="rank">rank</div>

	        <div class="name">name</div>

	        <div class="score">score</div>

	    </li>`;

		//

		ranking.forEach( (playerRank, i) => {

			const li = document.createElement('LI');

			if ( thisPlayerIdx === i ) li.classList.add('this-player');

			const rank = document.createElement('DIV');
			const name = document.createElement('DIV');
			const score = document.createElement('DIV');

			rank.classList.add('rank');
			name.classList.add('name');
			score.classList.add('score');

			rank.innerHTML = i + 1;
			name.innerHTML = 'name';
			score.innerHTML = '1 : 20 : 35';

			li.append( rank, name, score );
			domScoreList.append( li );

		})

		//

		domScoreContinue.onclick = () => {

			domScoreScreen.style.display = 'none';
			domHomescreen.style.display = 'flex';

			resolve();

		}

	})

}

//

export default {
	hideHomeScreen,
	printTimeLeft,
	showScore
}