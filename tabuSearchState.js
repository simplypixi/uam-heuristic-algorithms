const State = require('./state.js');
const Queen = require('./queen.js');
const {random} = require('lodash');

class TabuSearchState extends State {
	constructor(matrixSize, queen) {
		super(matrixSize);

		if (!queen) {
			for (var i = 0; i < matrixSize; i++) {
				this.queen[i] = new Queen (i, random(matrixSize - 1));
			}
		} else {
			this.queen = queen;
			this.cost = 0;
		}
	}

	getObjectiveFunctionValue(){
        this.cost = 0;
   
        for(let i = 0 ; i < this.queen.length - 1; i++){
            this.cost += distances[this.queen[i].indexOfY][this.queen[i+1].indexOfY];
        }
        return this.cost;
    }
};

module.exports = TabuSearchState;