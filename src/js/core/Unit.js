class Unit {
    constructor(ownerId) {
        this.ownerId = ownerId;
    }

    toDisplayString() {
        throw new Error('implement this method');
    }

    getOwner() {
        return this.owner;
    }

    refresh() {
        this.movesLeft = this.moveSpeed;
    }
}

export default Unit;