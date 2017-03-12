const SimulatedAnnealingState = require('./simulatedAnnealingState.js');

class NQueen {
    constructor(matrixSize, tollerance) {
        this.matrixSize = matrixSize;
        this.tolCost = tollerance;
        this.currentState = null;
        this.nextState = null;
        if (matrixSize < 4) {
            throw 'No of N should be more than 3 to solve the problem';
        }
    }

    show() {
        console.log(`Total cost of ${this.currentState.getCost()}`);
        let temp = 0;
        let q = this.currentState.getQueens();
        let queen = false;

        console.log("result", this.currentState.getQueens());

        for (var i = 0; i < this.matrixSize; i++) {
            const line = [];
            for (var j = 0; j < this.matrixSize; j++) {
                for (var k = 0; k < this.matrixSize; k++) {
                    if (i === q[k].indexOfX && j === q[k].indexOfY) {
                        queen = true;
                        temp = k;
                        break;
                    }
                }

                if (queen) {
                    line.push(`${temp}`);
                    queen = false;
                } else {
                    line.push('*');
                }
            }
            console.log(line.join('  '));
        }
    }

    isSolvedPosition(s) {
        if (s.getCost() <= this.tolCost) {
            return true;
        }
        return false;
    }
}

module.exports = NQueen;
