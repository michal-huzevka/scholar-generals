class Unit {
    constructor(owner) {
        this.owner = owner;
    }

    toDisplayString() {
        throw new Error('implement this method');
    }

    getOwner() {
        return this.owner;
    }
}

export default Unit;