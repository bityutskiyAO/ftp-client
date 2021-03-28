const fs = require('fs')

const Client = require('ftp')

const ftpClient = new Client()

ftpClient.on('ready', () => {
    console.log('ftp client ready')
    // ftpClient.get('test.txt', (err, stream) => {
    //   if (err) throw err;
    //   stream.once('close', function() { ftpClient.end(); });
    //   stream.pipe(fs.createWriteStream('foo.local-copy.txt'));
    // })
    // console.log(ftpClient)
    // ftpClient.put('foo.local-copy.txt','test.txt', (err) => {
    //     console.log('ERR', err)
    // })
})

ftpClient.on('error', (err) => {
    console.log('ERR', err)
})

const connect = (login, password) => {
    ftpClient.connect({
        host: '127.0.0.1',
        port: '21',
        user: login,
        password
    })
}

module.exports = {
    connect,
    ftpClient
}
