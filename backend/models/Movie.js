const mongoose=require('mongoose');

const movieSchema=new mongoose.Schema({
    theatre:{
         type:mongoose.Schema.Types.ObjectId,
                ref:"Theatre",
                required:true
    },
   
    movie_name:{
        type:String,
        required:true
    },
    director:{
        type:String,
        required:true
    },
    distributor:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    stars:{
        type:[String],
        required:true
    }

})


const Movie=new mongoose.model('movie',movieSchema);
module.exports=Movie;