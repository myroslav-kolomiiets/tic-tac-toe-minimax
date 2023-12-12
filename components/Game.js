import { Board } from './Board.js';
import { Player } from './Player.js';

export class Game {
    constructor() {
        this.boardElement = document.getElementById('board');
        this.startNewGameButton = document.getElementById('newGameButton');
        this.startingSelect = document.getElementById('starting');
        this.depthSelect = document.getElementById('depth');

        this.startingPlayer = -1;
        this.depth = 1;

        this.startingSelect.addEventListener('change', ({ target }) => {
            this.startingPlayer = parseInt(target.value, 10);
        });

        this.depthSelect.addEventListener('change', ({ target }) => {
            this.depth = parseInt(target.value, 10);
        });

        this.startNewGameButton.addEventListener('click', () => {
            this.newGame(this.depth, this.startingPlayer);
        });
    }

    renderNewBoard() {
        this.boardElement.className = '';
        this.boardElement.innerHTML = `<div class="cells-wrap">
            <button class="cell-0"></button>
            <button class="cell-1"></button>
            <button class="cell-2"></button>
            <button class="cell-3"></button>
            <button class="cell-4"></button>
            <button class="cell-5"></button>
            <button class="cell-6"></button>
            <button class="cell-7"></button>
            <button class="cell-8"></button>
        </div>`;
    }

    drawWinningLine(statusObject) {
        if (!statusObject) {
            return;
        }
        const { winner, direction, row, column, diagonal } = statusObject;
        if (winner === 'draw') {
            return;
        }
        const board = document.getElementById('board');
        board.classList.add(`${direction.toLowerCase()}-${row || column || diagonal}`);
        setTimeout(() => {
            board.classList.add('fullLine');
        }, 50);
    }

    newGame() {
        //Instantiating a new player and an empty board
        const player = new Player(parseInt(this.depth));
        const board = new Board();

        //Clearing all #Board classes and populating cells HTML
        this.renderNewBoard();

        //Storing HTML cells in an array
        const htmlCells = [...this.boardElement.querySelector('.cells-wrap').children];
        //Initializing some variables for internal use
        const starting = this.startingPlayer;
        const maximizing = starting;
        let playerTurn = starting;
        //If computer is going to start, choose a random cell as long as it is the center or a corner
        if (!starting) {
            const centerAndCorners = [0, 2, 4, 6, 8];
            const firstChoice = centerAndCorners[Math.floor(Math.random() * centerAndCorners.length)];
            const symbol = !maximizing ? 'x' : 'o';
            board.insert(symbol, firstChoice);
            htmlCells[firstChoice].classList.add(symbol);
            playerTurn = 1; //Switch turns
        }
        //Adding Click event listener for each cell
        board.state.forEach((cell, index) => {
            htmlCells[index].addEventListener('click', () => {
                //If cell is already occupied or the board is in a terminal state, or it's not humans turn, return false
                if (htmlCells[index].classList.contains('x')
                    || htmlCells[index].classList.contains('o')
                    || board.isFinished()
                    || !playerTurn
                ) {
                    return false;
                }

                const symbol = maximizing ? 'x' : 'o'; //Maximizing player is always 'x'
                //Update the Board class instance as well as the Board UI
                board.insert(symbol, index);
                htmlCells[index].classList.add(symbol);
                //If it's a terminal move, and it's not a draw, then human won
                if (board.isFinished()) {
                    this.drawWinningLine(board.isFinished());
                }
                playerTurn = 0; //Switch turns
                //Get computer's best move and update the UI
                player.getBestMove(board, !maximizing, best => {
                    const symbol = !maximizing ? 'x' : 'o';
                    board.insert(symbol, parseInt(best));
                    htmlCells[best].classList.add(symbol);
                    if (board.isFinished()) {
                        this.drawWinningLine(board.isFinished());
                    }
                    playerTurn = 1; //Switch turns
                });
            }, false);
            if (cell) {
                htmlCells[index].classList.add(cell);
            }
        });
    }
}
