const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Owner=require("./models/Owner");
const signToken=require("../Auth");


const ownerSignUp=async(req,res,next)=>{
    try{
        let{name,email,password}=req.body;
        if(!name||!email||!password){}
        res.json({message:"some error occured"});
        const hashedPassword=await bcrypt.hash(password,12);

       const newOwner= await Owner.create({
       name,email,password:hashedPassword});
        const token=signToken(newOwner._id);
        res.status(201).json({
            status:"success",
            token,
            data:{
                owner:newOwner
            }
        });
        next();
    }catch(error){
        res.status(500),json({status:"fail",message:"Internal server error"});
        console.log("error occured while creating the user:"+error);
    }
}

const ownerLogin=async(req,res,next)=>{
    let {email,password}=req.body;
    if(!email|!password){
        res.status(400).json({
            status:"failed",
            message:"email or password missing"
        });
    }
    try{
       let findOwner= await Owner.findOne({email});
       if(!findOwner||!(await bcrypt.compare(password,findOwner.password)));

        res.send(401).json({
    status:"fail",
    message:"email or password incorrect"
    });

    const token=signToken(findOwner._id);
    res.status(200).json({
        status:"success",
        token,
        data:{
            owner:{
                name:findOwner.name,
                email:findOwner.email
            }
        }
    });
    next();
    }
    catch(error){
        res.status(500).json({status:"fail",message:"Internal Server Error"});
    }
}



module.exports={
   ownerSignUp,
    ownerLogin
}