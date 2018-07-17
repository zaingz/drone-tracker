const nsq = require('nsqjs')
const redis = require("redis"),
    redisClient = redis.createClient(6379, 'redis')

const reader = new nsq.Reader('drone_data', 'test_channel', {
  nsqdTCPAddresses: ['nsqd:4150']
})

reader.connect()

reader.on('message', msg => {
  const msgBody = JSON.parse(msg.body.toString())
  console.log(`DATA RECIVED FOR ${msgBody.id}`)
  msg.finish()

  redisClient.lpush([`LIST_${msgBody.id}`, msgBody.pos.join()])

  redisClient.multi()
    .hset([`DRONE_${msgBody.id}`, "position", msgBody.pos.join(), "speed", msgBody.sp.toString()])
    .expire(`DRONE_${msgBody.id}`,120)
    .exec()
})

reader.on('error', error => {
  console.log(error);
  redisClient.quit();
})

reader.on('close', () => {
  redisClient.quit();
})

redisClient.on("error", function (err) {
    console.log("Error " + err);
});
