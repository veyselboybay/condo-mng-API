const Express = require('express')
const env = require('dotenv')
env.config();
const app = Express();



app.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`App listening on port:${process.env.PORT}`)
})