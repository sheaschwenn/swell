const {Schema, model} = require('mongoose');

const dayjs = require('dayjs')

const surfSchema = new Schema({
    surfDate: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number
    },
    answers: [{
        answer: String
    }],
    location: {
        type: String
    },
    boyData: {
        type: String
    }
},
{
    toJSON: {
        getters: true
    }
}
)

const Surf = model('Surf', surfSchema)

module.exports = Surf;