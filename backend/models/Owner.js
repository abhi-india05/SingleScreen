const mongoose=require('mongoose');


const ownerSchema=new mongoose.Schema({
    owner_name:{
        type:String,
        required:true
    },
    owner_email:{
        type:String,
        required:true
    },

    owner_password:{
        type:String,
        required:true
    }
});

const Owner=new mongoose.model('owner',ownerSchema);
module.exports=Owner;
