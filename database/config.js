const mongoose = require('mongoose');

require('colors');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        
        console.log('Data base is online '.green); 

    } catch (error) {
        console.log(error); 
        // throw new Error('Error starting data base');
    }
}


module.exports = {
    dbConnection
}