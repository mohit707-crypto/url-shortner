const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    urCode: String,
    longUrl: String,
    shortUrl: String,
    Date:{type:String,default:Date.now}
})

module.exports = mongoose.model('url',urlSchema)