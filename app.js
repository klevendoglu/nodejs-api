const express = require('express')
const bodyParser = require('body-parser')
const _ = require('underscore')

const port = 9000

const _keyService = require('./services/key-service')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => { //default route
    res.send('hello from key handler app!')
})

app.get('/query', async (req, res) => {
    try {
        const key = await _keyService.findKey(req.query.key)
        res.send(JSON.stringify(key));
    } catch (err) {
        return res.send(err.message);
    }
})

app.post('/input', async (req, res) => {
    const body = _.pick(req.body, "key");
    const response = await _keyService.addKey(body.key)
    res.send(response)
})

app.listen(port, () => {
    console.log(`Server listening from port:${port}`)
})