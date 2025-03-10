const mongoose=require('mongoose');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bookings;{
        type:mongoose.Schema.Types.ObjectId,
                        ref:"Show",
                        required:true
    }
});

const User=new mongoose.Model('user',userSchema);
module.exports=User;
