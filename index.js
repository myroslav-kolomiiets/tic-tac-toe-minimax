import { Game } from './components/Game.js';

//Starts a new game with a certain depth and a startingPlayer of 1 if human is going to start
(() => {
    const readyState = document.readyState;
    const game = new Game();
    if (readyState === 'interactive' || readyState === 'complete') {
        game.newGame();
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            game.newGame();
        });
    }
})();
