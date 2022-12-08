const mongoose = require('mongoose');


const Connection = async() => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log(`Database Connected`);
    } catch (e) {
        console.log(e);
    }

}


module.exports = Connection;