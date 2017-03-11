/*
	* move strategy: "first-improving"
	* random swaps done to avoid local optima in 
		non-improving situations
*/

class TabuSearch {
	constructor(matrixSize) {
		const vector = Array.from(new Array(matrixSize), () => 0);
		this.matrix = Array.from(new Array(matrixSize), () => vector);
		this.bestSolution = null;
		this.tabuList = [];
	}

	stoppingCondition() {
		return false;
	}

	solve () {
		while (!this.stoppingCondition()) {
			let candidates = [];
			let bestCandidate = null;

			for ()
		}
		console.log("done")
	}
}

module.exports = TabuSearch;