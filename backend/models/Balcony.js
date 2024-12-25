const mongoose=require('mongoose');

const balconySchema=new mongoose.Schema({
    balrow:{
        type:Number,
        required:true
    },
    balcol:{
        type:Number,
        required:true
    }
});

const Balcony=new mongoose.model('balcony',balconySchema);
module.exports=Balcony;