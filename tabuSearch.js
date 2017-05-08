const {range, clone} = require('lodash');
const NQueen = require('./nqueen.js');
const SimulatedAnnealingState = require('./simulatedAnnealingState.js');

const shuffle = (a) => {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }

  return a;
}

class TabuSearch {
	constructor(matrixSize) {
		this.matrixSize = matrixSize;
		this.solution = shuffle(range(matrixSize));

		console.log('=== N-Queens Tabu Search ===');
		console.log('Board size:', `${this.matrixSize}x${this.matrixSize}`);
	}

	diagonals(solution) {
		const ndiag = 2 * this.matrixSize - 1; //number of diagonals on the board

		const diagonalUp = Array.from(Array(ndiag)).map(() => 0);
		const diagonalDown = Array.from(Array(ndiag)).map(() => 0);

		//count the number of time each diagonal is being attacked
		for (let i = 0; i < this.matrixSize; i++) {
			let d = i + solution[i];
			diagonalUp[d] += 1;

			d = (this.matrixSize - 1) + solution[i] - i;
			diagonalDown[d] += 1;
		}

		return {diagonalUp, diagonalDown};
	}

	collisions(diagonal) { // return the total number of collisions on the diagonal
		let ncolls = 0;
		diagonal.forEach(i => {
			if (i > 1) {
				ncolls += i - 1;
			}
		});

		return ncolls;
	}

	exchange(i, j, solution, diagonalUp, diagonalDown) {
		// diagonals not attacked anymore
		let d = i + solution[i];
		let n = this.matrixSize;
		diagonalUp[d] -=  1
		d = j + solution[j];
		diagonalUp[d] -=  1

		d = (n-1) - i + solution[i];
		diagonalDown[d] -= 1
		d = (n-1) - j + solution[j];
		diagonalDown[d] -= 1

		// exchange the positions 'i' and 'j'
		console.log('before',solution, [solution[j], solution[i]], i, j)
		var b = solution[j];
		solution[j] = solution[i];
		solution[i] = b;
		console.log('after',solution, [solution[j], solution[i]], i, j)


		// diagonals that started being attacked
		d = i + solution[i];
		diagonalUp[d] +=  1;
		d = j + solution[j];
		diagonalUp[d] +=  1;

		d = (n-1) - i + solution[i];
		diagonalDown[d] += 1;
		d = (n-1) - j + solution[j];
		diagonalDown[d] += 1;
	}

	decrease(di, dj, ni, nj) {
		//Compute collisions removed when queens are removed.
		//di, dj -- diagonals where queens are currently placed
		//ni, nj -- number of queens on these diagonals

		let delta = 0;
		if (ni >= 2) delta -= 1;
		if (nj >= 2) delta -= 1;
		if (di == dj && ni == 2) delta += 1; // discounted one in excess, replace it
		return delta;
	}

	increase(di,dj,ni,nj) {
	    //Compute new collisions when queens are positioned.
	   	//di, dj -- diagonals where queens will be placed
	    //ni, nj -- number of queens on these diagonals

	    let delta = 0;
	    if (ni >= 1) delta += 1;
	    if (nj >= 1) delta += 1;
	    if (di == dj && ni == 0) delta += 1; // on the same diagonal
	    return delta;
	}

	evaluateMove(i, j, solution, diagonalUp, diagonalDown) {
		//Evaluate exchange of queen of row i with that of row j.

		let delta = 0;
		let n = this.matrixSize;

		// diagonals not attacked anymore if move is accepted
		let upi = i + solution[i];            // current upward diagonal of queen in row i
		let upj = j + solution[j];            //                                         j
		delta += this.decrease(upi,upj,diagonalUp[upi],diagonalUp[upj]);

		let dni = (n-1) + solution[i] - i;    // current downward diagonal of queen in row i
		let dnj = (n-1) + solution[j] - j;    //                                           j
		delta += this.decrease(dni,dnj,diagonalDown[dni],diagonalDown[dnj]);

		// diagonals that started being attacked
		upi = i + solution[j];            // new upward diagonal for queen in row i
		upj = j + solution[i];            //                                      j
		delta += this.increase(upi,upj,diagonalUp[upi],diagonalUp[upj]);
		
		dni = (n-1) + solution[j] - i;    // new downward diagonal of queen in row i
		dnj = (n-1) + solution[i] - j;    //                                       j
		delta += this.increase(dni,dnj,diagonalDown[dni],diagonalDown[dnj]);

		return delta;
	}

	findMove(nIter, tabu, bestColls, solution, diagonalUp, diagonalDown, ncolls) {
    /*
    Returns a tuple (i,j) with the best move.

    Checks all possible moves from the current solution, and choose the one that:
         * is not TABU, or
         * is TABU but satisfies the aspiration criterion

    The candidate list is composed of all the possibilities
    of swapping two lines.*/

    let n = this.matrixSize;
    let bestDelta = n;      // value of best found move
    let bestI, bestJ;
    for (var i = 0; i < n - 1; i++) {
  		for (var j = i + 1; j < n; j++) {
        let delta = this.evaluateMove(i,j,solution,diagonalUp,diagonalDown);
            
        if (tabu[i] < nIter         // move is not tabu,
            || ncolls + delta < bestColls) { // or satisfies aspiration criterion
            if (delta < bestDelta){
              bestDelta = delta;
              bestI = i;
              bestJ = j;
            }
        }
      }
    }

    return {bestI, bestJ, bestDelta};
  }

	solve(tabuLength, maxIter, solution = this.solution) {
		/*Tabu search: find solution starting search from sol.

		Parameters:
		- tabuLength: number of tabu iterations after a move is done
		- maxIter    - (absolute) maximum number of iterations
		- sol - starting solution; later updated with the best found solution

		Returns number of collisions of the local optimum.
		*/

		let n = this.matrixSize;
		const {diagonalUp, diagonalDown} = this.diagonals(solution);
		TabuSearch.show(solution);

		let ncolls = this.collisions(diagonalUp) + this.collisions(diagonalDown);

		let nIter = 0;          // iteration count
		let iterBest = 0;       // iteration at which best solutionution was found
		let best = clone(solution);    // copy of the best solution found
		let bestColls = ncolls;
		// tabu information (iteration until which move from 'i' is forbidden):
		const tabu = Array.from(Array(n)).map(() => 0);

		while ((nIter < maxIter) && (bestColls != 0)){
		    nIter += 1;

		    // determine the best move in the current neighborhood:
		    let {bestI: i, bestJ: j, bestDelta: delta} = this.findMove(nIter, tabu, bestColls, solution, diagonalUp, diagonalDown, ncolls)
		    console.log('move', i, j, delta)
		    // update the board, executing the best move:
		    this.exchange(i, j, solution, diagonalUp, diagonalDown);
		    ncolls += delta;

		    // update the tabu structure:
		    // moves involving i will be tabu for 'tabuLength' iterations
		    tabu[i] = nIter + tabuLength;

		    // check if we improved the best:
		    if (ncolls < bestColls){
		        iterBest = nIter;
		        best = clone(solution);
		        bestColls = ncolls;
		    }
		}
		// copy best solution found 
		solution = best;
		ncolls = bestColls;

		TabuSearch.show(solution);
		return ncolls
	}
}

TabuSearch.show = (solution) => {
	const length = solution.length;
	for (var i = 0; i < length; i++) {
		const line = [];
		for (var j = 0; j < length; j++) {
			if (solution[i] === j) {
				line.push(j + 1);
			} else {
				line.push('.')
			}
		}
		console.log(line.join(' '));
	}
}

const boardSize = process.argv[2] || 4;
console.time(`=== Tabu search N-Queens for board ${boardSize}x${boardSize} ===`);
const tabuSearchNQueens = new TabuSearch(boardSize);
tabuSearchNQueens.solve(boardSize, 100);
console.timeEnd(`=== Tabu search N-Queens for board ${boardSize}x${boardSize} ===`);