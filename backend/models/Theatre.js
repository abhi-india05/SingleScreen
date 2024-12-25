const mongoose=require('mongoose');


const theatreSchema=new mongoose.Schema({
    theatre_name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
    dim_row:{
        type:Number,
        required:true
    },
    dim_col:{
        type:Number,
        required:true
    },
    theatre_graphic:{
        type:[[Seat]],
        required:true
    }
});

const Theatre=new mongoose.model('theatre',theatreSchema);
module.exports=Theatre;
