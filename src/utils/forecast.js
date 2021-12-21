const request = require('request')

const forecast = (latitude, longitude, callback) => {
    console.log(latitude, longitude);
    // const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude
    // console.log(url);
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=ec2920b8c15949c5c2e990bb8ab2a833';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.weather.main + ' It is currently ' + body.main.temp + ' degress out.')
        }
    })
}

module.exports = forecast