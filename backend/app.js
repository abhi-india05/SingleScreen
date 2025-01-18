const express=require('express');
const app=express();
const Owner=require('./models/Owner');
const ownerSignUp=require('./middlewares/OwnerMiddlewares');
const ownerLogin=require('./middlewares/OwnerMiddlewares');
const userSignUp=require('./middlewares/UserMiddlewares');
const userLogin=require('./middlewares/UserMiddlewares');
const authenticateToken=require('./Auth');

app.listen(6969,()=>{
    console.log("server started");
});

//middlewares
app.use('/user/:name/profile',async(req,res)=>{
    let name=req.params.name;
    let user=await User.findOne({name:name});
    isLoggedInUser(user,req,res,next);
});
app.use('/user/')
app.use('/owner/:name/profile',)

app.post('/user/login',userLogin);
app.post('/owner/login',ownerLogin);
app.post('/user/signup',userSignUp);
app.post('/owner/signup',ownerSignUp);


app.get('/owner/:name/profile',async(req,res)=>{
    let o_name=req.params.name;
    let o=await Owner.findOne({owner_name:o_name});
if(!o){
    res.status(404).send({
        status:"fail",
        message:"not found"
    });
}
else res.status(200).send({
    status:"success",
    message:"user found",
    data:{o}
});

});


router.post('/owner/:owner_id/addtheatre', async (req, res) => {
    try {
        
        const { owner_id } = req.params;
        const owner = await Owner.findById(owner_id);

        if (!owner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        const { theatre_name, address, city, state, dim_row, dim_col } = req.body;

        const theatre_graphic = [];
        for (let i = 0; i < dim_row; i++) {
            const row = [];
            for (let j = 0; j < dim_col; j++) {

                const seatNumber = `${String.fromCharCode(65 + i)}${j + 1}`;

                const seat = new Seat({
                    seatno: seatNumber,
                    isbooked: false,
                    booked_user: null
                });

                row.push(seat); 
            }
            theatre_graphic.push(row);
        }

        const theatre = new Theatre({
            theatre_name,
            address,
            city,
            state,
            owner: owner._id,
            dim_row,
            dim_col,
            theatre_graphic 
        });

        await theatre.save();
        res.status(201).json(theatre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/owner/:owner_id/:theatre_id/addmovie',async(req,res)=>{
    try{
    let o_id=req.params.owner_id;
    let th_id=req.params.theatre_id;
  //  let getOwnerName=await Owner.findById(o_id);//this is not needed
    let getTheatre=await Theatre.findById(th_id);
    let {movie_name,director,date,distributor,price,stars}=req.body;
    let newMovie=new Movie({theatre:getTheatre,date,movie_name,director,distributor,price,stars});
    await newMovie.save();
    return res.status(200).json({
        status:"success",
        message:`${newMovie.movie_name} added successfully`
    });
}
catch(error){
    console.log(error);
}
});



app.get('user/:user_id/:show_id',async(req,res)=>{
    try{
    let u_id=req.params.user_id;
    let s_id=req.params.show_id;
    
        let user=await User.findById(u_id);
        if(!user) return res.status(404).json({
            status:"fail",
            message:"user not found"
        });
    
       

        let show=await Show.findById(s_id);
        if(!show) return res.status(404).json({
            status:"fail",
            message:"show not found"
        });

        return res.status(200).json({user,show});
    }
    catch(error){
        console.log('error occured');
        return res.status(500).json({
            status:"error",
            message:"internal server error"
        });
    }});


app.post('/user/:userid/:showid',async(req,res)=>{
    try{
        let{userid,showid}=req.params;
        
    }
});

app.get('/user/:user_id/profile',async(req,res)=>{
    try{
    let {user_id}=req.params;
    let user=await User.findById(user_id);
    if(!user){
        return res.status(404).send({
            status:"fail",
            message:"not found"
        });
    }
    return  res.status(200).send({
        status:"success",
        message:"user found",
        data:{user}
    });
}catch(error){
    console.error(error);
    return res.json(500).json({
        status:"fail",
        message:"server error"
    })
}
    
});




