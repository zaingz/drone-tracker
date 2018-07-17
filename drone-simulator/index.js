const nsq = require('nsqjs')

const w = new nsq.Writer('127.0.0.1', 4150)

w.connect()

const dronesID = ['AZY123', 'JHY565', 'YUD789', 'SHFJ85']

w.on('ready', () => {

  for (let i=0;i < dronesID.length ;i++) {
    let lat, log, speed;
    [lat, log, speed] = [89.56, 65.96, 0]


    setInterval(() => {
      const data = JSON.stringify({id:dronesID[i], pos: [lat+=1,log+=1], sp:speed+=1})
      w.publish('drone_data', data)
      console.log(`DATA SENT FOR DRONE ID ${dronesID[i]}`)
    }, (i+1)*1000)

}
})

w.on('closed', () => {
  console.log('Writer closed')
})
