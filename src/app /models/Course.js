const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');



const Schema = mongoose.Schema;


const Course = new Schema({
    _id: {type: 'number'},
    name: { type: String, required: true },
    description: { type: String},
    image: { type: String},
    videoId: { type: String, required: true},
    slug: { type: String, slug: 'name'},
},{
    _id: false,
    timestamps: true,
    deletedAt: true

});

//Add Plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete,  { 
    deletedAt: true,
    overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
