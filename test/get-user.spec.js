const test = require('japa')
const getUser = require('../src/getUser')

test('get user with username and age', (assert) => {
  assert.deepEqual(getUser(), {
    username: 'BAS',
    age: 25
  })
})