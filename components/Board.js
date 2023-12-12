export class Board {
    constructor() {
        this.state = ['', '', '', '', '', '', '', '', ''];
    }

    isEmpty() {
        return this.state.every(function(cell) {
            return cell === '';
        });
    }

    isFull() {
        return this.state.every(function(cell) {
            return cell !== '';
        });
    }

    isFinished() {
        //Return False if board in empty
        if (this.isEmpty()) {
            return false;
        }

        //Checking Horizontal Wins
        if (this.state[0] === this.state[1] && this.state[0] === this.state[2] && this.state[0]) {
            return { 'winner': this.state[0], 'direction': 'H', 'row': 1 };
        }
        if (this.state[3] === this.state[4] && this.state[3] === this.state[5] && this.state[3]) {
            return { 'winner': this.state[3], 'direction': 'H', 'row': 2 };
        }
        if (this.state[6] === this.state[7] && this.state[6] === this.state[8] && this.state[6]) {
            return { 'winner': this.state[6], 'direction': 'H', 'row': 3 };
        }

        //Checking Vertical Wins
        if (this.state[0] === this.state[3] && this.state[0] === this.state[6] && this.state[0]) {
            return { 'winner': this.state[0], 'direction': 'V', 'column': 1 };
        }
        if (this.state[1] === this.state[4] && this.state[1] === this.state[7] && this.state[1]) {
            return { 'winner': this.state[1], 'direction': 'V', 'column': 2 };
        }
        if (this.state[2] === this.state[5] && this.state[2] === this.state[8] && this.state[2]) {
            return { 'winner': this.state[2], 'direction': 'V', 'column': 3 };
        }

        //Checking Diagonal Wins
        if (this.state[0] === this.state[4] && this.state[0] === this.state[8] && this.state[0]) {
            return { 'winner': this.state[0], 'direction': 'D', 'diagonal': 'main' };
        }
        if (this.state[2] === this.state[4] && this.state[2] === this.state[6] && this.state[2]) {
            return { 'winner': this.state[2], 'direction': 'D', 'diagonal': 'counter' };
        }

        //If no winner but the board is full, then it's a draw
        if (this.isFull()) {
            return { 'winner': 'draw' };
        }

        //return false otherwise
        return false;
    }

    insert(symbol, position) {
        if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
            throw new Error('Cell index does not exist!');
        }
        if (!['x', 'o'].includes(symbol)) {
            throw new Error('The symbol can only be x or o!');
        }
        if (this.state[position]) {
            return false;
        }
        this.state[position] = symbol;
        return true;
    }

    getAvailableMoves() {
        const moves = [];
        this.state.forEach((cell, index) => {
            if (!cell) {
                moves.push(index);
            }
        });

        return moves;
    }
}
