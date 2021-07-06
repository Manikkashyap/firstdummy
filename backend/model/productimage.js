var mongoose = require('mongoose');

var productImageSchema = new mongoose.Schema({
    register:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'register',
      required:true
    },
    imagepath:
    {
        type:String
    },
    date:{
      type:Date,
      default:Date.now()
    }
});

//Image is a model which has a schema imageSchema

module.exports = new mongoose.model('productimage', productImageSchema);
