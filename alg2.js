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
		   // console.log(this.temperature, temperature, this.isSolvedPosition(this.currentState))
			}
		}
	}
}

module.exports = SimulatedAnnealing;