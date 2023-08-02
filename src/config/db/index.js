const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb://127.0.0.1:27017/learning_nodejs_dev',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );  
        console.log('Connect successfully!!');
    } catch (error) {
        console.log('Connect faile!!');
    }
}
module.exports = { connect };
