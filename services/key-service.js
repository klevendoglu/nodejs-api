const fs = require('fs')

const _keyHandler = require('../handlers/key-handler')

const dbPath = `${__dirname}/../keys.json`

class KeyHandler {


    async findAllKeys() {
        return new Promise((resolve, reject) => {
            fs.readFile(dbPath, 'utf8', async (err, file) => {
                if (err) {
                    if (err.code == 'ENOENT') {
                        await this.saveAll([])
                        return resolve([])
                    }
                    return reject(err)
                }

                const items = JSON.parse(file).map(_keyHandler.create)

                resolve(items)
            })
        })
    }

    async findKey(key) {
        const allKeys = await this.findAllKeys()
        const specificKey = allKeys.find(p => p.name === key);
        return specificKey.numberOfTimesFound ? specificKey.numberOfTimesFound : 0
    }

    async saveAllKeys(items) {
        return new Promise((resolve, reject) => {
            fs.writeFile(dbPath, JSON.stringify(items, null, 2), (err, file) => {
                if (err) return reject(err)

                resolve()
            })
        })
    }

    async addKey(input) {
        const allKeys = await this.findAllKeys();

        if (allKeys.find(p => p.name === input) !== undefined) {
            const keyToBeIncremented = allKeys.find(p => p.name == input)
            _keyHandler.incrementNumberOfTimesFoundByOne(keyToBeIncremented)
        } else {
            const lastItem = allKeys[allKeys.length - 1]
            const lastItemsId = lastItem && lastItem.id || 0
            let key = {
                id: lastItemsId + 1,
                name: input,
                numberOfTimesFound: 1
            }

            allKeys.push(key)
        }

        await this.saveAllKeys(allKeys)

        return true
    }

}

module.exports = new KeyHandler()