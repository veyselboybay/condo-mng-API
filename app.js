const Express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const authRoute = require('./routes/auth_route')

// dotenv configuration
env.config();


// create an express app instance
const app = Express();
app.use(Express.json());

// Routes
app.use('/api/v1', authRoute);

// Connect to db
mongoose.connect(process.env.DB_CONNECTION).then(()=> console.log('DB connected...')).catch((err) => {
    if (err) {
        return console.log(err);
    }
    console.log('DB connected...')
})


// listen application
app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`App listening on port:${process.env.PORT}`)
})