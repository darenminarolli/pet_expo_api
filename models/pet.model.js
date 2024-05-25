const mongoose = require('mongoose');
const { Schema } = mongoose;

const PetSchema = new Schema({
    type_of_pet: {
        type: String,
        required: true,
        enum: ['dogs', 'cats', 'birds']
    },
    name: {
        type: String,
        // required: true
    },
    species: {
        type: String,
        default: null
    },
    family: {
        type: String,
        default: null
    },
    habitat: {
        type: String,
        default: null
    },
    place_of_found: {
        type: String,
        default: null
    },
    diet: {
        type: String,
        default: null
    },
    description: {
        type: String,
        // required: true
    },
    wingspan_cm: {
        type: String,
        default: null
    },
    weight_kg: {
        type: String,
        default: null
    },
    breed_group: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: null
    },
    lifespan: {
        type: String,
        default: null
    },
    origin: {
        type: String,
        default: null
    },
    temperament: {
        type: String,
        default: null
    },
    colors: {
        type: Array,
        default: null
    },
    image_path: {
        type: String,
        // required: true
    }
}, {
    timestamps: true,
});

const Pet = mongoose.model("Pet", PetSchema);
module.exports = Pet;
// const mongoose = require('mongoose');
// const { Schema } = mongoose
// const PetSchema = new  Schema({
//     type_of_pet:{
//       type: String,
//     //   required: true,
//       enum: ['dog', 'cat', 'bird']
//     },
//     name: {
//         type: String,
//         // required: true
//     },
//     species: {
//         type: String,
//         // required: true
//     },
//     family: {
//         type: String,
//         // required: true
//     },
//     habitat: {
//         type: String,
//         // required: true
//     },
//     place_of_found: {
//         type: String,
//         // required: true
//     },
//     diet: {
//         type: String,
//         // required: true
//     },
//     description: {
//         type: String,
//         // required: true
//     },
//     wingspan_cm: {
//         type: String,
//         // required: true
//     },
//     weight_kg:{
//         type: String,
//         // required: true
//     },
//     image_path:{
//        type: String,
//     //    required: true
//     }
// },{
//     timestamps: true,
// })

// const Pet = mongoose.model("Pet",PetSchema)
// module.exports = Pet