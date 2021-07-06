const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


var newUserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name field Should not be empty']
    },
    email:{
        type:String,
        required:[true,'Email field should not be empty'],
        unique:[true,'Email already exist']
    },
    contact:{
        type:Number,
        required:[true,'Contact field Should not be empty'],
        unique:[true,'Contact alrady exist'],
        // max:[10,'Contact nunber should be of 10 digits'],
        // min:[10,'Contact nunber should be of 10 digits']
    },
    address:{
        type:String,
        required:[true,'Address field should not be empty']
    },
    role:{
      type:String,
      role: { type: String, default: 'user' }
    },
    password:{
        type:String,
        required:[true,'Password must be entered']
    },
    saltString:{type:String},


});

// Method For encrypting password

newUserSchema.pre('save',function(next){
  bcrypt.genSalt(15,(err,salt)=>{
    bcrypt.hash(this.password,salt,(err,hash)=>{
    this.password=hash,
    this.saltString=salt
    next();
    });
  });
});


newUserSchema.methods.verifyPassword=function(password){
  return bcrypt.compareSync(password,this.password);
}

mongoose.model('register',newUserSchema);
