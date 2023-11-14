const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const taskSchema = new Schema({
    instruction:{
      type: String,
      required: true
    },
    assignee:{
      type: String,
      required: true
    }, 
    complete:{
      type: String,
      required: true
    }
  },{
    versionKey: false
  }
);

module.exports = mongoose.model('Task', taskSchema);