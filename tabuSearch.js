const {range} = require('lodash');
const NQueen = require('./nqueen.js');
const SimulatedAnnealingState = require('./simulatedAnnealingState.js');

class TabuSearch extends NQueen {
	constructor(matrixSize, limit) {
		super(matrixSize, 0);
		this.bestSolution = null;
		this.limit = limit;
		console.log('sdfsdf', this.limit)
		this.currentState = new SimulatedAnnealingState(matrixSize);
		this.tabuList = [];
	}

	solve() {
		console.log(this.currentState);
		while (this.limit) {
			let candidates = [];
			let bestCandidate = null;

			this.limit -= 1;
		}
		console.log("done")
	}

/*	show() {
		this.
	}*/
}

module.exports = TabuSearch;