const Alg2 = require('./alg2.js');

const tollerence = 0;

const runSimulatedAnnealing = matrixSize => {
	console.time(`N = ${matrixSize}`);
	const nq = new Alg2(matrixSize,tollerence,1000);
	nq.solve();
	nq.show();
	console.timeEnd(`N = ${matrixSize}`);
}
/*for (let i = 4; i < 20; i++) {
	runSimulatedAnnealing(i);
}*/

runSimulatedAnnealing(5);