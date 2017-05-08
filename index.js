const SimulatedAnnealing = require('./simulatedAnnealing.js');
const TabuSearch = require('./tabuSearch.js');
const matrixSize = parseInt(process.argv[2] || 4);

const runSimulatedAnnealing = matrixSize => {
	const tollerence = 0;
	console.time(`N = ${matrixSize}`);
	const nq = new SimulatedAnnealing(matrixSize, tollerence, 100);
	nq.solve();
	nq.show();
	console.timeEnd(`N = ${matrixSize}`);
};
/*for (let i = 4; i < 20; i++) {
	runSimulatedAnnealing(i);
}*/

runSimulatedAnnealing(matrixSize);
const ts = new TabuSearch(matrixSize, 2);
ts.solve();