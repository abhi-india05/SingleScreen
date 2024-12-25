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


router.post('/owner/:name/addtheatre', async (req, res) => {
    try {
        
        const { name } = req.params;
        const owner = await Owner.findOne({ owner_name: name });

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
app.post('/owner/:name/:theatre/addmovie',async(req,res)=>{
    let name=req.params.name;
    let th=req.params.theatre;
    let getOwnerName=await Owner.find({owner_name:name});// this is not needed
    let getTheatre=await Theatre.find({theatre_name:th});
    let {movie_name,director,date,distributor,price,stars}=req.body;
    let newMovie=new Movie({theatre:getTheatre,date,movie_name,director,distributor,price,stars});
    await newMovie.save();
    res.status(200).json({
        status:"success",
        message:`${newMovie.movie_name} added successfully`
    });
});
app.post('/user/:user/:theatre/:movie',);

app.get('/user/:user/profile',async(req,res)=>{
    let user=await User.findOne({name:req.params.user});
    if(!user){
        res.status(404).send({
            status:"fail",
            message:"not found"
        });
    }
    else res.status(200).send({
        status:"success",
        message:"user found",
        data:{user}
    });
    
});




