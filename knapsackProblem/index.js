const _ = require('lodash');

class Knapsack {
	constructor(numItems, capacity) {
		this.capacity = capacity;
		this.itemWeights = Array.from(Array(numItems)).map(() => _.random(1, 15));

		this.Xbest = Array.from(Array(numItems)).map((x, index) => ({
			index,
			used: false
		}));
		this.weight = 0;
	}

	search() {
		this.searching = true;
		while (this.searching) {
			let S = this.Xbest.filter(({used}) => !used);
			if (!S.length) {
				break;
			}

			const i = _.sample(S).index;
			const newWeight = this.weight + this.itemWeights[i];

			if (newWeight <= this.capacity) {
				this.weight = newWeight;
				this.Xbest[i].used = true;
			} else {
				this.searching = false;
			}

		}
	}

	get totalWeight () {
		return this.weight;
	}

	get bestSolution () {
		return this.Xbest.map(
			({index, used}) => used ? this.itemWeights[index] : '.'
		).join(' ');
	}
};

console.time('Knapsack problem searching time');
const capacity = parseInt(process.argv[3] || 20, 10);
const elementNo = parseInt(process.argv[2] || 10, 10);

const knapsack = new Knapsack(elementNo, capacity);

console.log('\n=== Initial data ===');
console.log('Max capacity:', knapsack.capacity);
console.log('Items weights:', knapsack.itemWeights.join(' '));
knapsack.search();
console.log('\n=== Search results ===');
console.log('Best solution:', knapsack.bestSolution);
console.log('Total weight:', knapsack.totalWeight);


console.timeEnd('Knapsack problem searching time');