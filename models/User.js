const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username:{
      type: String,
      required: true
    },
    email:{ 
      type: String,
      required: true
    },
    roles:{
      User: {
        type: Number,
        default: 111
      },
      Editor: Number,
      Admin: Number
    },
    password: {
      type: String,
      required: true
    },
  }, {
    versionKey: false
  }
);

module.exports = mongoose.model('User', userSchema);