const State = require('./state.js');
const Queen = require('./queen.js');
const {random} = require('lodash');

class SimulatedAnnealingState extends State {
	constructor(matrixSize, queen) {
		super(matrixSize);

		if (!queen) {
			for (var i = 0; i < matrixSize; i++) {
				this.queen[i] = new Queen (i, random(matrixSize));
			}
		} else {
			this.queen = queen;
			this.cost = 0;
		}
	}

	getNextState() {
		let i;
		let nextStateQueen = Array.from(new Array(this.matrixSize), () => new Queen());
		const randomInt = random(this.matrixSize);

		for (i = 0; i < this.matrixSize; i++) {
			nextStateQueen[i] = new Queen(this.queen[i].indexOfX, this.queen[i].indexOfY);

			if (randomInt === i) {
				let temp = random(this.matrixSize);
				while(temp == this.queen[i].indexOfY) {
					temp = random(this.matrixSize);
				}

				nextStateQueen[i] = new Queen(this.queen[i].indexOfX, temp);
			}
		}

		return new SimulatedAnnealingState(this.matrixSize, nextStateQueen);
	}
};

module.exports = SimulatedAnnealingState;