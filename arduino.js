

const SerialPort = require('serialport')

exports.mainArduino = () => {
  const port = new SerialPort("/dev/cu.usbmodem1421101", {
    baudRate: 57600
  });

  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message)
    }
    console.log('message written')
  })
  
  // Open errors will be emitted as an error event
  port.on('error', function(err) {
    console.log('Error: ', err.message)
  })

  port.on('data', function(data) {
    console.log(data[0]);
  });
}