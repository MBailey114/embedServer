const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmbedSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    helper: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true
    },
    sources: [
        {
            name: {
                type: String,
                required: false
            },
            url: {
                type: String,
                required: false
            }
        }
    ],
    category:{
        type:String,
        required:true
    },
    core: {
        headline: {
            type: Boolean,
            required: false
        },
        parameters: {
            auto: {
                type: Number,
                required: false
            },
            start: {
                type: Number,
                required: false
            },
            indicators: [
                {
                    name: {
                        type: String,
                        required: false
                    },
                    value: {
                        type: String,
                        required: false
                    }
                }
            ]
        }
    }
});

EmbedSchema.index({ "$**": "text" });

module.exports = mongoose.model('Embed', EmbedSchema);
