module.exports = {
    mutilpleMongooseToObject : function(mongoose) {
        return mongoose.map(mongoose => mongoose.toObject());
    },
    mongooseToOpject : function(mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};