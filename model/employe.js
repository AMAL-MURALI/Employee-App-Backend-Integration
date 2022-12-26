var Mongoose = require("mongoose");
var studentSchema = Mongoose.Schema(
    {
        name:String,
        employenumber:Number,
        role:String,
        employeid:{
            type:Number,
            required:true
        }
    }
);

var studentModel = Mongoose.model(  "Students",studentSchema);
module.exports={studentModel};