const mongoose = require('mongoose');

const RegistoSchema = new mongoose.Schema({

    archetype_id: {type:String,
                   required: true,
                   default: 'openEHR-EHR-OBSERVATION.blood_pressure.v2'
    },
    data: {
        //sistolica
        at0004: {
            type: Number,
            required: true
        },
        //diastolica
        at0005: {
            type: Number,
            required: true
        },
        bpm: {
            type: Number,
            required: true
        }
        
    },
    date_t: {
        type: Date,
        required: true
    },
    protocol: {
        //location
        at0014: {
            type: String,
            required: true
        }
    }
});

module.exports = mongoose.model('Blood pressure', RegistoSchema);