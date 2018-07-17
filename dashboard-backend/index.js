const express = require('express')
const {promisify} = require('util')
const redis = require('redis')

const redisClient = redis.createClient(6379, 'redis')

const app = express()

const getKeys = promisify(redisClient.keys).bind(redisClient)
const getHash = promisify(redisClient.hgetall).bind(redisClient)
const getList = promisify(redisClient.lrange).bind(redisClient)

app.get('/data', async function (req, res) {
  const droneKeys = await getKeys('*DRONE_*')
  let activeDrones = []

  for (let key of droneKeys) {
    const drone = await getHash(key)
    drone['id'] = key.split('_').pop()
    const lastTenPositions = await getList(`LIST_${drone.id}`, 0, 10)
    drone['status'] = [ ...new Set(lastTenPositions) ].length !== 1 ? 'active' : 'inactive'

    activeDrones.push(drone)
  }

  res.json(activeDrones)
})

app.listen(3001, function () {
  console.log('Dashboard backend started...')
})
