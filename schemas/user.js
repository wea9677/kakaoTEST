const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

    userId : {
        type : String,
    },

    nickName : {
        type: String,
    },
    
    userImg:{
        type: String
    }

});

module.exports = mongoose.model('User', UserSchema);