var express = require('express');
var myctrl = require('../controler/usercontroller');

var approute = express.Router();
var jt = require('../config/jwthealper');

approute.post('/newuser',myctrl.addnew); //api for adding new user

approute.get('/getall',myctrl.getAll); // api for get all the records from the reg users

approute.get('/selectRecord/:userid',myctrl.selectedData); // api for get the selected data from the reg users

approute.delete('/del/:id',myctrl.deletedata); // api for del the record of reg user

approute.put('/updateRecord/:id',myctrl.updatedData);// api for update the reg user

approute.post('/auth',myctrl.authenticate); // api for authenticate user by passport

approute.post('/imageupload/:id',myctrl.uploadImage); // api for uploading image .

approute.get('/displayimage/:id',myctrl.displayimage); // api for display image of authenticate user


module.exports=approute;
