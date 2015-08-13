'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fields: [new Schema({
    optionName: String,
    votes: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  })]
});

module.exports = mongoose.model('Poll', PollSchema);
