import test from 'ava'
import request from 'supertest'
import app from "../app"


test('Insert and get a key', async t => {
    t.plan(2) //number of execution context
    const keyToCreate = {
        key: 'keyToTest'
    }

    const keyToTestCreated = (await request(app)
        .post('/input')
        .send(keyToCreate)).body

    const fetchRes = await request(app).get(`/query?key=${keyToCreate.key}`)

    t.is(fetchRes.status, 200)
    t.deepEqual(fetchRes, keyToTestCreated)
})