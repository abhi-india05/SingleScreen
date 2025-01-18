const mongoose=require('mongoose');
const Movie=require('./Movie');

const showSchema=new mongoose.Schema({
    show_movie:{ 
      type:mongoose.Schema.Types.ObjectId,
                    ref:"Movie",
                    required:true
    },
    show_theatre:{
      type:mongoose.Schema.Types.ObjectId,
                    ref:"Theatre",
                    required:true

    },
    date: {
        type: String,
        required: true,
        match: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/
      },
      time: {
        type: String, 
        required: true,
        match: /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      }
    


});

const Show=mongoose.Model('Show',showSchema);
module.exports=Show;