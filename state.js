const Queen = require('./queen.js');
class State {
	constructor(matrixSize, queen = Array.from(new Array(matrixSize), () => new Queen())) {
		this.matrixSize = matrixSize;
		this.queen = queen;
		this.cost = 0;
	}

	isSameRow(i, j) {
		const iX = this.queen[i].indexOfX;
		const jX = this.queen[j].indexOfX;
		return iX === jX;
	}

	isSameColumn(i, j) {
		const iY = this.queen[i].indexOfY;
		const jY = this.queen[j].indexOfY;
		return iY === jY; 
	}

	iSameDiagonals(i, j) { //przekątna i przeciw przekątna
		const iX = this.queen[i].indexOfX;
		const jX = this.queen[j].indexOfX;
		const iY = this.queen[i].indexOfY;
		const jY = this.queen[j].indexOfY;
		return iX - jX === iY - jY || iX - jX === jY - iY; 
	}

	calculateCost() {
		let i, j;
		this.cost = 0;

		for (i = 0; i < this.matrixSize; i++) {
			for (j = 0; j < this.matrixSize; j++) {
				if (i === j ) {
					continue;
				}

				if (this.isSameRow(i, j) || this.isSameColumn(i, j)
						|| this.iSameDiagonals(i, j)) {
					this.cost += 1;
				}
			}
		}

		this.cost /= 2;
	}

	getCost() {
		this.calculateCost();
		return this.cost;
	}

	getQueens() {
		return this.queen;
	}

}

module.exports = State;