module.exports = class Key {
    constructor(id, name, numberOfTimesFound) {
        this.id = id
        this.name = name
        this.numberOfTimesFound = numberOfTimesFound
    }

    static incrementNumberOfTimesFoundByOne(key) {
        key.numberOfTimesFound += 1
    }

    static create({ id, name, numberOfTimesFound }) {
        return new Key(id, name, numberOfTimesFound);
    }
}