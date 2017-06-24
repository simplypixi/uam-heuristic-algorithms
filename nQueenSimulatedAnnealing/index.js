const {random} = require('lodash');
const NQueen = require('./nqueen.js');
const SimulatedAnnealingState = require('./simulatedAnnealingState.js');

class SimulatedAnnealing extends NQueen {
	constructor(matrixSize, tollerance, temperature) {
		super(matrixSize, tollerance);
		this.temperature = temperature;
		this.currentState = new SimulatedAnnealingState(matrixSize);
	}
	solve () {
		while(!this.isSolvedPosition(this.currentState)) {
			let temperature, delta, probability, rand;
			for (temperature = this.temperature; (temperature > 0) && (this.currentState.getCost() != 0); temperature--) {
			    this.nextState = this.currentState.getNextState();
			    delta = this.currentState.getCost() - this.nextState.getCost();
			    probability = Math.exp(delta / temperature);
			    rand = Math.random();

			    if (delta > 0) {
			      this.currentState = this.nextState;
			    } else if (rand <= probability) {
			      this.currentState = this.nextState;
			    }
		    }
		}
	}
}

const matrixSize = parseInt(process.argv[2] || 4);
console.time(`=== SimulatedAnnealing for  board ${matrixSize}x${matrixSize} ===`);
const tollerence = 0;
console.time(`SimulatedAnnealing for ${matrixSize}x${matrixSize}`);
const nq = new SimulatedAnnealing(matrixSize, tollerence, 100);
nq.solve();
nq.show();
console.timeEnd(`=== SimulatedAnnealing for  board ${matrixSize}x${matrixSize} ===`);