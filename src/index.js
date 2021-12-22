const path = require('path');
const express = require("express");
const hbs = require('hbs');
const app = express();
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const port=process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewPath);//custom views


app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: 'index',
        name: 'Dipronil Das'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        name: 'Dipronil Das',
        helptext: 'hi it is helpfull text'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dipronil Das'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.json({ 'error': 'Please provide a address' })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error: error })
        }
        console.log(latitude, longitude, location);
        forecast(latitude, longitude, (error, forCastData) => {
            if (error) {
                return res.send({ error: error })
            }

            res.send({
                forcast: forCastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Diponil Das'
    })
})

app.listen(port, () => {
    console.log(`server is runnint at ${port}`);
})