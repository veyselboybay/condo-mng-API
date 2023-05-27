const Express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')
const authRoute = require('./routes/auth_route')
const postRoute = require('./routes/posts')
const authMiddleware = require('./auth_middleware')

// dotenv configuration
env.config();


// create an express app instance
const app = Express();
app.use(Express.json());

// Routes
app.use('/api/v1', authRoute);
app.use('/api/v1',authMiddleware,postRoute)

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