const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    photo_url: {type: String, required: false},
    isFirstAuth: {type: Boolean, default: true},
    isActive: {type: Boolean, default: false},
    isSuperUser: {type: Boolean, default: false},
    preferences: [{ type: Types.ObjectId, ref: 'Fanfiction'}],
})

module.exports = model('User', schema)