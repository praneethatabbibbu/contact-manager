const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/contact-jul', {useNewUrlParser : true})
    .then(() => {
        console.log('connected to db')
    })
    .catch(() => {
        console.log('error in connecting to db')
    })

module.exports = {mongoose}
