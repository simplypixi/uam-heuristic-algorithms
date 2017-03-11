class Queen {
	constructor(indexOfX, indexOfY) {
		this.indexOfX = indexOfX;
		this.indexOfY = indexOfY;
	}

	moveLeft() {
		this.indexOfY -= 1;
	}

	moveRight() {
		this.indexOfY += 1;
	}

	equals(nextQueen) {
		return nextQueen.indexOfX === this.indexOfX && nextQueen.indexOfY === this.indexOfY;
	}
}

module.exports = Queen;