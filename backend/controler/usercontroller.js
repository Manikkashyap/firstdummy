require('../model/registerModel');
require('../config/passportconfig')
require('../model/productimage');

const mongoose = require('mongoose');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const multer = require('multer');
const productimage = require('../model/productimage');
var regData = mongoose.model('register');
var productImages= mongoose.model('productimage');

// Add new register
module.exports.addnew = (req,res) => {
    var mydata = new regData({
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        address:req.body.address,
        role:'user',
        password:req.body.password
    });
    mydata.save().then((docs)=>{
        return res.status(200).json({
            message:'data inserted successfully',
            success:true,
            data:docs
        });
    }).catch((err)=>{
        return res.status(401).json({
            message:'Error in adding new user',
            success:false,
            data:err.message
        });
    });
}

// get all the records from the database

module.exports.getAll = (req,res)=>{
     regData.find().then((docs)=>{
     return res.status(200).json({
            message:'List of users',
            success:true,
            data:docs
        });
    }).catch((err)=>{
     return res.status(401).json({
            message:'Error in finding records',
            data:err.message
        });
    });
}

// Fetch selected data from the database

module.exports.selectedData = (req,res)=>{
    var uid = req.params.userid;
    regData.findById({_id:uid}).then((docs)=>{
        return res.status(200).json({
            message: 'Record Found',
            success:true,
            data:docs
        });
    }).catch((err)=>{
        return res.status(401).json({
            message:'Error in finding record',
            success:false,
            data:err.message
        });
    });
    // console.log(docs);
}

// Delete Record from the database

module.exports.deletedata = (req,res) => {

    regData.findByIdAndRemove({_id:req.params.id})
    .then((docs)=>{
        return res.status(200).json({
            success:true,
            message:'Data Deleted',
            data:docs
        });
    }).catch((err)=>{
            return res.status(401).json({
                success:false,
                message:'Error in Deleting data',
                err:err.message
        });
    });
}

// Update Record

module.exports.updatedData=(req,res)=>{
    // var updatedData={
    //     name:req.body.name,
    //     email:req.body.email,
    //     contact:req.body.contact,
    //     address:req.body.address,
    //     password:req.body.password
    // }
    // var updatedData = req.body;
    regData.findByIdAndUpdate({_id:req.params.id},{$set:req.body},{new:true})
    .then((docs)=>{
    return res.status(200).json({
        success:true,
        message:'Data updated',
        data:docs
    });
    }).catch((err)=>{
        return res.status(401).json({
            success:false,
            message:'Error in updating data',
            err:err.message
    });
});
}

// To Check authentication

module.exports.authenticate=(req,res,next)=>{
  passport.authenticate('local',(err,user,info,admin)=>{
      if(err) return res.status(404).json(err);
      if(user) return res.status(200).json({
          "token":jwt.sign({_id:user._id},"SecretToken",{expiresIn:'20m'}),
          "user":user
      });
      if(info) return res.status(401).json(info);
  })(req,res,next)
}

// Authentication using json web token

module.exports.userProfile = (req,res,next) => {
  const id = req._id;
  regData.find({_id:id}).then((docs) =>
  {

      return res.status(200).json({
          success:true,
          message: 'User Record Found',
          data:docs
      });

  }).catch((err) => {

      return res.status(401).json({
          success:false,
          message:"Error in finding Records",
          error : err.message
      });

  });
}

// File Uploading


var storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"./uploads");
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
});

var upload = multer({storage:storage}).single('image');

module.exports.uploadImage = (req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log("Error in uploading ."+err);
    }
    else{
      const url=req.protocol+ '://' + req.get("host");
        req.body.imageUrl=url+"/uploads/"+req.file.filename;
      console.log("fileuploaded successfully .")
      var myprodimg = new productImages({
        register:req.params.id,
        imagepath:req.body.imageUrl
      });

      myprodimg.save().then((docs)=>{
        return res.status(200).json({
          success:true,
          message:'Uploaded successfully',
          data:docs
        })
      }).catch((er)=>{
        return res.status(404).json({
          success:false,
          message:'Error in uploading file',
          error:err.message
        });
      });
      console.log(req.file)
    }
  });
}


// display file uploaded

module.exports.displayimage = (req,res) =>{
  productImages.find({register:req.params.id}).populate('register').exec().then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'Image founded Successfully .',
      data:docs,
    })
  }).catch((err)=>{
    return res.status(404).json({
      success:false,
      message:'Image not founded .',
      error:err.message
    })
  })
}


// display selected user with image

module.exports.displayuserandimage = (req,res) =>{
  regData.find({_id:req.params.id}).populate('productimage').exec().then((docs)=>{
    return res.status(200).json({
      success:true,
      message:'User data and image founded successfully .',
      data:docs,
    })
  }).catch((err)=>{
    return res.status(404).json({
      success:false,
      message:'User data and image not founded .',
      error:err.message
    })
  })
}
